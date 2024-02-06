import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import TimeAndDateDialog from './TimeAndDateDialog';

export default function App() {
  const [todo, setTodo] = useState('');
  const [list, setList] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [list]);

  const handleOpenDialog = (index) => {
    setSelectedTaskIndex(index);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleSaveDate = (newDate) => {
    if (selectedTaskIndex !== null) {
      const formattedDate = newDate.toLocaleString({
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC'
      });

      const newList = [...list];
      newList[selectedTaskIndex].date = formattedDate;
      setList(newList);
      setSelectedDate(null);
      setSelectedTaskIndex(null);
      setShowDialog(false);
      sortListByDate(newList);
    }
  };

  const onInputChange = (e) => {
    setTodo(e.target.value);
  };

  const addTodo = () => {
    if (todo.trim() !== '') {
      setList([...list, { word: todo, complete: false, date: null }]);
      setTodo('');
    }
  };

  const onCheckboxClick = (index) => {
    const newList = [...list];
    newList[index].complete = !newList[index].complete;
    setList(newList);
  };

  const onDelete = (index, e) => {
    e.stopPropagation();

    const newList = [...list];
    newList[index].isDeleting = true;
    setList(newList);

    setTimeout(() => {
      const updatedList = list.filter((_, i) => i !== index);
      setList(updatedList);
    }, 500);
  };

  const onEnterPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const sortListByDate = (newList) => {
    newList.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
    setList(newList);
  };

  return (
    <main>
      <div className="header">
        <h1>Enter tasks</h1>
        <input
          ref={inputRef}
          value={todo}
          onChange={onInputChange}
          onKeyPress={onEnterPress}
          placeholder="Task description..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <>
        {showDialog && (
          <TimeAndDateDialog
            isOpen={showDialog}
            onClose={handleCloseDialog}
            onSave={handleSaveDate}
            initialDate={selectedDate}
          />
        )}
      </>
      <ul>
        {list.map((myTodo, index) => (
          <li key={index} className={myTodo.isDeleting ? 'delete-animation' : ''} onClick={() => handleOpenDialog(index)}>
            <input
              type="checkbox"
              onChange={() => onCheckboxClick(index)}
              onClick={(e) => e.stopPropagation()}
            />
            <span className={myTodo.complete ? 'checked' : ''}>{myTodo.word}</span>
            <div className="date-time-container">
              <span className="date-time">{myTodo.date ? myTodo.date : ''}</span>
            </div>
            <button className="delete-button" onClick={(e) => onDelete(index, e)}>
              x
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
