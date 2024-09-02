import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Components/Authentication/userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage

// Define the persist config
const persistConfig = {
  key: 'root', // Key for the storage
  storage, // Use localStorage
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, userReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  // Optionally add middleware or other configurations here
});

// Create a persistor
export const persistor = persistStore(store);

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type
export type AppDispatch = typeof store.dispatch;

export default store;
