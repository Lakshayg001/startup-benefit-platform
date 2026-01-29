const Claim = require('../models/claim');
const Deal = require('../models/deal');
const crypto = require('crypto');

exports.claimDeal = async (req, res) => {
    try {
        const { dealId } = req.body;
        const userId = req.user._id;

        const deal = await Deal.findById(dealId);
        if (!deal) return res.status(404).json({ message: 'Deal not found' });
        if (!deal.isActive) return res.status(400).json({ message: 'This deal is no longer active' });
        if (deal.isLocked && !req.user.isVerified) return res.status(403).json({ message: 'This deal requires account verification' });
        if (deal.claimLimit && deal.claimedCount >= deal.claimLimit) return res.status(400).json({ message: 'Deal claim limit reached' });

        const existingClaim = await Claim.findOne({ user: userId, deal: dealId });
        if (existingClaim) return res.status(400).json({ message: 'You have already claimed this deal' });

        const claimCode = crypto.randomBytes(8).toString('hex').toUpperCase();
        const claim = new Claim({
            user: userId,
            deal: dealId,
            claimCode,
            status: deal.isLocked ? 'pending' : 'approved'
        });

        await claim.save();
        deal.claimedCount += 1;
        await deal.save();
        await claim.populate('deal');

        res.status(201).json({ message: 'Deal claimed successfully', claim });
    } catch (error) {
        console.error('Claim deal error:', error);
        res.status(500).json({ message: 'Error claiming deal' });
    }
};

exports.getUserClaims = async (req, res) => {
    try {
        const claims = await Claim.find({ user: req.user._id }).populate('deal').sort({ createdAt: -1 });
        res.json({ claims });
    } catch (error) {
        console.error('Get claims error:', error);
        res.status(500).json({ message: 'Error fetching claims' });
    }
};