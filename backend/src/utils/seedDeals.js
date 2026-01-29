const mongoose = require('mongoose');
const Deal = require('../models/deal');
require('dotenv').config();

const sampleDeals = [
    {
        title: 'AWS Credits for Startups',
        description: 'Get $5,000 in AWS credits valid for 2 years.',
        category: 'cloud',
        partnerName: 'Amazon Web Services',
        partnerLogo: 'https://logo.clearbit.com/aws.amazon.com',
        discount: '$5,000 in credits',
        originalPrice: 5000,
        discountedPrice: 0,
        isLocked: true,
        eligibilityCriteria: 'Verified startup with less than $1M funding',
        validUntil: new Date('2025-12-31'),
        claimLimit: 100
    },
    {
        title: 'Stripe for Startups',
        description: 'Get $50,000 in fee-free processing and priority support.',
        category: 'development',
        partnerName: 'Stripe',
        partnerLogo: 'https://logo.clearbit.com/stripe.com',
        discount: '$50,000 fee-free processing',
        originalPrice: 1500,
        discountedPrice: 0,
        isLocked: true,
        eligibilityCriteria: 'New Stripe users only',
        validUntil: new Date('2025-12-31'),
        claimLimit: 500
    },
    {
        title: 'Notion for Startups',
        description: 'Get 6 months free of Notion Plus plan, including unlimited AI.',
        category: 'productivity',
        partnerName: 'Notion',
        partnerLogo: 'https://logo.clearbit.com/notion.so',
        discount: '6 months free Plus plan',
        originalPrice: 60,
        discountedPrice: 0,
        isLocked: false,
        eligibilityCriteria: 'Startups with < 50 employees',
        validUntil: new Date('2025-12-31'),
        claimLimit: 1000
    },
    {
        title: 'Slack Pro Plan Discount',
        description: '80% discount on Slack Pro for 12 months.',
        category: 'productivity',
        partnerName: 'Slack',
        partnerLogo: 'https://logo.clearbit.com/slack.com',
        discount: '80% off for 12 months',
        originalPrice: 100,
        discountedPrice: 20,
        isLocked: true,
        eligibilityCriteria: 'Valid for new Slack workspaces',
        validUntil: new Date('2025-06-30'),
        claimLimit: 250
    },
    {
        title: 'HubSpot for Startups',
        description: 'Up to 90% off HubSpot’s growth platform in your first year.',
        category: 'marketing',
        partnerName: 'HubSpot',
        partnerLogo: 'https://logo.clearbit.com/hubspot.com',
        discount: '90% off first year',
        originalPrice: 4000,
        discountedPrice: 400,
        isLocked: true,
        eligibilityCriteria: 'Seed-stage startups with < $2M funding',
        validUntil: new Date('2025-12-31'),
        claimLimit: null
    },
    {
        title: 'GitHub Enterprise for Startups',
        description: 'Get 1 year of GitHub Enterprise free for up to 20 users.',
        category: 'development',
        partnerName: 'GitHub',
        partnerLogo: 'https://logo.clearbit.com/github.com',
        discount: '1 year free for 20 users',
        originalPrice: 5000,
        discountedPrice: 0,
        isLocked: true,
        eligibilityCriteria: 'Startups under 3 years old',
        validUntil: new Date('2025-12-31'),
        claimLimit: 200
    }
];

const seedDeals = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        await Deal.deleteMany({});
        console.log('Cleared existing deals');
        await Deal.insertMany(sampleDeals);
        console.log(`Successfully seeded ${sampleDeals.length} deals`);
        mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedDeals();