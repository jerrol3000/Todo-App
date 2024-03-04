import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDate, setTags, setPriority, setSubtasks, setNotes } from '../store/slices/dialogSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TimeAndDateDialog.css';

const TimeAndDateDialog = ({ onSave, onClose }) => {
  const dispatch = useDispatch();
  const { date, tags, priority, subtasks, notes } = useSelector(state => state.dialog);

  
  const handleSave = () => {
    const taskDetails = {
      date: date,
      tags: tags,
      priority: priority,
      subtasks: subtasks,
      notes: notes
    };
    onSave(taskDetails);
    onClose();
  };

  const addTag = (tag) => {
    dispatch(setTags([...tags, tag]));
  };

  const removeTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    dispatch(setTags(updatedTags));
  };

  const removeSubtask = (index) => {
    const updatedSubtasks = subtasks.filter((_, i) => i !== index);
    dispatch(setSubtasks(updatedSubtasks));
  };


  const addSubtask = (subtask) => {
    dispatch(setSubtasks([...subtasks, subtask]));
  };

  const handleDateChange = (date) => {
    dispatch(setDate(date));
  };

  return (
    <div style={{ 
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      border: '1px solid #ccc',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      zIndex: '1000',
      maxWidth: '400px',
      width: '100%',
      overflowY: 'auto'
    }}>
      <h4>Select Time and Date</h4>
      <DatePicker
        selected={date}
        onChange={(newDate) => handleDateChange(newDate)} //issue is right here
        showTimeSelect
        timeFormat="HH:mm"
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      <div className="tag-container">
        <h5>Tags</h5>
        <div className="tag-input-container">
          <input
            type="text"
            placeholder="Add tag..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addTag(e.target.value);
                e.target.value = '';
              }
            }}
          />
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
              <button onClick={() => removeTag(index)}>x</button>
            </span>
          ))}
        </div>
      </div>
      <div className="priority-container">
        <h5>Priority</h5>
        <select value={priority} onChange={(e) => dispatch(setPriority(e.target.value))}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="subtask-container">
        <h5>Subtasks</h5>
        <div className="subtask-input-container">
          <input
            type="text"
            placeholder="Add subtask..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addSubtask(e.target.value);
                e.target.value = '';
              }
            }}
          />
          {subtasks.map((subtask, index) => (
            <div key={index} className="subtask">
              <input type="checkbox" />
              <span>{subtask}</span>
              <button onClick={() => removeSubtask(index)}>x</button>
            </div>
          ))}
        </div>
      </div>
      <div className="notes-container">
        <h5>Notes</h5>
        <textarea
          value={notes}
          onChange={(e) => dispatch(setNotes(e.target.value))}
          placeholder="Add notes..."
        />
      </div>
      <div className="button-container">
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default TimeAndDateDialog;
