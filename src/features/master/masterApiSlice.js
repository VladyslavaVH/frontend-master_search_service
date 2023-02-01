import { apiSlice } from "../../app/api/apiSlice";

export const masterApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMasterStatistics: builder.query({
            query: () => `/master/statistics`,
            keepUnusedDataFor: 5
        }),
        getMasterConversations: builder.query({
            query: () => `/master/conversations`,
            keepUnusedDataFor: 5
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
    })
});

export const {
    useGetMasterStatisticsQuery,
    useGetMasterConversationsQuery,
    useGetMasterJobApplyStatusQuery,
    useApplyJobMutation,
} = masterApiSlice

