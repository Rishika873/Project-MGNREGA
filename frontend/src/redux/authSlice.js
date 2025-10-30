import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";


const token = localStorage.getItem("token");
const user = token ? jwtDecode(token) : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token || null,
    user: user || null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      const token = action.payload;
      state.token = token;
      try {
        const decoded = jwtDecode(token);
        state.user = decoded;
      } catch (err) {
        console.error("Invalid token", err);
        state.user = null;
      }
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    setUserFromToken: (state) => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          state.user = decoded;
          state.token = token;
        } catch (err) {
          console.error("Invalid token");
          state.user = null;
          state.token = null;
        }
      } else {
        state.user = null;
        state.token = null;
      }
    },
  },
});

export const { loginSuccess, logout, setUserFromToken } = authSlice.actions;
export default authSlice.reducer;
