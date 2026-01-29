const Deal = require('../models/deal');

exports.getAllDeals = async (req, res) => {
    try {
        const { category, search, isLocked } = req.query;
        let filter = { isActive: true };
        if (category) filter.category = category;
        if (isLocked !== undefined) filter.isLocked = isLocked === 'true';
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { partnerName: { $regex: search, $options: 'i' } }
            ];
        }
        const deals = await Deal.find(filter).sort({ createdAt: -1 });
        res.json({ deals });
    } catch (error) {
        console.error('Get deals error:', error);
        res.status(500).json({ message: 'Error fetching deals' });
    }
};

exports.getDealById = async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.id);
        if (!deal) return res.status(404).json({ message: 'Deal not found' });
        res.json({ deal });
    } catch (error) {
        console.error('Get deal error:', error);
        res.status(500).json({ message: 'Error fetching deal' });
    }
};