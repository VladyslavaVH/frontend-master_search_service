import { apiSlice } from "../../app/api/apiSlice";

export const jobsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllJobsList: builder.query({
            query: (title, category) => `/jobs?${title ? `title=${title}&` : ''}${category ? `category=${category}` : ''}`,
            keepUnusedDataFor: 5
        }),
        getJobListingByClient: builder.query({
            query: () => `/client/job/listing`,
            keepUnusedDataFor: 5
        }),        
        getJobById: builder.query({
            query: id => `/job?jobId=${id}`,
            keepUnusedDataFor: 5
        }),        
        getJobPhotos: builder.query({
            query: id => `/job/photos?jobId=${id}`,
            keepUnusedDataFor: 5
        }),  
        postJob: builder.mutation({
            query: jobData => ({
                url: '/job', 
                method: 'POST',
                //headers: { 'Content-Type': 'multipart/form-data' },
                body: jobData
            })
        }),  
        editJob: builder.mutation({
            query: (id, jobData)  => ({
                url: `/job?jobId=${id}`,
                method: 'PUT',
                body: jobData
            })
        }),  
        deleteJob: builder.mutation({
            query: id => ({
                url: `/job?jobId=${id}`,
                method: 'DELETE',
            })
        }),    
        deleteCandidate: builder.mutation({
            query: ({jobId, masterId}) => ({
                url: `/client/job/candidate?jobId=${jobId}`,
                method: 'DELETE',
                body: {masterId}
            })
        }),    
        confirmCandidate: builder.mutation({
            query: ({jobId, masterId}) => ({
                url: `/client/job/candidate?jobId=${jobId}`,
                method: 'PUT',
                body: {masterId}
            })
        }),    
    })
});

export const {
    useGetAllJobsListQuery,
    useGetJobListingByClientQuery,
    useGetJobByIdQuery,
    useGetJobPhotosQuery,
    usePostJobMutation,
    useEditJobMutation,
    useDeleteJobMutation,
    useDeleteCandidateMutation,
    useConfirmCandidateMutation,
} = jobsApiSlice;

