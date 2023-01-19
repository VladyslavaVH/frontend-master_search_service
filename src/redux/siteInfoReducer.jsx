import '../api/api';

let initialState = {
    siteName: 'HELP 2 FIX',
    logo: '',
    year: 2022,
    email: '',
    phones: []
}

const siteInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default siteInfoReducer;
