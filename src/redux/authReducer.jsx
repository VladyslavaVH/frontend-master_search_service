import '../api/api';

const SET_AUTH = 'SET_AUTH';
const LOGOUT = 'LOGOUT';
const TOGGLE_ONLINE_STATUS = 'TOGGLE_ONLINE_STATUS';
const TOGGLE_INVISIBLE_STATUS = 'TOGGLE_INVISIBLE_STATUS';

let initialState = {
    isAuth: false,
    notifications: [
        { id: 1, isNotRead: true, fullName: 'Michael Shanna', jobTitle: 'Full Stack Software Engineer' },
        { id: 2, isNotRead: false, fullName: 'Cindy Forrest', jobTitle: 'Full Stack Software Engineer' }
    ],
    unreadNotifications: [
        { id: 1, isNotRead: true, fullName: 'Michael Shanna', jobTitle: 'Full Stack Software Engineer' },
        { id: 2, isNotRead: false, fullName: 'Cindy Forrest', jobTitle: 'Full Stack Software Engineer' }
    ],
    messages: [
        { id: 1, isNotRead: true, isActive: false, isOnline: true, avatar: 'user-avatar-small-03.jpg', fullName: 'David Peterson', message: `Thanks for reaching out. I'm quite busy right now on many...`, date: '4 hours ago' },
        { id: 2, isNotRead: false, isActive: true, isOnline: false, avatar: 'user-avatar-small-02.jpg', fullName: 'Cindy Forest', message: `Hi Tom! Hate to break it to you, but I'm actually on vacation until...`, date: 'Yesterday' },
        { id: 3, isNotRead: true, isActive: false, isOnline: true, avatar: null, fullName: 'Marcia Kowalski', message: 'I received payment. Thanks for cooperation!', date: 'Yesterday' }
    ],
    unreadMessages: [
        { id: 1, isNotRead: true, isActive: false, isOnline: true, avatar: 'user-avatar-small-03.jpg', fullName: 'David Peterson', message: `Thanks for reaching out. I'm quite busy right now on many...`, date: '4 hours ago' },
        { id: 3, isNotRead: true, isActive: false, isOnline: true, avatar: null, fullName: 'Marcia Kowalski', message: 'I received payment. Thanks for cooperation!', date: 'Yesterday' }
    ],
    avatar: 'user-avatar-small-01.jpg',
    fullName: 'Tom Smith',
    phone: '',
    email: '',
    isOnline: true,
    isInvisible: false,
    isMaster: false,
    isAdmin: false,
    master: {
        isFullMasterReg: false,
        categories: [],
        tagLine: '',
        nationality: [],
        description: '',
        lat: 0,
        lng: 0
    },
    isEmailVerified: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH:
            let unread = [];
            for (const m of state.messages) {//action.data.messages
                if (m.isNotRead) {
                    unread.add(m);
                }
            }
            return {
                ...state,
                isAuth: true,
                unreadMessages: unread
            };
        case TOGGLE_ONLINE_STATUS:
            return {
                ...state,
                isOnline: action.isOnline
            }
        case TOGGLE_INVISIBLE_STATUS:
            return {
                ...state,
                isInvisible: action.isInvisible
            }
        case LOGOUT:
            return {
                ...state,
                isAuth: false,
            }
        default:
            return state;
    }
}

export const toggleInvisibleStatusAC = (isInvisible) => ({ type: TOGGLE_INVISIBLE_STATUS, isInvisible });
export const toggleInvisibleStatus = (isInvisible) => (dispatch) => {
    dispatch(toggleInvisibleStatusAC(isInvisible));
}

export const toggleOnlineStatusAC = (isOnline) => ({ type: TOGGLE_ONLINE_STATUS, isOnline });
export const toggleOnlineStatus = (isOnline) => (dispatch) => {
    dispatch(toggleOnlineStatusAC(isOnline));
}

export const logoutAC = () => ({ type: LOGOUT });
export const setLogout = () => (dispatch) => {
    dispatch(logoutAC());
}

export default authReducer;