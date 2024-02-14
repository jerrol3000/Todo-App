import { createSlice, configureStore } from '@reduxjs/toolkit';

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    todo: '',
    list: [],
    showDialog: false,
    selectedDate: null,
    selectedTaskId: null,
    initialDateTimeSet: {},
  },
  reducers: {
    setTodo: (state, action) => {
      state.todo = action.payload;
    },
    setList: (state, action) => {
      state.list = action.payload;
    },
    setShowDialog: (state, action) => {
      state.showDialog = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSelectedTaskId: (state, action) => {
      state.selectedTaskId = action.payload;
    },
    setInitialDateTimeSet: (state, action) => {
      state.initialDateTimeSet = action.payload;
    },
    // Add other reducers as needed
  },
});

const store = configureStore({
  reducer: {
    main: mainSlice.reducer,
  },
});

export const {
  setTodo,
  setList,
  setShowDialog,
  setSelectedDate,
  setSelectedTaskId,
  setInitialDateTimeSet,
} = mainSlice.actions;

export { mainSlice, store };
