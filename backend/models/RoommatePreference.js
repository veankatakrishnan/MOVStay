const mongoose = require('mongoose');

const roommatePreferenceSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    cleanlinessLevel: { type: String, enum: ['high', 'medium', 'low'], required: true },
    sleepTime: { type: String, enum: ['early', 'late', 'flexible'], required: true },
    smoking: { type: Boolean, required: true },
    drinking: { type: Boolean, required: true },
    studyHabits: { type: String, enum: ['quiet', 'group', 'moderate'], required: true },
    budget: { type: String, required: true },
    dietaryPreference: { type: String, enum: ['veg', 'non-veg', 'any'], required: true },
    introvertExtrovert: { type: Number, min: 1, max: 10, required: true } // scale 1-10
}, { timestamps: true });

module.exports = mongoose.model('RoommatePreference', roommatePreferenceSchema);
