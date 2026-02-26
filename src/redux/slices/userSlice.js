import { createSlice } from '@reduxjs/toolkit';

const loadAttendingEvents = () => {
    try {
        const saved = localStorage.getItem('attendingEvents');
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        return [];
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: true,
        profile: {
            name: 'Kike User',
            email: 'kike@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kike',
            myEvents: loadAttendingEvents(),
        },
    },
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.isLoggedIn = false;
        },
        toggleEventAttendance: (state, action) => {
            const eventId = action.payload;
            const index = state.profile.myEvents.indexOf(eventId);
            if (index >= 0) {
                state.profile.myEvents.splice(index, 1);
            } else {
                state.profile.myEvents.push(eventId);
            }
            localStorage.setItem('attendingEvents', JSON.stringify(state.profile.myEvents));
        }
    },
});

export const { login, logout, toggleEventAttendance } = userSlice.actions;
export default userSlice.reducer;
