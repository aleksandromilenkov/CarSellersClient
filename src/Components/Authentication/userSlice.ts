import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string | null;
  username: string|null;
  profileImage: string|null;
  email:string | null;
  // Define a proper type based on your user info
}

const initialState: UserState = {
  token: null,
  username: null,
  profileImage: null,
  email: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<{ token: string; username:string, email:string, profileImage:string }>) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.profileImage = action.payload.profileImage;
    },
    logoutUser: (state) => {
      state.token = null;
      state.username = null;
      state.email = null;
      state.profileImage = null;
    },
    updateCurrentUser: (state, action: PayloadAction<{  username:string, email:string }>) => {
        state.username = action.payload.username;
        state.email = action.payload.email;
      },
  },
});

export const { loginUser, logoutUser, updateCurrentUser } = userSlice.actions;

export default userSlice.reducer;
