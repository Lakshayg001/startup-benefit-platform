const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ['cloud', 'marketing', 'analytics', 'productivity', 'design', 'development']
    },
    partnerName: { type: String, required: true },
    partnerLogo: { type: String },
    discount: { type: String, required: true },
    originalPrice: { type: Number },
    discountedPrice: { type: Number },
    isLocked: { type: Boolean, default: false },
    eligibilityCriteria: { type: String },
    validUntil: { type: Date },
    claimLimit: { type: Number, default: null },
    claimedCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

dealSchema.index({ category: 1, isLocked: 1, isActive: 1 });

module.exports = mongoose.model('Deal', dealSchema);