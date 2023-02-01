import { apiSlice } from "../../app/api/apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAdminPanel: builder.query({
            query: () => `/admin/panel`,
            keepUnusedDataFor: 5
        }),
        getUnverifiedMasters: builder.query({
            query: () => `/admin/unverified/masters`,
            keepUnusedDataFor: 5
        }),
        getFullMasterInfo: builder.query({
            query: masterId => `/admin/full/master/info?masterId=${masterId}`,
            keepUnusedDataFor: 5
        }),
        verifyMaster: builder.mutation({
            query: masterId => ({
                url: `/admin/verify/master?masterId=${masterId}`,
                method: 'PUT'
            })
        }),
        changeFaqs: builder.mutation({
            query: newFaqs => ({
                url: `/admin/change/faqs`,
                method: 'POST',
                body: newFaqs
            })
        }),
        createNewCategory: builder.mutation({
            query: data => ({
                url: `/admin/create/new/category`,
                method: 'POST',
                body: data
            })
        }),
        
    })
});

export const {
    useGetAdminPanelQuery,
    useGetUnverifiedMastersQuery,
    useGetFullMasterInfoQuery,
    useVerifyMasterMutation,
    useChangeFaqsMutation,
    useCreateNewCategoryMutation,
} = adminApiSlice

