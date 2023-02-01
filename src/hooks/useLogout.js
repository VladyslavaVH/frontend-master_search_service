import axios from 'axios';
import { useDispatch } from "react-redux";
import { logOut } from "../features/auth/authSlice";

axios.defaults.withCredentials = true;
const useLogout = () => {
    const dispatch = useDispatch();

    const logout = async () => {
        try {
            await axios.delete(//REACT_APP_BACKEND_URL
                `${process.env.REACT_APP_BACKEND_URL}/logout`, 
                {
                    headers: { 'Content-Type': 'application/json' }, 
                    withCredentials: true
                }
            );
            
            dispatch(logOut());        
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
};

export default useLogout;