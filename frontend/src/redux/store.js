import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import locationReducer from "./locationSlice";
import languageReducer from './languageSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
     location: locationReducer,
      language: languageReducer, // ✅ Add here
  },
});

export default store;


