import getConnection from "../services/db.js";

export const giveReview = async (req, res) => {
    /*
    const author_id = req.user.id;
    const author_type = req.user.role;
    */

    const { author_id, author_type, target_id, target_type, rating, comment } = req.body;
    if (!author_id || !author_type || !target_id || !target_type || !rating || !comment) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const connection = await getConnection();
        const [existingReview] = await connection.promise().query(
            "SELECT * FROM reviews WHERE author_id = ? AND target_id = ? AND target_type = ?",
            [author_id, target_id, target_type]
        );
        if (existingReview.length > 0) {
            console.log('cant review the same person twice');
            return res.status(409).json({ error: "You have already reviewed this person." });
        }
        const review = { author_id, author_type, target_id, target_type, rating, comment };
        const [result] = await connection.promise().query("INSERT INTO reviews SET ?", review);
        const [reviewSummary] = await connection.promise().query(
            "SELECT * FROM review_summaries WHERE target_id = ? AND target_type = ?",
            [target_id, target_type]
        );
        if (reviewSummary.length === 0) {
            const reviewSummary = { target_id, target_type, total_score_sum: rating, review_count: 1, average_rating: rating };
            await connection.promise().query("INSERT INTO review_summaries SET ?", reviewSummary);
            await connection.end();
            return res.status(201).json({ message: "Review created successfully." });
        }
        reviewSummary[0].total_score_sum = reviewSummary[0].total_score_sum + rating;
        reviewSummary[0].total_reviews = reviewSummary[0].total_reviews + 1;
        reviewSummary[0].average_score = reviewSummary[0].total_score_sum / reviewSummary[0].total_reviews;

        const [rows] = await connection.promise().query(
            "UPDATE review_summaries SET total_score_sum = ?, total_reviews = ?, average_score = ? WHERE target_id = ? AND target_type = ?",
            [reviewSummary[0].total_score_sum, reviewSummary[0].total_reviews, reviewSummary[0].average_score, target_id, target_type]
        );
        await connection.end();

    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ error: "Internal server error." });
    }

}

export const getReviews = async (req, res) => {
    const target_id = req.params.target_id;
    const target_type = req.params.target_type;
    if (!target_id || !target_type) {
        return res.status(400).json({ error: "Target ID and role are required." });
    }
    try {
        const connection = await getConnection();
        const [reviews] = await connection.promise().query(
            "SELECT * FROM reviews WHERE target_id = ? AND target_type = ?",
            [target_id, target_type]
        );
        await connection.end();
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}




const reviewController = {
    giveReview,
    getReviews,
}

export default reviewController;