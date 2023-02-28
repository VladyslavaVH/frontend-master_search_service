import { apiSlice } from "../../app/api/apiSlice";

export const mastersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllMastersList: builder.query({
            query: () => `/all/masters`,
            keepUnusedDataFor: 5
        }),
        getAllMastersRating: builder.query({
            query: () => `/masters/ratings`,
            keepUnusedDataFor: 5
        }),
        getMasterById: builder.query({
            query: id => `/master?userId=${id}`,
            keepUnusedDataFor: 5
        }),
        getAllCandidatesByClient: builder.query({
            query: id => `/client/job/candidates?userId=${id}`,
            keepUnusedDataFor: 5
        }),
        getMasterCategories: builder.query({
            query: id => `/master/categories?masterId=${id}`,
            keepUnusedDataFor: 2,
            providesTags: ['settings']
        }),
        getCommentsByMasterId: builder.query({
            query: id => `/master/comments?masterId=${id}`,
            keepUnusedDataFor: 5
        }),
        getRehiredJobCount: builder.query({
            query: id => `/master/rehired/job/count?masterId=${id}`,
            keepUnusedDataFor: 5
        }),
    })
});

export const {
    useGetAllMastersListQuery,
    useGetAllMastersRatingQuery,
    useGetMasterByIdQuery,
    useGetAllCandidatesByClientQuery,
    useGetMasterCategoriesQuery,
    useGetRehiredJobCountQuery,
    useGetCommentsByMasterIdQuery,
} = mastersApiSlice

