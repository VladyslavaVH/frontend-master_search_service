import axios, {isCancel, AxiosError} from 'axios';

const instance = axios.create({
    //withCredentials: true,
    baseURL: 'http://localhost:5000',
    headers: {
        "Content-Type": 'application/json',
    }
});

export const testAPI = {
    testUsers() {
        return instance.get(
            `/api`
        );
    }
}

export const registerAPI = {
    register(data) {
        return instance.post('/register', data);
    },
};

export const loginAPI = {
    auth(data) {
        return instance.post('/login', data);
    }
}

export const homeAPI = {
    getPopularCategories() {
        return instance.get('/popular/categories');
    },
    getRecentJobs() {
        return instance.get('/recent/jobs');
    }, 
    getJobsMastersCount() {
        return instance.get('/jobs/masters/count');
    },
    getHighestRatedMasters() {
        return instance.get('/jobs/masters/highestRated');
    }
};

// export const registerAPI = {
//     registration(data) {
//         return instance.post('/user/user_creation.php', data);
//     },
//     verifyCode(email, code) {//email resend: list with code
//         return instance.put('/user/user_activation.php', {email, code});
//     },
//     resendCode(repeat, email) {
//         return instance.put('/user/user_activation.php', {repeat, email});
//     }
// }

// export const loginAPI = {
//     auth(email, password) {
//         return instance.post('/user/user_login.php', {email, password});
//     }
// }

// export const videoAPI = {
//     initializePage(id, channelId) {
//         return instance.get(
//             `/video/video_read_one.php?id=${id}&channelId=${channelId}&jwt=${localStorage.getItem('jwt')}`
//         );
//     }
// }
