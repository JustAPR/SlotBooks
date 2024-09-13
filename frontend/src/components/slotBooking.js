import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SlotBooking = () => {
  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]); // State to hold booked slots
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [userDetails, setUserDetails] = useState({ name: '', phone: '' });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Function to fetch available slots
  const fetchSlots = async (date) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/slots/${date}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSlots(data);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };
  useEffect(() => {
    fetchSlots(selectedDate); // Fetch slots on initial render with the current date
  }, []);
  // Function to fetch booked slots
  const fetchBookedSlots = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/slots/back', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setBookedSlots(data);
    } catch (error) {
      console.error('Error fetching booked slots:', error);
    }
  };
  

  useEffect(() => {
    fetchSlots(selectedDate); // Fetch available slots for the selected date
    fetchBookedSlots(); // Fetch all booked slots on page load
  }, [selectedDate]);

  const openModal = (slotId) => {
    setSelectedSlot(slotId);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const confirmBooking = async () => {
    const { name, phone } = userDetails;

    if (!name || !phone) {
      alert('Please enter your name and phone number.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/slots/book',
        { date: selectedDate, slotId: selectedSlot, name, phone },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Slot booked');
      setShowModal(false);
      fetchSlots(selectedDate); // Refetch available slots to update the list after booking
      fetchBookedSlots(); // Refetch booked slots after booking
    } catch (error) {
      alert('Failed to book slot');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      <h1 style={styles.heading}>Parking Slot Booking</h1>
      <div style={styles.calendarContainer}>
        <h2>Select Date</h2>
        <input
          type="date"
          id="date-picker"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={styles.datePicker}
        />
      </div>
      <div style={styles.calendar}>
  {slots.map((slot) => (
    <div
      key={slot.slotId}
      className={`slot ${slot.status}`}
      style={styles[slot.status]}
      onClick={() => slot.status === 'available' && openModal(slot.slotId)}
    >
      {`Slot ${slot.slotId} - ${slot.status}`}
      {slot.status === 'booked' && (
        <div style={styles.bookingDetails}>
          <p>Booked By: {slot.bookedBy.name}</p>
          <p>Phone: {slot.bookedBy.phone}</p>
          {/* If you need to display userId or other details, you can include them here */}
        </div>
      )}
    </div>
  ))}
</div>


      {/* Modal for booking */}
      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>Enter Details to Book Slot</h2>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={userDetails.name}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={userDetails.phone}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
            <button onClick={confirmBooking} style={styles.button}>
              Confirm Booking
            </button>
            <button onClick={() => setShowModal(false)} style={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Section to display booked slots */}
      <h2 style={styles.heading}>Booked Slots</h2>
      <div style={styles.bookedSlotsContainer}>
        {bookedSlots.length > 0 ? (
          bookedSlots.map((slot, index) => (
            <div key={index} style={styles.bookedSlot}>
              <p>{`Date: ${slot.date}`}</p>
              <p>{`Slot ID: ${slot.slotId}`}</p>
              <p>{`Booked By: ${slot.bookedBy.name}, Phone: ${slot.bookedBy.phone}`}</p>
            </div>
          ))
        ) : (
          <p>No slots booked yet.</p>
        )}
      </div>
    </div>
  );
};

// Inline styles for SlotBooking component
const styles = {
  container: {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  calendarContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  datePicker: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  calendar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    marginBottom: '20px',
  },
  available: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  bookedSlot: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
  },
  modal: {
    display: 'flex',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  logoutButton: {
    padding: '10px 20px',
    color: '#fff',
    backgroundColor: '#dc3545',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: '0',
  },
  bookedSlotsContainer: {
    marginTop: '20px',
  },
};

export default SlotBooking;
