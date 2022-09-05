import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  access_token: null,
  refresh_token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // action to update the name and the token and can be used globally
    updateUser: (state, action) => {
      const { email, access_token, refresh_token } = action.payload;
      state.email = email;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
    },

    logOutUser: () => {
      return initialState;
    },
  },
});

export const { updateUser, logOutUser } = userSlice.actions;

// select the user from the state
export const selectCurrentUser = (state) => state.user;

export default userSlice.reducer;
