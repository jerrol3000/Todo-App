import React, { useState } from 'react';
import './todoDetail.css';

const TodoDetail = ({ todo, isOpen, isClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState({ ...todo });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Save the edited todo
    console.log('Edited todo:', editedTodo);
    // Reset editing state
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset editedTodo state
    setEditedTodo({ ...todo });
    // Reset editing state
    setIsEditing(false);
    isClose(true)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo({ ...editedTodo, [name]: value });
  };

  return (
    <div className={`modal ${isOpen ? 'open' : 'closed'}`}>
      <div className="modal-content">
        <span className="close" onClick={handleCancel}>&times;</span>
        {todo && ( 
          isEditing ? (
            <div>
              <label htmlFor="deadline">Deadline:</label>
              <input
                type="text"
                id="deadline"
                name="deadline"
                value={editedTodo.deadline}
                onChange={handleChange}
              />
              <label htmlFor="subtasks">Subtasks:</label>
              <input
                type="text"
                id="subtasks"
                name="subtasks"
                value={editedTodo.subtasks}
                onChange={handleChange}
              />
              <label htmlFor="tags">Tags:</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={editedTodo.tags}
                onChange={handleChange}
              />
              <label htmlFor="notes">Notes:</label>
              <textarea
                id="notes"
                name="notes"
                value={editedTodo.notes}
                onChange={handleChange}
              ></textarea>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <div>
              <p><strong>Deadline:</strong> {todo.deadline}</p>
              <p><strong>Subtasks:</strong> {todo.subtasks}</p>
              <p><strong>Tags:</strong> {todo.tags}</p>
              <p><strong>Notes:</strong> {todo.notes}</p>
              <button onClick={handleEdit}>Edit</button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TodoDetail;
