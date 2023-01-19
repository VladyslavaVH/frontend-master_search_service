import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuth, logOut } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            //headers.Authorization = `Bearer ${token}`;
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token');
        //send refresh token to get new access token
        const refreshResult = await baseQuery('/refresh', api, extraOptions);
        console.log(refreshResult);
        
        if (refreshResult?.data) {
            const user = api.getState().auth.user;
            //store the new token
            api.dispatch(setAuth({ ...refreshResult.data, user }))
            //retry the original query with new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }

    return result;
};

export const apiSlice = createApi({
    //reducerPath: 'api', //optional
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
});
