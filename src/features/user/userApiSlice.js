import { apiSlice } from "../../app/api/apiSlice";

export const masterApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotifications: builder.query({
            query: () => `/user/notifications`,
            keepUnusedDataFor: 5 
        }),
        getMessages: builder.query({
            query: (receiverId) => `/conversations/conversation?receiverId=${receiverId}`,
            keepUnusedDataFor: 5
        }),
        changeAvatar: builder.mutation({
            query: formData => ({
                url: '/user/change/avatar',
                method: 'POST',
                body: formData
            })
        }),
        createNewMessage: builder.mutation({
            query: formData => ({
                url: '/conversations',
                method: 'POST',
                body: formData
            })
        }),    
    })
});

export const {
    useGetNotificationsQuery,
    useGetMessagesQuery,
    useChangeAvatarMutation,
    useCreateNewMessageMutation,
} = masterApiSlice
