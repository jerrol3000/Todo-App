import React, { useState } from 'react';
import './App.css';
import timeAndDateDiolog from './TimeAndDateDialog'


export default function App() {
  const [todo, setTodo] = useState('');
  const [list, setList] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);


  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleSaveDate = (newDate) => {
    setSelectedDate(newDate);
    // Handle saving the newDate in your main component state or wherever needed.
  };

  const onInputChange = (e) => {
    setTodo(e.target.value);
  };

  const onButtonClick = () => {
    setList([...list, { word: todo, complete: false }]);
    setTodo('');
  };

  const onCheckboxClick = (index) => {
    const newList = [...list];
    newList[index].complete = !newList[index].complete;
    setList([...newList]);
  };

  const onDelete = (index) => {
    const newList = [...list];
    newList[index].isDeleting = true;
    setList(newList);

    setTimeout(() => {
      const updatedList = list.filter((_, i) => i !== index);
      setList(updatedList);
    }, 500);
  };

  return (
    <main>
      <div className="header">
        <h1>Enter tasks</h1>
        <input value={todo} onChange={onInputChange} placeholder="Task description..."/>
        <button onClick={onButtonClick}>Add</button>
      </div>
      <ul>
        {list.map((myTodo, index) => (
          <li key={index} className={myTodo.isDeleting ? 'delete-animation' : ''} onCLick={handleOpenDialog}>
            {showDialog && (
              <TimeAndDateDialog selectedDate={selectedDate} onClose={handleCloseDialog} onSave={handleSaveDate} />
            )}
            <input
              type="checkbox"
              onChange={() => onCheckboxClick(index)}
            />
            <span className={myTodo.complete ? 'checked' : ''}>{myTodo.word}</span>
            <button className="delete-button" onClick={() => onDelete(index)}>
              x
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
