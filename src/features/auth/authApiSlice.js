import { apiSlice } from '../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/login',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['settings'],
            providesTags: ['avatar', 'settings']
        }),
        registration: builder.mutation({
            query: credentials => ({
                url: '/register',
                method: 'POST',
                body: { ...credentials }
            }), 
            invalidatesTags: ['settings'],
            providesTags: ['settings']
        }),             
    })
});

export const { 
    useLoginMutation,
    useRegistrationMutation,
 } = authApiSlice;