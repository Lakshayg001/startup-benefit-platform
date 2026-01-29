const express = require('express');
const router = express.Router();
const claimController = require('../controllers/claimController');
const auth = require('../middleware/auth');

router.post('/', auth, claimController.claimDeal);
router.get('/my-claims', auth, claimController.getUserClaims);

module.exports = router;