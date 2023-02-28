import { apiSlice } from "../../app/api/apiSlice";

export const masterApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMasterStatistics: builder.query({
            query: () => `/master/statistics`,
            keepUnusedDataFor: 5
        }),
        getMasterConversations: builder.query({
            query: () => `/master/conversations`,
            providesTags: ['message'],
            keepUnusedDataFor: 5,
        }),  
        getMasterJobApplyStatus: builder.query({
            query: jobId => `/master/check/job/apply?jobId=${jobId}`,
            keepUnusedDataFor: 5
        }),  
        applyJob: builder.mutation({
            query: ({ jobId, applyJobData }) => ({
                url: `/master/apply?jobId=${jobId}`,
                method: 'PUT',
                body: applyJobData
            })
        }),
        changeProfileSettings: builder.mutation({
            query: data => ({
                url: `/master/change/profile/settings`,
                method: 'POST',
                body: {...data}
            }),
            invalidatesTags: ['settings']
        }),
    })
});

export const {
    useGetMasterStatisticsQuery,
    useGetMasterConversationsQuery,
    useGetMasterJobApplyStatusQuery,
    useApplyJobMutation,
    useChangeProfileSettingsMutation,
} = masterApiSlice

