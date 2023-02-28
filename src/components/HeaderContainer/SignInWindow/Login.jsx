import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../../features/auth/authSlice';
import { useLoginMutation } from '../../../features/auth/authApiSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPersist, setPersist } from './../../../features/auth/authSlice';
import { useTranslation } from "react-i18next";
import NotificationDialog from './../Popup/NotificationDialog';

const Login = ({ onClose, fromLocationData, from }) => {
    const { t } = useTranslation();
    const { register, handleSubmit } = useForm();
    const [isOpen, setIsOpen] = useState(false)
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
            setIsOpen(true);
            console.error(error);
        }
    };

    const onPersistChange = () => {
        setIsPersist(!isPersist);
        dispatch(setPersist(!isPersist));
    }

    useEffect(() => {
        
        localStorage.setItem('persist', isPersist);
    }, [isPersist]);

    return <div className="popup-tab-content" id="login">

        <div className="welcome-text">
            <h3>{`${t('Greetings')}`}</h3>
            <span>{t('DontHaveAnAccount')} <a data-signin="1" style={{ color: '#2a41e8', cursor: 'pointer' }}  className="register-tab">{t('SignUp')}</a></span>
        </div>

        <form onSubmit={ handleSubmit(onSubmit) } id="login-form">
            <div className="input-with-icon-left">
                <i className="icon-feather-phone"></i>
                <input type="tel" title="Only + and numbers"
                 {...register('phone', { required: true })}
                className="input-text with-border" name="phone" id="phone" placeholder={t('PhoneNumber')} required />
            </div>

            <div className="input-with-icon-left">
                <i className="icon-material-outline-lock"></i>
                <input type="password" title='Should be at least 8 characters long'
                {...register('password', { required: true })}
                className="input-text with-border" name="password" id="password" placeholder={t('Password')} required />
            </div>
        </form> 

            <div className="checkbox">
				<input type="checkbox" id="persistCheckbox" 
                checked={isPersist} onChange={onPersistChange} />
				<label htmlFor="persistCheckbox"><span className="checkbox-icon"></span> {t('TrustThisDevice')} </label>
			</div><br />

            {false && <><a href="" className="forgot-password">{t('ForgotPassword')}</a><br /></>}

        <button className="button full-width button-sliding-icon ripple-effect" type="submit" form="login-form">{t("LogIn")} <i className="icon-material-outline-arrow-right-alt"></i></button>

        <NotificationDialog open={isOpen} onClose={() => setIsOpen(false)}>
            {t('IncorrectPhoneNumberOrPassword')}
        </NotificationDialog>
    </div>;
};

export default Login;