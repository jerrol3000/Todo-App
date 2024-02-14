import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import TimeAndDateDialog from './TimeAndDateDialog';
import TodoDetail from './TodoDetail';
import { useDispatch, useSelector } from 'react-redux'; 
import { setTodo, setList, setShowDialog, setSelectedDate, setSelectedTaskId, setInitialDateTimeSet } from '../store/slices/mainSlice'; 
import { mainSlice } from '../store/slices/mainSlice'; 
export default function App() {
  const dispatch = useDispatch(); 
  
  const { todo, list, showDialog, selectedDate, selectedTaskId, initialDateTimeSet } = useSelector((state) => state.main);


  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [list]);

  const handleOpenDialog = (taskId) => {
    dispatch(setSelectedTaskId(taskId)); 
    dispatch(setShowDialog(true)); 
  };

  const handleCloseDialog = () => {
    dispatch(setShowDialog(false)); 
  };

  const handleSaveDate = (taskDetails) => {
    if (selectedTaskId !== null) {
      const newList = [...list];
      const taskIndex = newList.findIndex(task => task.id === selectedTaskId);
      if (taskIndex !== -1) {
        newList[taskIndex] = {
          ...newList[taskIndex],
          ...taskDetails
        };
        dispatch(setList(newList)); 
        dispatch(setInitialDateTimeSet({ ...initialDateTimeSet, [selectedTaskId]: true })); 
        dispatch(setSelectedDate(null)); 
        dispatch(setShowDialog(false)); 
        sortListByDate(newList);
      }
    }
  };

  const onInputChange = (e) => {
    dispatch(setTodo(e.target.value)); 
  };

  const addTodo = () => {
    if (todo.trim() !== '') {
      const newTask = { id: Date.now(), word: todo, complete: false, date: null };
      console.log(newTask)
      dispatch(setList([...list, newTask])); 
      dispatch(setInitialDateTimeSet({ ...initialDateTimeSet, [newTask.id]: false })); 
      dispatch(setTodo('')); 
    }
  };

  const onCheckboxClick = (taskId) => {
    const newList = list.map(task => 
      task.id === taskId ? { ...task, complete: !task.complete } : task
    );

    dispatch(setList(newList));
  };


  const onDelete = (taskId, e) => {
    e.stopPropagation();
    const newList = list.filter(task => task.id !== taskId);
    dispatch(setList(newList)); 
    const newInitialDateTimeSet = { ...initialDateTimeSet };
    delete newInitialDateTimeSet[taskId];
    dispatch(setInitialDateTimeSet(newInitialDateTimeSet)); 
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
    dispatch(setList(newList)); 
  };

  const getPriorityColorClass = (priority) => {
    switch (priority) {
      case 'Low':
        return 'low-priority';
      case 'Medium':
        return 'medium-priority';
      case 'High':
        return 'high-priority';
      default:
        return ''; 
    }
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
        {selectedTaskId !== null && initialDateTimeSet[selectedTaskId] && (
          <TodoDetail 
            todo={list.find(task => task.id === selectedTaskId)} 
            isOpen={true} 
            isClose={() => dispatch(setSelectedTaskId(null))} 
          />
        )}

      </>
      <ul>
        {list.map((myTodo) => (
          <li
            key={myTodo.id}
            className={`${myTodo.isDeleting ? 'delete-animation' : ''} ${getPriorityColorClass(myTodo.priority)}`}
            onClick={() => {
              dispatch(setSelectedTaskId(myTodo.id)); 
              console.log('selectedTaskId after click:', selectedTaskId);
              !initialDateTimeSet[myTodo.id] && handleOpenDialog(myTodo.id);
            }}
          >
            <input
              type="checkbox"
              onChange={() => onCheckboxClick(myTodo.id)}
              onClick={(e) => e.stopPropagation()}
            />
            <span className={myTodo.complete ? 'checked' : ''}>{myTodo.word}</span>
            <div className="date-time-container">
              <span className="date-time">{myTodo.date ? myTodo.date.toLocaleString() : ''}</span>
            </div>
            <button className="delete-button" onClick={(e) => onDelete(myTodo.id, e)}>
              x
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
