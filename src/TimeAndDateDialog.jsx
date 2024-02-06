// TimeAndDateDialog.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TimeAndDateDialog = ({ isOpen, onClose, onSave, initialDate }) => {
  const [date, setDate] = useState(initialDate || new Date());

  const handleSave = () => {
    onSave(date);
    onClose();
  };

  return (
    <div className={`time-and-date-dialog ${isOpen ? 'open' : ''}`}>
      <h2>Select Time and Date</h2>
      <DatePicker
        selected={date} 
        onChange={(newDate) => setDate(newDate)} 
        showTimeSelect timeFormat="HH:mm" 
        dateFormat="MMMM d, yyyy h:mm aa" 
        />
      <div className="button-container">
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default TimeAndDateDialog;
