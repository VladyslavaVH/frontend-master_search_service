import { apiSlice } from "../../app/api/apiSlice";

export const detailsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getOptionCategories: builder.query({
            query: () => `/option/categories`,
            keepUnusedDataFor: 5
        }), 
        getOptionCurrencies: builder.query({
            query: () => `/option/currencies`,
            keepUnusedDataFor: 5
        }), 
    })
});

export const {
    useGetOptionCategoriesQuery,
    useGetOptionCurrenciesQuery
} = detailsApiSlice

