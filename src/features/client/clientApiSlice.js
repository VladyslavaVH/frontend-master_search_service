import { apiSlice } from "../../app/api/apiSlice";

export const clientApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getConversations: builder.query({
            query: () => `/client/conversations`,
            providesTags: ['message'],
            keepUnusedDataFor: 5,
        }),  
    })
});

export const {
    useGetConversationsQuery,
} = clientApiSlice

