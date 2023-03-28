import { apiSlice } from "../../app/api/apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAdminPanel: builder.query({
            query: () => `/admin/panel`,
            keepUnusedDataFor: 5
        }),
        getUnverifiedMasters: builder.query({
            query: () => `/admin/unverified/masters`,
            keepUnusedDataFor: 5,
            providesTags: ['verification']
        }),
        getFullMasterInfo: builder.query({
            query: masterId => `/admin/full/master/info?masterId=${masterId}`,
            keepUnusedDataFor: 5,
            providesTags: ['files', 'verification']
        }),
        verifyMaster: builder.mutation({
            query: masterId => ({
                url: `/admin/verify/master?masterId=${masterId}`,
                method: 'PUT'
            }),
            invalidatesTags: ['permission', 'verification']
        }),
        changeFaqs: builder.mutation({
            query: newFaqs => ({
                url: `/admin/change/faqs`,
                method: 'POST',
                body: newFaqs
            }),
            invalidatesTags: ['faqs']
        }),
        createFaq: builder.mutation({
            query: newFaq => ({
                url: `/admin/create/faq`,
                method: 'POST',
                body: newFaq
            }),
            invalidatesTags: ['faqs']
        }),
        createNewCategory: builder.mutation({
            query: data => ({
                url: `/admin/create/new/category`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['newCategory']
        }),
        deleteCategory: builder.mutation({
            query: id => ({
                url: `/admin/delete/category`,
                method: 'PUT',
                body: { id }
            }),
            invalidatesTags: ['newCategory']
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
    useDeleteCategoryMutation,
    useCreateFaqMutation,
} = adminApiSlice

