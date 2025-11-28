import jwt from 'jsonwebtoken';
import prisma from '../prisma/client.js'; 


const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

/**
 * Decodes and verifies the JWT token provided during the Socket.IO handshake.
 *
 * @param {string} token - The JWT string, optionally including 'Bearer '.
 * @returns {object} The verified user payload { id, type }.
 * @throws {Error} If the token is invalid or missing.
 */

export const decodeChatToken = (token) => {
    if (!token) {
        throw new Error('No token provided');
    }
    const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;

    try {
       // jwt.verify runs synchronously
       const payload = jwt.verify(cleanToken, JWT_SECRET);
       
       // Ensure the payload contains the essential identifiers
        if (!payload.id || !payload.type) {
            throw new Error('Token payload missing required user information.');
        }

        // Return the validated, parsed payload
        return { id: parseInt(payload.id), type: payload.type };
    } catch (error) {
        // Re-throw the error with a generic message for security
        throw new Error('Invalid or expired authentication token.');
    }
}