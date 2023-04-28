import { apiSlice } from "../../app/api/apiSlice";

export const masterApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getInfo: builder.query({
            query: () => `/user/info`,
            keepUnusedDataFor: 5,
            providesTags: ['settings'] 
        }),
        getNotifications: builder.query({
            query: () => `/user/notifications`,
            keepUnusedDataFor: 5 
        }),
        getMessages: builder.query({
            query: (receiverId) => `/conversations/conversation?receiverId=${receiverId}`,
            keepUnusedDataFor: 5,
            providesTags: ['message']
        }),
        changeAvatar: builder.mutation({
            query: formData => ({
                url: '/user/change/avatar',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['avatar']
        }),
        sendEmailConfirmation: builder.mutation({
            query: formData => ({
                url: '/user/confirmation',
                method: 'PUT',
                body: formData
            }),
        }),  
        updateConfirmation: builder.mutation({
            query: formData => ({
                url: '/update/confirmation',
                method: 'PUT',
                body: formData
            }),
            invalidatesTags: ['settings']
        }),  
        createNewMessage: builder.mutation({
            query: formData => ({
                url: '/conversations',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['message']
        }),  
    })
});

export const {
    useGetInfoQuery,
    useGetNotificationsQuery,
    useGetMessagesQuery,
    useChangeAvatarMutation,
    useSendEmailConfirmationMutation,
    useUpdateConfirmationMutation,
    useCreateNewMessageMutation,
} = masterApiSlice

