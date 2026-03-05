const mongoose = require('mongoose');

const ownerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  propertyType: {
    type: String,
    enum: ['PG', 'Hostel', 'Apartment'],
    required: true
  },
  city: {
    type: String,
    required: true
  },
  numberOfRooms: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('OwnerProfile', ownerProfileSchema);
