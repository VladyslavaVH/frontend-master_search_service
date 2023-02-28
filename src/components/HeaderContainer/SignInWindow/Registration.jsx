import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import NumberVerification from './NumberVerification';
import { useTranslation } from "react-i18next";
import PhoneInput from 'react-phone-input-2';
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../../utils/firebase.config';
import { PHONE_INPUT_STYLE, PHONE_INPUT_BUTTON_STYLE, PHONE_INPUT_CONTAINER_STYLE } from './styles';

import { ReactComponent as MySpinner } from '../../.././amimations/mySpinner.svg';
import NotificationDialog from '../Popup/NotificationDialog';

const Registration = ({ onClose }) => {
    const { t } = useTranslation();
    const [regData, setRegData] = useState(null);
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);//? false
    const [isNumberVer, setIsNumberVer] = useState(false);//? set false
    const [phone, setPhone] = useState(null);//? set null
    const [isClientChecked, setIsClientChecked] = useState(true);

    const [isOpen, setIsOpen] = useState(false);
    const [notificationText, setNotificationText] = useState('');

    // useEffect(() => {
    //     if (notificationText.length > 0) {
    //         setIsOpen(true);            
    //     }
    // }, [notificationText]);

    function onCaptchVerify() {
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

        setLoading(true);
        onCaptchVerify();

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
            setNotificationText(t('InvalidPhoneNumberFormat'));
            setIsOpen(true);
            setLoading(false);
        });
    }

    const onSubmit = async (data) => { 
        try {

            if (data.password !== data.passwordRepeat) {
                throw new Error(t('InvalidPassword'));
            }

            const formatPhone = "+" + phone;
            setPhone(formatPhone);   

            let newData = {
                ...data,
                phone: formatPhone
            };
            delete newData.passwordRepeat;
            setRegData(newData);

            sendOTP(formatPhone);
        } catch (error) {
            setNotificationText(error.message);
            setIsOpen(true);
            console.error(error);
        }
    };

    return <div className="popup-tab-content" id="register">
        {isNumberVer
        ? <NumberVerification onClose={onClose} regData={regData} phone={phone} resendOTP={() => sendOTP(phone)} />
        : <>
            <form onSubmit={handleSubmit(onSubmit)} id="register-account-form">
                <div className="welcome-text">
                    <h3>{t('LetsCreateYourAccount')}</h3>
                </div>

                <div className="account-type">

                    <div>
                        <input checked={isClientChecked} onClick={() => setIsClientChecked(true)}
                            value="client" type="radio"
                            {...register('accountType', { required: true })}
                            name="accountType" id="client-radio" className="account-type-radio" />
                        <label htmlFor="client-radio" className="ripple-effect-dark"><i className="icon-material-outline-account-circle"></i> {t("Client")}</label>
                    </div>

                    <div>
                        <input checked={!isClientChecked} onClick={() => setIsClientChecked(false)}
                            value="master" type="radio" 
                            {...register('accountType', { required: true })}
                            name="accountType" id="master-radio" className="account-type-radio" />
                        <label htmlFor="master-radio" className="ripple-effect-dark"><i className="icon-material-outline-business-center"></i> {t('Master')}</label>
                    </div>

                </div>

                <div className="input-with-icon-left">
                    <i className="icon-feather-user"></i>
                    <input type="text" title='Only letters' autoComplete='off' placeholder={t("FirstName")} required 
                    {...register('firstName', { required: true })} className="input-text with-border" name="firstName" id="firstName-register" />
                </div>

                <div className="input-with-icon-left">
                    <i className="icon-feather-user"></i>
                    <input type="text" title='Only letters' autoComplete='off' placeholder={t("LastName")} required 
                    {...register('lastName', { required: true })} className="input-text with-border" name="lastName" id="lastName-register" />
                </div>

                {/* <div className="input-with-icon-left">
                    <i className="icon-feather-phone"></i>
                    <input type="tel" title="Only + and numbers"
                        {...register('phone', { required: true })} className="input-text with-border"
                        pattern='^\+(?:[0-9] ?){6,14}[0-9]$'
                        name="phone" id="phone" placeholder="+38011111111" required />
                </div> */}

                <PhoneInput 
                disableDropdown={true}
                preferredCountries={['ua', 'us', 'cz']}
                inputProps={{
                    name: 'phone',
                    required: true,
                    autoFocus: true,                    
                }}
                inputStyle={PHONE_INPUT_STYLE}                
                containerStyle={PHONE_INPUT_CONTAINER_STYLE}
                buttonStyle={PHONE_INPUT_BUTTON_STYLE}
                country={"ua"} 
                value={phone} 
                onChange={setPhone} />

                <div className="input-with-icon-left" title="Should be at least 8 characters long" data-tippy-placement="bottom">
                    <i className="icon-material-outline-lock"></i>
                    <input type="password" {...register('password', { required: true })} pattern={'^[0-9A-Za-z-_\.`~!@#$%^&*()+=\?]{8,20}$'} className="input-text with-border" name="password" id="password-register" placeholder={t("Password")} required />
                </div>

                <div className="input-with-icon-left" title="Should be at least 8 characters long">
                    <i className="icon-material-outline-lock"></i>
                    <input type="password" {...register('passwordRepeat', { required: true })} pattern={'^[0-9A-Za-z-_\.`~!@#$%^&*()+=\?]{8,20}$'} className="input-text with-border" name="passwordRepeat" id="password-repeat-register" placeholder={t("RepeatPassword")} required />
                </div>
            </form>

            {loading
            ? <div>
                <span className='button full-width button-sliding-icon ripple-effect'>
                    <MySpinner style={{
                        display: 'inline-block',
                        marginBottom: '-10px',
                    }} />
                    {t("Register")}
                </span>
            </div>
            :<button type="submit" form="register-account-form" className="margin-top-10 button full-width button-sliding-icon ripple-effect">
                
                {t("Register")} 
                <i className="icon-material-outline-arrow-right-alt"></i>
            </button>
            }
        </>}

        <div className="margin-top-40"
            id="recaptcha-container"></div>

        <NotificationDialog open={isOpen} onClose={() => setIsOpen(false)}>
            {notificationText}
        </NotificationDialog>
    </div>;
};

export default Registration;
