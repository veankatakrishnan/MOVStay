const mongoose = require('mongoose');

const visitBookingSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pgId: { type: mongoose.Schema.Types.ObjectId, ref: 'PgListing', required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'PgRoom', required: true },
    visitDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('VisitBooking', visitBookingSchema);
