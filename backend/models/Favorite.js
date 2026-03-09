const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pgId: { type: mongoose.Schema.Types.ObjectId, ref: 'PgListing', required: true }
}, { timestamps: true });

// Ensure a student can only favorite a PG once
favoriteSchema.index({ studentId: 1, pgId: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
