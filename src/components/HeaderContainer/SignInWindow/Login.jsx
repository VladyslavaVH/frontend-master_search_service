import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../../features/auth/authSlice';
import { useLoginMutation } from '../../../features/auth/authApiSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPersist, setPersist } from './../../../features/auth/authSlice';

const Login = ({ onClose, fromLocationData, from }) => {
    const { register, handleSubmit } = useForm();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const [login, { isLoading }] = useLoginMutation();
    const persist = useSelector(selectPersist);
    const [isPersist, setIsPersist] = useState(false);//??

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const userData = await login(data).unwrap();
            if (!userData) return;

            dispatch(setAuth({...userData}));

            if (from) {
                navigate(from, { replace: true, state: {...fromLocationData} }, );
            }
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    const onPersistChange = () => {
        console.log(persist);
        setIsPersist(!isPersist);
        dispatch(setPersist(!isPersist));
        console.log('persist changed', persist);
    }

    useEffect(() => {
        
        localStorage.setItem('persist', isPersist);
    }, [isPersist]);

    return <div className="popup-tab-content" id="login">

        <div className="welcome-text">
            <h3>We're glad to see you again!</h3>
            <span>Don't have an account? <a href="#" className="register-tab">Sign Up!</a></span>
        </div>

        <form onSubmit={ handleSubmit(onSubmit) } id="login-form">
            <div className="input-with-icon-left">
                <i className="icon-feather-phone"></i>
                <input type="tel" title="Only + and numbers"
                 {...register('phone', { required: true })}
                className="input-text with-border" name="phone" id="phone" placeholder="Phone number" required />
            </div>

            <div className="input-with-icon-left">
                <i className="icon-material-outline-lock"></i>
                <input type="password" title='Should be at least 8 characters long'
                {...register('password', { required: true })}
                className="input-text with-border" name="password" id="password" placeholder="Password" required />
            </div>
        </form> 

            <div className="checkbox">
				<input type="checkbox" id="persistCheckbox" 
                checked={isPersist} onChange={onPersistChange} />
				<label htmlFor="persistCheckbox"><span className="checkbox-icon"></span> Trust this device </label>
			</div><br />

            <a href="" className="forgot-password">Forgot Password?</a><br />

        <button className="button full-width button-sliding-icon ripple-effect" type="submit" form="login-form">Log In <i className="icon-material-outline-arrow-right-alt"></i></button>

    </div>;
};

export default Login;