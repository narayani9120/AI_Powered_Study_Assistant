import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  username: null,
  email: null,
  token: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { userId, username, email, token } = action.payload;
      state.userId = userId;
      state.username = username;
      state.email = email;
      state.token = token;
      state.isAuthenticated = true;

      localStorage.setItem(
        "user",
        JSON.stringify({ userId, username, email, token })
      );
    },
    logout: (state) => {
      state.userId = null;
      state.username = null;
      state.email = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.clear();
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
