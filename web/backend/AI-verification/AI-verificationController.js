import getConnection from "../services/db.js";
import env from "dotenv";
import * as fs from "node:fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

env.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the AI client (it will automatically look for the API key in env variables)
const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Helper function to convert a local file to a GoogleGenerativeAI.Part object
function fileToGenerativePart(filePath, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
            mimeType,
        },
    };
}

// Helper function to determine MIME type from file extension
function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.bmp': 'image/bmp'
    };
    return mimeTypes[ext] || 'image/jpeg';
}

const aiImageProccessing = async (imagePath, exifMetadata = null, productDescription = null) => {
    const API_MODEL = 'gemini-2.5-flash';
    const MAX_RETRIES = 3;

    const promptPath = path.join(__dirname, "prompt.txt");
    let prompt = fs.readFileSync(promptPath, "utf-8");

    // Replace placeholders in the prompt
    prompt = prompt.replace(
        '[Insert extracted EXIF metadata here, e.g., as a JSON object or string. If none is available, state "No EXIF metadata provided."]',
        exifMetadata ? JSON.stringify(exifMetadata) : 'No EXIF metadata provided.'
    );

    if (productDescription) {
        prompt = prompt.replace(
            '[insert product description here, e.g., "a red bicycle"]',
            `"${productDescription}"`
        );
    }

    // Convert image to generative part
    const mimeType = getMimeType(imagePath);
    const imagePart = fileToGenerativePart(imagePath, mimeType);
    const textPart = { text: prompt };

    let lastError = null;

    // Retry logic
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const model = ai.getGenerativeModel({ model: API_MODEL });
            const response = await model.generateContent({
                contents: [{ parts: [imagePart, textPart] }]
            });
            const responseText = response.response.text().trim();

            // Try to parse the score (should be a number)
            const score = parseFloat(responseText);

            if (isNaN(score)) {
                throw new Error(`Invalid response format: ${responseText}`);
            }

            // Clamp score between 0 and 10
            const qualityScore = Math.max(0, Math.min(10, score));

            return {
                success: true,
                qualityScore: qualityScore,
                rawResponse: responseText
            };

        } catch (error) {
            lastError = error;
            console.error(`Attempt ${attempt} failed:`, error.message);

            if (attempt < MAX_RETRIES) {
                // Wait before retrying (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            }
        }
    }

    // All retries failed
    return {
        success: false,
        error: lastError?.message || 'Failed to process image after all retries',
        qualityScore: null
    };
}


const check_acount_age = async (producer_id) => {
    try {
        let rating = 0;
        const connection = await getConnection();
        const [result] = await connection.promise().query('SELECT joined_at FROM producers WHERE id = ?;', [producer_id]);
        const producer_joined_at = result[0].joined_at;
        const current_date = new Date();
        const time_difference = current_date - producer_joined_at;
        const days_difference = time_difference / (1000 * 60 * 60 * 24);
        if (days_difference < 1) {
            rating = 10;
        } else if (days_difference < 7) {
            rating = 6;
        } else if (days_difference < 30) {
            rating = 3;
        } else {
            rating = 0;
        }
        await connection.end();
        return rating;

    } catch (err) {
        console.error("Error validating account age:", err);
        return { success: false, error: err.message };
    }

};

const validate_fraud = async (listingName, category, description, price, producer_id) => {
    const API_MODEL = 'gemini-2.5-flash';
    const MAX_RETRIES = 3;

    const promptPath = path.join(__dirname, "prompt2.txt");
    let prompt = fs.readFileSync(promptPath, "utf-8");

    // Replace placeholders in the prompt
    prompt = prompt.replace(
        '[Insert the product name here, e.g., "Fresh/potato".]',
        `"${listingName}"`
    );

    prompt = prompt.replace(
        '[Insert the category here, e.g., "Electronics > Smartphones".]',
        `"${category}"`
    );

    prompt = prompt.replace(
        '[Insert the full description text here.]',
        `"${description}"`
    );

    prompt = prompt.replace(
        '[Insert the price here, e.g., "$500 USD".]',
        `"${price}"`
    );

    // Get producer trust score first
    let trust = 5; // Default neutral trust
    let connection; // Declare connection outside try/catch for scope

    try {
        connection = await getConnection(); // <--- FIX 1: Initialize connection
        const [rows] = await connection.promise().query(
            "SELECT * FROM review_summaries WHERE target_id = ? AND target_type = ?;",
            [producer_id, "producer"]
        );

        if (rows.length === 0 || rows[0].average_rating < 1) {
            trust = 10; // No reviews or very low rating = high risk
        } else if (rows[0].average_rating < 2.5) {
            trust = 6;
        } else if (rows[0].average_rating < 4) {
            trust = 3;
        } else if (rows[0].average_rating < 4.5) {
            trust = 1;
        } else {
            trust = 0; // Excellent rating = low risk
        }
    } catch (dbError) {
        console.error('Database error fetching trust score:', dbError);
        // Continue with default trust value
    } finally {
        if (connection) {
            await connection.end(); // <--- FIX 1: Ensure connection is closed
        }
    }

    let lastError = null;

    // Retry logic for AI fraud detection
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const model = ai.getGenerativeModel({ model: API_MODEL });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const responseText = response.text().trim();

            const score = parseFloat(responseText);

            if (isNaN(score)) {
                throw new Error(`Invalid response format: ${responseText}`);
            }

            // Clamp AI score between 0 and 10
            const fraudRiskScore = Math.max(0, Math.min(10, score));

            // Combine fraud score and trust score
            // Weight: 60% AI fraud score + 40% producer trust score
            const combinedScore = (fraudRiskScore * 0.6) + (trust * 0.4);
            const finalScore = Math.max(0, Math.min(10, Math.round(combinedScore * 10) / 10));

            return {
                success: true,
                finalFraudScore: finalScore,
                aiFraudScore: fraudRiskScore,
                producerTrustScore: trust,
                rawResponse: responseText
            };

        } catch (error) {
            lastError = error;
            console.error(`Attempt ${attempt} failed:`, error.message);

            if (attempt < MAX_RETRIES) {
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            }
        }
    }

    // If all retries failed
    return {
        success: false,
        error: lastError?.message || 'Unknown error',
        finalFraudScore: 5 + (trust * 0.4) // Fallback: neutral AI score + trust
    };
};

const check_anomaly = async (producer_id) => {
    try {
        let rating = 0;
        const connection = await getConnection();

        // Check for multiple listings in short time (potential spam)
        const [recentListings] = await connection.promise().query(
            'SELECT COUNT(*) as count FROM products WHERE producer_id = ? AND created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)',
            [producer_id]
        );

        const listingsCount = recentListings[0].count;
        if (listingsCount > 10) {
            rating = 10; // Too many listings in 24 hours
        } else if (listingsCount > 5) {
            rating = 6;
        } else if (listingsCount > 3) {
            rating = 3;
        }

        // Check for revoked listings (pattern of bad products)
        const [revokedCount] = await connection.promise().query(
            'SELECT COUNT(*) as count FROM products WHERE producer_id = ? AND state = "revoked_by_ai"',
            [producer_id]
        );

        const revoked = revokedCount[0].count;
        if (revoked > 5) {
            rating = Math.max(rating, 10);
        } else if (revoked > 3) {
            rating = Math.max(rating, 7);
        } else if (revoked > 1) {
            rating = Math.max(rating, 4);
        }

        await connection.end();
        return rating;

    } catch (err) {
        console.error("Error checking anomaly:", err);
        return 0; // Return 0 on error to not block validation
    }
};

export const validate_product = async (req, res) => {
    try {
        const { product_id, image_path, exif_metadata } = req.body;

        if (!product_id) {
            return res.status(400).json({ error: "Product ID is required." });
        }

        const connection = await getConnection();

        // Get product details
        const [products] = await connection.promise().query(
            'SELECT * FROM products WHERE id = ?',
            [product_id]
        );

        if (products.length === 0) {
            await connection.end();
            return res.status(404).json({ error: "Product not found." });
        }

        const product = products[0];

        // Check if product is already processed
        if (product.state !== 'pending_ai') {
            await connection.end();
            return res.status(400).json({ error: `Product is already processed. Current state: ${product.state}` });
        }

        // Step 1: AI Image Processing
        let aiImageScore = 0;
        if (image_path) {
            const imageResult = await aiImageProccessing(
                image_path,
                exif_metadata || null,
                product.description || null
            );

            if (imageResult.success) {
                aiImageScore = imageResult.qualityScore;
            } else {
                console.error("AI image processing failed:", imageResult.error);
                // Continue with other checks even if image processing fails
            }
        }

        // Step 2: Check Account Age
        const accountAgeScore = await check_acount_age(product.producer_id);
        const accountAgeRating = typeof accountAgeScore === 'object' && accountAgeScore.error ? 0 : accountAgeScore;

        // Step 3: Validate Fraud
        const fraudResult = await validate_fraud(
            product.name,
            product.category,
            product.description,
            product.price.toString(),
            product.producer_id // <--- FIX 2: Changed from aiImageScore to product.producer_id
        );
        const fraudScore = fraudResult.success ? fraudResult.finalFraudScore : 0; // Note: using finalFraudScore

        // Step 4: Check Anomaly
        const anomalyScore = await check_anomaly(product.producer_id);

        // Calculate final score using the formula
        // resultfromaiprocess * 0.4 + (resultfromcheckacountage * 0.2) + resultfromvalidatefraud * 0.2 + resultfromcheckanomaly * 0.2
        const finalScore = (aiImageScore * 0.4) +
            (accountAgeRating * 0.2) +
            (fraudScore * 0.2) +
            (anomalyScore * 0.2);

        // Clamp final score between 0 and 10
        const clampedScore = Math.max(0, Math.min(10, finalScore));

        let newState;
        let action = '';

        if (clampedScore > 9) {
            // Ban the producer and delete the listing
            newState = 'revoked_by_ai';
            action = 'banned_and_deleted';

            // Delete the product
            await connection.promise().query('DELETE FROM products WHERE id = ?', [product_id]);

            // Optionally, you might want to add a banned flag to producers table
            // For now, we'll just delete the product
            console.log(`Product ${product_id} deleted and producer ${product.producer_id} flagged due to high risk score: ${clampedScore}`);

        } else if (clampedScore >= 4 && clampedScore <= 9) {
            // Validate it (approve but with caution)
            newState = 'approved_by_ai';
            action = 'approved';

            await connection.promise().query(
                'UPDATE products SET state = ? WHERE id = ?',
                [newState, product_id]
            );

        } else {
            // Less than 4 - recommend it
            newState = 'recommended_by_ai';
            action = 'recommended';

            await connection.promise().query(
                'UPDATE products SET state = ? WHERE id = ?',
                [newState, product_id]
            );
        }

        await connection.end();

        return res.status(200).json({
            success: true,
            finalScore: clampedScore,
            breakdown: {
                aiImageScore: aiImageScore,
                accountAgeScore: accountAgeRating,
                fraudScore: fraudScore,
                anomalyScore: anomalyScore
            },
            state: newState,
            action: action,
            message: clampedScore > 9
                ? "Product deleted and producer flagged due to high fraud risk."
                : clampedScore >= 4
                    ? "Product approved with caution."
                    : "Product recommended."
        });

    } catch (error) {
        console.error("Error validating product:", error);
        return res.status(500).json({
            success: false,
            error: "Internal server error during product validation."
        });
    }
};

const aiController = {
    validate_product
};

export default aiController;