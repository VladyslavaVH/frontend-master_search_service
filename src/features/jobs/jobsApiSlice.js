import { apiSlice } from "../../app/api/apiSlice";

export const jobsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllJobsList: builder.query({
            query: ({ page, bounds, categories, payment, title }) => {
                let categoriesQuery = '';

                for (const i in categories) {
                    categoriesQuery += `&category${i}=${categories[i]}`;
                }

                return `/jobs?page=${page}${(categories && categories.length > 0 ? categoriesQuery : '')}${title ? `&title=${title}` : ''}${bounds ? `&startLat=${bounds.lats.startLat}&endLat=${bounds.lats.endLat}&startLng=${bounds.lngs.startLng}&endLng=${bounds.lngs.endLng}` : ''}${payment ? `&minPayment=${payment.minPayment}&maxPayment=${payment.maxPayment}` : '' }`
            },
            keepUnusedDataFor: 1,
            providesTags: ['job']
        }),
        getJobListingByClient: builder.query({
            query: () => `/client/job/listing`,
            keepUnusedDataFor: 5,
            providesTags: ['job']
        }),        
        getJobById: builder.query({
            query: id => `/job?jobId=${id}`,
            keepUnusedDataFor: 5,
            providesTags: ['job']
        }),        
        getJobPhotos: builder.query({
            query: id => `/job/photos?jobId=${id}`,
            keepUnusedDataFor: 5,
            invalidatesTags: ['job', 'files']
        }),  
        postJob: builder.mutation({
            query: jobData => ({
                url: '/job', 
                method: 'POST',
                //headers: { 'Content-Type': 'multipart/form-data' },
                body: jobData
            }),
            invalidatesTags: ['files', 'job']
        }),  
        editJob: builder.mutation({
            query: (id, jobData)  => ({
                url: `/job?jobId=${id}`,
                method: 'PUT',
                body: jobData
            }),
            invalidatesTags: ['job']
        }),  
        deleteJob: builder.mutation({
            query: id => ({
                url: `/job?jobId=${id}`,
                method: 'DELETE',
            }), 
            invalidatesTags: ['files', 'job']
        }),    
        deleteCandidate: builder.mutation({
            query: ({jobId, masterId}) => ({
                url: `/client/job/candidate?jobId=${jobId}`,
                method: 'DELETE',
                body: {masterId}
            }),
            invalidatesTags: ['job']
        }),    
        confirmCandidate: builder.mutation({
            query: ({jobId, masterId}) => ({
                url: `/client/job/candidate?jobId=${jobId}`,
                method: 'PUT',
                body: {masterId}
            }),
            invalidatesTags: ['job']
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

