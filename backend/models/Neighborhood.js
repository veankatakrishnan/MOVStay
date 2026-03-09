const mongoose = require('mongoose');

const neighborhoodSchema = new mongoose.Schema({
    locationName: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    safetyScore: { type: Number, min: 1, max: 10, required: true },
    transportScore: { type: Number, min: 1, max: 10, required: true },
    convenienceScore: { type: Number, min: 1, max: 10, required: true },
    lifestyleScore: { type: Number, min: 1, max: 10, required: true },
    environmentScore: { type: Number, min: 1, max: 10, required: true },
    averageRent: { type: Number },
    nearbyHospitals: [{ type: String }],
    nearbyColleges: [{ type: String }],
    nearbyTransport: [{ type: String }],
    popularAmenities: [{ type: String }]
}, { timestamps: true });

// Optimize querying
neighborhoodSchema.index({ city: 1, locationName: 1 });

module.exports = mongoose.model('Neighborhood', neighborhoodSchema);
