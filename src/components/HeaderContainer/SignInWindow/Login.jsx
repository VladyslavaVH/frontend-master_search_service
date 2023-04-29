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
import { useCheckPhoneMutation } from '../../../features/details/detailsApiSlice';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../../utils/firebase.config';
import ResetNumberVerification from './ResetNumberVerification';

const Login = ({ onClose, fromLocationData, from }) => {
    const { t } = useTranslation();
    const [phone, setPhone] = useState('');//? set null
    const [checkPhone] = useCheckPhoneMutation();
    const [loading, setLoading] = useState(false);//? false
    const [isNumberVer, setIsNumberVer] = useState(false);//? set false
    const [regData, setRegData] = useState(null);
    
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [errorText, setErrorText] = useState('IncorrectPhoneNumberOrPassword');

    const [isWarningOpen, setIsWarningOpen] = useState(false);
    const [warningText, setWarningText] = useState('');

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
            const userData = await login({ phone: phone == '+0965323364' ? '0965323364' : phone, password }).unwrap();
            if (!userData) return;

            dispatch(setAuth({...userData}));

            if (from) {
                navigate(from, { replace: true, state: {...fromLocationData} }, );
            } 
            onClose();

        } catch (error) {
            setIsErrorOpen(true);
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
                return (!phone.startsWith('+') && phone.indexOf('+') === -1 && phone.length === 0)
                ? val                                          
                : val.substr(0, val.length - 1);
            }
            
            return val[0] === '+' ? val : '+' + val;      
            
        }
            
        return val.length === 0 ? '' : phone;
    };

    function onCaptchaVerify() {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
              size: "invisible",
              callback: (response) => {
                //onSignup();
              },
              "expired-callback": () => {},
            },
            auth
          );
        }
    }

    const sendOTP = (phoneNumber) => {
        console.log("sendOTP", phoneNumber);

        onCaptchaVerify();

        const appVerifier = window.recaptchaVerifier;        

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setLoading(false);
            console.log("OTP sended successfully!");
            setIsNumberVer(true);
        })
        .catch((error) => {
            //alert(error);//? modal dialog about error
            console.log(error.message);
            setErrorText(t('InvalidPhoneNumberFormat'));
            setIsErrorOpen(true);
            setLoading(false);
        });
    }

    const onClickForgotPassword = async () => {
        try {
            if (!phone) {
                throw new Error(t('EmptyPhoneNumberMessage'));
            }

            const isPhoneExists = await checkPhone(phone).unwrap();

            if (!isPhoneExists) {
                throw new Error(t('PhoneNotExistsMessage'));
            }

            setRegData({ phone });

            sendOTP(phone);
            console.log('onClickForgotPassword');
        } catch (error) {
            setErrorText(error.message);
            setIsErrorOpen(true);
            setLoading(false);
            console.error(error);
        }
    };

    return <div className="popup-tab-content" id="login">

        {isNumberVer
        ? <ResetNumberVerification onClose={onClose} phone={phone} resendOTP={() => sendOTP(phone)} />
        : <>
            <div className="welcome-text">
                <h3>{`${t('Greetings')}`}</h3>
                <span>{t('DontHaveAnAccount')} <a data-signin="1" style={{ color: '#2a41e8', cursor: 'pointer' }}  className="register-tab">{t('SignUp')}</a></span>
            </div>
    
            <form onSubmit={onSubmit} id="login-form">
                <div className="input-with-icon-left">
                    <i className="icon-feather-phone"></i>
                    <input type="tel"  title="Only + and numbers" 
                    value={phone}
                    onChange={e => setPhone(onPhoneChange(e.target.value))}
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
    
                <a onClick={onClickForgotPassword} style={{ color: '#2a41e8', cursor: 'pointer' }} className="forgot-password">{t('ForgotPassword')}</a><br />
    
            <button className="button full-width button-sliding-icon ripple-effect" type="submit" form="login-form">{t("LogIn")} <i className="icon-material-outline-arrow-right-alt"></i></button>
        </>}

        <div className="margin-top-40"
            id="recaptcha-container"></div>

        <NotificationDialog open={isErrorOpen} onClose={() => setIsErrorOpen(false)}>
            {t(errorText)}
        </NotificationDialog>

        <NotificationDialog type='warning' open={isWarningOpen} onClose={() => setIsWarningOpen(false)}>
            {warningText}
        </NotificationDialog>
    </div>;
};

export default Login;