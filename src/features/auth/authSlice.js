import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import io from 'socket.io-client';

export const ROLE = {
    ADMIN: process.env.REACT_APP_ADMIN_ROLE, 
    CLIENT: process.env.REACT_APP_CLIENT_ROLE, 
    MASTER: process.env.REACT_APP_MASTER_ROLE
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        lang: 'en',
        defaultLanguage: { value: 'en', label: 'English' },
        isAuth: false,
        user: null,
        token: null,
        socket: null,
        role: null,
        persist: false,
        isMaster: false,
        isAdmin: undefined,
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

            state.socket = io(process.env.REACT_APP_BACKEND);
            console.log('socket:', state.socket);

            state.socket.emit('sendUser', state.user.id);

            state.socket.on('getUsers', users => {
                console.log('from server get users');
                console.log(users);
            });
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            state.isAuth = false;
            
            state.socket.emit('logOut');
            state.socket = null;
            localStorage.removeItem('isPersistent');
            localStorage.removeItem('persist');

        },
        setPersist: (state, { payload }) => {
            state.persist = payload;
        },
        setLanguage: (state, { payload }) => {
            state.lang = payload;
            document.documentElement.lang = state.lang;
        },
        setDefaultLanguage: (state, { payload }) => {
            state.defaultLanguage = payload;
        },
        setNewAvatar: (state, { payload }) => {
            state.user.avatar = payload;
        },
        setNewLocation: (state, { payload }) => {
            state.user.masterInfo.location = payload;
        },
        addNewMessage: (state, { payload }) => {
            state.unreadMessages.push(payload);
        },
        clearUnreadMessages: (state) => {
            state.unreadMessages = [];
        },
        clearUnreadMessagesByUser: (state, { payload }) => {
            const tmp = state.unreadMessages;
            state.unreadMessages = tmp.filter(el => 
                (el.id !== state.user.id && el.receiverId !== payload.targetUser) &&
                (el.id !== payload.targetUser && el.receiverId !== state.user.id)
            );
        },
    }
});

export const { setAuth, logOut, setPersist, setLanguage, setDefaultLanguage, setNewAvatar, setNewLocation, 
    addNewMessage, 
    clearUnreadMessages,
    clearUnreadMessagesByUser
} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectUnreadNotifications = (state) => state.auth.unreadNotifications;
export const selectUnreadMessages = (state) => state.auth.unreadMessages;
export const selectCurrentRole = (state) => state.auth.role;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentSocket = (state) => state.auth.socket;
export const selectCurrentLocation = (state) => state.auth.user?.masterInfo?.location;
export const selectPersist = (state) => state.auth.persist;

export const selectIsAuth = (state) => state.auth.isAuth;
export const selectIsAdmin = (state) => state.auth.role === ROLE.ADMIN;
export const selectIsMaster = (state) => state.auth.role === ROLE.MASTER;

export const selectDefaultLanguage = (state) => state.auth.defaultLanguage;
export const selectCurrentLanguage = (state) => state.auth.lang;