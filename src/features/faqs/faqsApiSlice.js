import { apiSlice } from "../../app/api/apiSlice";

export const faqsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFaqs: builder.query({
            query: () => '/faqs',
            keepUnusedDataFor: 5
        }),
    })
});

export const {
    useGetFaqsQuery,
} = faqsApiSlice

