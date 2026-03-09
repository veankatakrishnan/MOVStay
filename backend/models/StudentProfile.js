const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  college: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  preferredLocation: {
    type: String,
    default: ''
  },
  budget: {
    type: String,
    default: ''
  },
  preferredRoomType: {
    type: String,
    enum: ['Single', 'Double', 'Triple', 'Dormitory', 'Any'],
    default: 'Any'
  },
  foodPreference: {
    type: String,
    enum: ['veg', 'non-veg', 'any'],
    default: 'any'
  },
  smokingPreference: {
    type: Boolean,
    default: false
  },
  sleepTime: {
    type: String,
    enum: ['early', 'late', 'flexible'],
    default: 'flexible'
  },
  cleanlinessLevel: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
