import axios from 'axios';
import { useDispatch } from "react-redux";
import { setAuth } from "../features/auth/authSlice";

axios.defaults.withCredentials = true;
const useRefreshToken = () => {
    const dispatch = useDispatch();
    
    const refresh = async () => {
        const response = await axios.get(//REACT_APP_BACKEND_URL
            `${process.env.REACT_APP_BACKEND_URL}/refresh`, 
            {
                headers: { 'Content-Type': 'application/json' }, 
                withCredentials: true
            }
        );

        dispatch(setAuth({...response.data}));

        return response.data.accessToken;
    }

    return refresh;
};

export default useRefreshToken;