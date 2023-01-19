import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const clientJobsSlice = createSlice({
    name: 'clientJobs',
    initialState: {
        myJobListings: [],
        candidates: [],
    },
    reducers: {
        setMyJobListings: (state, { payload }) => {
            state.myJobListings = payload;
        },
        setCandidates: (state, { payload }) => {
            console.log(payload);
            state.candidates = payload;
        },
    }
});

export const { setMyJobListings, setCandidates } = clientJobsSlice.actions;

export default clientJobsSlice.reducer;

export const selectMyJobListings = (state) => state.clientJobs.myJobListings;
export const selectCandidates = (state) => state.clientJobs.candidates;