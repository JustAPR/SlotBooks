// slotModel.js
const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  date: { type: String, required: true },
  slotId: { type: Number, required: true },
  status: { type: String, enum: ['available', 'booked'], default: 'available' },
  bookedBy: {
    name: String,
    phone: String,
    username: String,
  },
});

module.exports = mongoose.model('Slot', SlotSchema);
