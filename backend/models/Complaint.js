const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pgId: { type: mongoose.Schema.Types.ObjectId, ref: 'PgListing' }, // Optional target of complaint
    subject: { type: String, required: true },
    complaintText: { type: String, required: true },
    status: { type: String, enum: ['pending', 'reviewed', 'resolved'], default: 'pending' },
    adminNotes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
