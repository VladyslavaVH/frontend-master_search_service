import { apiSlice } from "../../app/api/apiSlice";

export const homeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getJobsMastersCount: builder.query({
            query: () => '/jobs/masters/count',
            keepUnusedDataFor: 5
        }),
        getPopularCategories: builder.query({
            query: () => '/popular/categories',
            keepUnusedDataFor: 5
        }),
        getRecentJobsList: builder.query({
            query: () => `/recent/jobs`,
            keepUnusedDataFor: 5
        }),
        getHighestRatedMasters: builder.query({
            query: () => `/jobs/masters/highestRated`,
            keepUnusedDataFor: 5
        }),
    })
});

export const {
    useGetJobsMastersCountQuery,
    useGetPopularCategoriesQuery,
    useGetRecentJobsListQuery,
    useGetHighestRatedMastersQuery,
} = homeApiSlice

