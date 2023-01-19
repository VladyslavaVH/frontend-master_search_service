import { apiSlice } from '../../app/api/apiSlice';

export const refreshApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        refresh: builder.mutation({
            query: async () => ({
                url: '/refresh',
                method: 'GET',
                withCredentials: true
                //body: { ...credentials }
            })
        }),
    })
});

export const { useRefreshMutation } = refreshApiSlice;