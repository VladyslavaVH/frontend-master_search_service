import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../../../features/auth/authSlice';
import { useLoginMutation } from '../../../../features/auth/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPersist, setPersist } from '../../../../features/auth/authSlice';
import { useTranslation } from "react-i18next";
import NotificationDialog from '../../Popup/NotificationDialog';
import { useCheckPhoneMutation } from '../../../../features/details/detailsApiSlice';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../../../utils/firebase.config';
import ResetNumberVerification from './Reset/ResetNumberVerification';
import LoginForm from './LoginForm';

const Login = ({ onClose, fromLocationData, from }) => {
    const { t } = useTranslation();
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [isNumberVer, setIsNumberVer] = useState(false);
    
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [errorText, setErrorText] = useState('IncorrectPhoneNumberOrPassword');

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
            console.log(error);
            console.log(error.message);
            setErrorText(t('InvalidPhoneNumberFormat'));
            setIsErrorOpen(true);
            setLoading(false);
        });
    }

    return <div className="popup-tab-content" id="login">

        {!isNumberVer
            ? <LoginForm 
                onClose={onClose} 
                fromLocationData={fromLocationData} 
                from={from} 
                loading={loading} 
                setLoading={setLoading} 
                setPhone={setPhone} 
                sendOTP={sendOTP} 
                phone={phone} 
                setIsErrorOpen={setIsErrorOpen} 
                isErrorOpen={isErrorOpen} 
                setErrorText={setErrorText} 
              />
            : <ResetNumberVerification 
                onClose={onClose} 
                phone={phone} 
                resendOTP={() => sendOTP(phone)} 
                loading={loading} 
                setLoading={setLoading}
              />
        }

        <div className="margin-top-40"
            id="recaptcha-container"></div>

        <NotificationDialog open={isErrorOpen} onClose={() => setIsErrorOpen(false)}>
            {t(errorText)}
        </NotificationDialog>
    </div>;
};

export default Login;