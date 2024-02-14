import { configureStore } from '@reduxjs/toolkit';
import { mainSlice } from './slices/mainSlice'; 
import dialogReducer from './slices/dialogSlice';


export default configureStore({
  reducer: {
    main: mainSlice.reducer,
    dialog: dialogReducer
  }
})
