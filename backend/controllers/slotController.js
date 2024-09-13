// slotController.js
const Slot = require('../models/Slot');

exports.bookSlot = async (req, res) => {
  const { date, slotId, name, phone } = req.body;
  const username = req.user.userId;

  try {
    // Find the slot by date and slotId
    let slot = await Slot.findOne({ date, slotId });

    // If slot is not found, create a new slot entry
    if (!slot) {
      slot = new Slot({ date, slotId, status: 'available' });
    }

    // Check if the slot is already booked
    if (slot.status === 'booked') {
      return res.status(400).json({ message: 'Slot already booked' });
    }

    // Update the slot status and bookedBy information
    slot.status = 'booked';
    slot.bookedBy = { name, phone,username };

    // Save the slot with the new booking details
    await slot.save();

    // Send success response
    res.status(200).json({ message: 'Slot booked successfully' });
  } catch (error) {
    console.error('Error booking slot:', error);
    res.status(500).json({ message: 'Error booking slot' });
  }
};

exports.getSlots = async (req, res) => {
  const { date } = req.params;
  try {
    let slot = await Slot.find({ date });
    if (!slot) {
      slot = new Slot({ date, timeSlots: Array.from({ length: 16 }, (_, i) => ({ slotId: i + 1 })) });
      await slot.save();
    }
    res.json(slot);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching slots' });
  }
};

exports.getUserBookedSlots = async (req, res) => {
  const userId = req.user.userId; // Assuming req.user contains user info (like userId)
  
  try {
    // Find all slots booked by this user
    const bookedSlots = await Slot.find({ 'bookedBy.username': userId });

    if (!bookedSlots.length) {
      return res.status(404).json({ message: 'No slots booked by the user' });
    }

    res.status(200).json(bookedSlots);
  } catch (error) {
    console.error('Error fetching user booked slots:', error);
    res.status(500).json({ message: 'Error fetching user booked slots' });
  }
};