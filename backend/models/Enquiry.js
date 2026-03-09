const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'PgListing', required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['pending', 'replied', 'closed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enquiry', enquirySchema);
