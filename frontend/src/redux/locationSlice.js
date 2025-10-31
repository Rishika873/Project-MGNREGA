// src/redux/locationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: "",
  district: "",
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.state = action.payload.state;
      state.district = action.payload.district;
    },
    clearLocation: (state) => {
      state.state = "";
      state.district = "";
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
