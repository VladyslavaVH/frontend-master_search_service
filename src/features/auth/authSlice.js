import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const ROLE = {
    ADMIN: process.env.REACT_APP_ADMIN_ROLE, 
    CLIENT: process.env.REACT_APP_CLIENT_ROLE, 
    MASTER: process.env.REACT_APP_MASTER_ROLE
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        lang: 'en',
        isAuth: false,
        user: null,
        token: null,
        role: null,
        persist: false,
        isMaster: false,
        isAdmin: false,
        unreadNotifications: [],
        unreadMessages: []
    },
    reducers: {
        setAuth: (state, { payload }) => {
            state.token = payload.accessToken;            
            const decoded = jwtDecode(state.token);
            console.log(decoded);
            
            state.isAuth = true;
            state.user = decoded?.userInfo?.user || undefined;
            state.role = decoded?.userInfo?.role || undefined;

            switch (state.role) {
                case ROLE.ADMIN:
                    state.isAdmin = true;
                    break;
                case ROLE.CLIENT:
                    state.isMaster = false;
                    break;
                case ROLE.MASTER:
                    state.isMaster = true;
                    break;
                default:
                    state.isMaster = false;
                    break;
            }
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            state.isAuth = false;
        },
        setPersist: (state, { payload }) => {
            state.persist = payload;
        },
        setLanguage: (state, { payload }) => {
            state.lang = payload;
            document.documentElement.lang = state.lang;
        }
    }
});

export const { setAuth, logOut, setPersist, setLanguage } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectUnreadNotifications = (state) => state.auth.unreadNotifications;
export const selectUnreadMessages = (state) => state.auth.unreadMessages;
export const selectCurrentRole = (state) => state.auth.role;
export const selectCurrentToken = (state) => state.auth.token;
export const selectPersist = (state) => state.auth.persist;

export const selectIsAuth = (state) => state.auth.isAuth;
export const selectIsAdmin = (state) => state.auth.isAdmin;
export const selectIsMaster = (state) => state.auth.isMaster;