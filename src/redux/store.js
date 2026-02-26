import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './slices/gamesSlice';
import eventsReducer from './slices/eventsSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        games: gamesReducer,
        events: eventsReducer,
        user: userReducer,
    },
});

export default store;
