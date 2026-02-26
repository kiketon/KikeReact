import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { eventService } from '../../services/service';

export const getEvents = createAsyncThunk(
    'events/getEvents',
    async (_, { rejectWithValue }) => {
        try {
            return await eventService.fetchEvents();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default eventsSlice.reducer;
