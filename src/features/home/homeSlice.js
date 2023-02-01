import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        count: {
            jobsCount: 0,
            mastersCount: 0,
        },
        popularCategories: [],
        recentJobs: [],
        highestRatedMasters: [],
    },
    reducers: {
        setCount: (state, { payload }) => {
            
        },
    }
});

export const { setAuth, logOut, setPersist } = homeSlice.actions;

export default homeSlice.reducer;

export const selectCurrentUser = (state) => state.home.user;