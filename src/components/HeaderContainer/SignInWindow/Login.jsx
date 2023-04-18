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
    const [isOpen, setIsOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isPassword, setIsPassword] = useState(true);

    const [login] = useLoginMutation();
    const persist = useSelector(selectPersist);
    const [isPersist, setIsPersist] = useState(persist);//??

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async e => {
        e.preventDefault();
        
        try {
            const userData = await login({ phone: phoneNumber == '+0965323364' ? '0965323364' : phoneNumber, password }).unwrap();
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
        isPersist && localStorage.setItem('persist', isPersist);
    }, [isPersist]);

    const onPhoneChange = val => {
        const phoneRegex = /^[\+0-9\b]+$/;
        const lastChar = val[val.length - 1];

        if (phoneRegex.test(lastChar) && phoneRegex.test(val)) {
            
            if (lastChar === '+') {
                return (!phoneNumber.startsWith('+') && phoneNumber.indexOf('+') === -1 && phoneNumber.length === 0)
                ? val                                          
                : val.substr(0, val.length - 1);
            }
            
            return val[0] === '+' ? val : '+' + val;      
            
        }
            
        return val.length === 0 ? '' : phoneNumber;
    };

    return <div className="popup-tab-content" id="login">

        <div className="welcome-text">
            <h3>{`${t('Greetings')}`}</h3>
            <span>{t('DontHaveAnAccount')} <a data-signin="1" style={{ color: '#2a41e8', cursor: 'pointer' }}  className="register-tab">{t('SignUp')}</a></span>
        </div>

        <form onSubmit={onSubmit} id="login-form">
            <div className="input-with-icon-left">
                <i className="icon-feather-phone"></i>
                <input type="tel"  title="Only + and numbers" 
                value={phoneNumber}
                onChange={e => setPhoneNumber(onPhoneChange(e.target.value))}
                className="input-text with-border" name="phone" id="phone" placeholder={t('PhoneNumber')} required />
            </div>

            <div className="input-with-eye-icon">
                <div className='input-with-icon-left'>
                    <i className="icon-material-outline-lock"></i>
                    <input type={isPassword ? 'password' : 'text'} title='Should be at least 8 characters long'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="input-text with-border" name="password" id="password" placeholder={t('Password')} required />
                </div>
                <i className={`icon-feather-eye${isPassword ? '' : '-off'}`} onClick={() => setIsPassword(!isPassword)}></i>
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