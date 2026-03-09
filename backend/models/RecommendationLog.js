const mongoose = require('mongoose');

const recommendationLogSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recommendedPgs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PgListing' }],
    modelScoreThreshold: { type: Number },
    algorithmVersion: { type: String },
    sessionData: { type: mongoose.Schema.Types.Mixed } 
}, { timestamps: true });

// Optimize querying recommendations by student
recommendationLogSchema.index({ studentId: 1 });

module.exports = mongoose.model('RecommendationLog', recommendationLogSchema);
