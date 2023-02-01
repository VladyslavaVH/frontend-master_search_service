import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { selectCurrentToken, selectPersist } from './authSlice';
import { useSelector } from 'react-redux';
import useRefreshToken from './../../hooks/useRefreshToken';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const token = useSelector(selectCurrentToken);
    const persist = useSelector(selectPersist);

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        if (!token) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }

        return () => isMounted = false;
    }, [refresh, token]);

    useEffect(() => {
        console.log('isLoading', isLoading);
        console.log('token', token);
    }, [isLoading, token]);
    
    return (
        <>
            {!persist
            ? <Outlet />
            : isLoading 
                ? <div>Loading...</div>//spinner
                : <Outlet />
            }
        </>
    );
};

export default PersistLogin;
