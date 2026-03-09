const mongoose = require('mongoose');

const pgReviewSchema = new mongoose.Schema({
    pgId: { type: mongoose.Schema.Types.ObjectId, ref: 'PgListing', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewText: { type: String, required: true },
    sentimentScore: { type: Number },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Ensure a student can only review a PG once
pgReviewSchema.index({ pgId: 1, studentId: 1 }, { unique: true });

module.exports = mongoose.model('PgReview', pgReviewSchema);
