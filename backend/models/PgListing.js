const mongoose = require('mongoose');

const pgListingSchema = new mongoose.Schema({
    pgName: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: String, required: true },
    neighborhoodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Neighborhood' },
    rent: { type: Number, required: true },
    genderPreference: { type: String, required: true, enum: ['Boys', 'Girls', 'Co-ed'] },
    description: { type: String },
    amenities: {
        wifi: { type: Boolean, default: false },
        laundry: { type: Boolean, default: false },
        meals: { type: Boolean, default: false },
        cleaning: { type: Boolean, default: false },
        parking: { type: Boolean, default: false }
    },
    images: [{ type: String }],
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    isVerified: { type: Boolean, default: false },
    ratingAverage: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('PgListing', pgListingSchema);
