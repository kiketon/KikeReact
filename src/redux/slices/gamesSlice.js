import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gameService } from '../../services/service';

// Thunks
export const getGames = createAsyncThunk(
    'games/getGames',
    async (params, { rejectWithValue }) => {
        try {
            return await gameService.fetchGames(params);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getTrendingGames = createAsyncThunk(
    'games/getTrendingGames',
    async (_, { rejectWithValue }) => {
        try {
            return await gameService.fetchTrendingGames();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getGameDetails = createAsyncThunk(
    'games/getGameDetails',
    async (id, { rejectWithValue }) => {
        try {
            return await gameService.fetchGameDetails(id);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const loadFavorites = () => {
    try {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error("Failed to load favorites", error);
        return [];
    }
};

const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        items: [],
        trending: [],
        details: null,
        favorites: loadFavorites(),
        loading: false,
        error: null,
        totalCount: 0,
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const game = action.payload;
            const index = state.favorites.findIndex(f => f.id === game.id);
            if (index >= 0) {
                state.favorites.splice(index, 1);
            } else {
                state.favorites.push(game);
            }
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGames.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getGames.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.results;
                state.totalCount = action.payload.count;
            })
            .addCase(getGames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getTrendingGames.fulfilled, (state, action) => {
                state.trending = action.payload;
            })
            .addCase(getGameDetails.fulfilled, (state, action) => {
                state.details = action.payload;
            });
    },
});

export const { toggleFavorite } = gamesSlice.actions;
export default gamesSlice.reducer;
