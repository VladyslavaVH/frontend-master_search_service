import { apiSlice } from "../../app/api/apiSlice";

export const detailsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getOptionCategories: builder.query({
            query: () => `/option/categories`,
            keepUnusedDataFor: 3,
            providesTags: ['newCategory']
        }), 
        getOptionCurrencies: builder.query({
            query: () => `/option/currencies`,
            keepUnusedDataFor: 5
        }), 
        checkPhone: builder.mutation({
            query: phone => ({
                url: '/check/phone',
                method: 'POST',
                body: { phone }
            }),
        }), 
    })
});

export const {
    useGetOptionCategoriesQuery,
    useGetOptionCurrenciesQuery,
    useCheckPhoneMutation,
} = detailsApiSlice

