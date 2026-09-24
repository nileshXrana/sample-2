import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  registerThunk,
  logoutThunk,
  getUserThunk,
  getUsersThunk,
} from "./user.action";
import { userState } from "./user.type";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    currentUser: null,
    loading: false,
    error: null,
  } as userState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.users = action.payload;
      })

      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })

      .addCase(logoutThunk.fulfilled, (state) => {
        state.currentUser = null;
      });
  },
});

export default userSlice.reducer;
