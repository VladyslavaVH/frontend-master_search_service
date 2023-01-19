import { apiSlice } from '../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/login',//auth
                method: 'POST',
                body: { ...credentials }
            })
        }),
        changeAvatar: builder.mutation({
            query: formData => ({
                url: '/user/change/avatar',
                method: 'POST',
                body: formData
            })
        }),         
    })
});

export const { 
    useLoginMutation,
    useChangeAvatarMutation,
 } = authApiSlice;