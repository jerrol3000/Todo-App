// dialogSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  date: new Date(),
  tags: [],
  priority: 'Low',
  subtasks: [],
  notes: ''
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    setPriority: (state, action) => {
      state.priority = action.payload;
    },
    setSubtasks: (state, action) => {
      state.subtasks = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    }
  }
});

export const { setOpen, setDate, setTags, setPriority, setSubtasks, setNotes } = dialogSlice.actions;

export default dialogSlice.reducer;
