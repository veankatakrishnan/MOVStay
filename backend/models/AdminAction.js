const mongoose = require('mongoose');

const adminActionSchema = new mongoose.Schema({
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    actionType: { type: String, enum: ['delete_listing', 'block_user', 'approve_listing', 'reject_listing', 'system_setting'], required: true },
    targetId: { type: mongoose.Schema.Types.Mixed, required: true }, // could be a User ObjectId or PgListing ObjectId
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('AdminAction', adminActionSchema);
