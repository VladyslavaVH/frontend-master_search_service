import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentRole, ROLE, setAuth, setNewLocation } from "../features/auth/authSlice";
import { useUpdateCurrentMasterLocationMutation } from '../features/master/masterApiSlice';

axios.defaults.withCredentials = true;
const useRefreshToken = () => {
    const dispatch = useDispatch();
    const role = useSelector(selectCurrentRole);
    const [updateCurrentMasterLocation] = useUpdateCurrentMasterLocationMutation();

    const success = async ({ coords }) => {
        let newCoords = {
            lat: coords.latitude,
            lng: coords.longitude
        };

        try {
            let { success } = await updateCurrentMasterLocation(newCoords).unwrap();
            if (success) {
                dispatch(setNewLocation(newCoords));                
            }
        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        if (role && role === ROLE.MASTER && navigator.geolocation) {
            if (!/safari/i.test(navigator.userAgent)) {
                navigator.permissions.query({ name: "geolocation" }).then((permission) => {
                    if (permission.state === "granted") {
                        navigator.geolocation.getCurrentPosition(
                            success,
                            () => console.error('Geolocation API not supported by this browser')
                        );                    
                        
                    } else {
    
                    }   
                });
            } else {
                navigator.geolocation.getCurrentPosition(
                    success,
                    err => console.error(err)
                );
            }
        }
    }, [role]);
    
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