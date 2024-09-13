// slotRoutes.js
const express = require('express');
const { bookSlot, getSlots,getUserBookedSlots} = require('../controllers/slotController');

const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/book', auth,bookSlot);
router.get('/back',auth,getUserBookedSlots);
router.get('/:date', auth,getSlots); // New route for fetching booked slots

module.exports = router;
