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
import { useCheckPhoneMutation } from '../../../features/details/detailsApiSlice';

const Registration = ({ onClose }) => {
    const { t } = useTranslation();
    const [regData, setRegData] = useState(null);
    const { register, handleSubmit } = useForm();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);//? false
    const [isNumberVer, setIsNumberVer] = useState(false);//? set false
    const [phone, setPhone] = useState(null);//? set null
    const [checkPhone] = useCheckPhoneMutation();
    const [isClientChecked, setIsClientChecked] = useState(true);

    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [errorText, setErrorText] = useState('');

    const [isWarningOpen, setIsWarningOpen] = useState(false);
    const [warningText, setWarningText] = useState('');

    const [isPassword, setIsPassword] = useState(true);
    const [isPasswordRepeat, setIsPasswordRepeat] = useState(true);

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

    const onSubmit = async (data) => { 
        try {

            setLoading(true);

            try {
                if (data.password !== data.passwordRepeat) {
                    throw new Error(t('InvalidTwicePasswordMessage'));
                }

                if (data.password.length < 8 || data.password.length > 20) {
                    throw new Error(t('InvalidPassword'));
                }
            } catch (error) {
                setWarningText(error.message);
                setIsWarningOpen(true);
                setLoading(false);
                console.error(error);
                return;
            }

            if (!firstName && firstName?.length == 0 && !lastName && lastName?.length == 0) {
                throw new Error(t('EmptyFieldsMessage'))
            }

            if (!phone) {
                throw new Error(t('EmptyPhoneNumberMessage'));
            }

            let formatPhone = phone;
            if (!phone.startsWith('+')) {
                formatPhone = "+" + phone;
            }
            setPhone(formatPhone);   

            const isPhoneExists = await checkPhone(formatPhone).unwrap();

            if (isPhoneExists) {
                throw new Error(t('PhoneExistsMessage'));
            }

            let newData = {
                ...data,
                phone: formatPhone,
                firstName,
                lastName
            };
            delete newData.passwordRepeat;
            setRegData(newData);

            sendOTP(formatPhone);
        } catch (error) {
            setErrorText(error.message);
            setIsErrorOpen(true);
            setLoading(false);
            console.error(error);
        }
    };

    const isDigit = (char) => char >= '0' && char <= '9';

    const isSymbol = (char) => {
        const regex = /^[~:;.,!@#$%^&*()-_+="><?\/|]+$/gm;
        return regex.test(char);
    }

    const onChange = val => {
        const lastChar = val[val.length - 1];
        if (isDigit(lastChar) || isSymbol(lastChar?.toLowerCase())) {
            return val.substr(0, val.length - 1);
        }
        return val;
    }

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
                    <input type="text" title='Only letters' autoComplete='off' placeholder={t("FirstName")} 
                    value={firstName} 
                    onChange={e => setFirstName(onChange(e.target.value))}
                    className="input-text with-border" name="firstName" id="firstName-register" />
                </div>

                <div className="input-with-icon-left">
                    <i className="icon-feather-user"></i>
                    <input type="text" title='Only letters' autoComplete='off' placeholder={t("LastName")} 
                    value={lastName}
                    onChange={e => setLastName(onChange(e.target.value))}
                    className="input-text with-border" name="lastName" id="lastName-register" />
                </div>

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

                <div className='input-with-eye-icon'>
                    <div className="input-with-icon-left" title="Should be at least 8 characters long" data-tippy-placement="bottom">
                        <i className="icon-material-outline-lock"></i>
                        <input type={isPassword ? 'password' : 'text'} {...register('password', { required: true })} 
                        className="input-text with-border" name="password" id="password-register" placeholder={t("Password")} required />
                    </div>
                    <i className={`icon-feather-eye${isPassword ? '' : '-off'}`} onClick={() => setIsPassword(!isPassword)}></i>
                </div>

                <div className='input-with-eye-icon'>
                    <div className="input-with-icon-left" title="Should be at least 8 characters long">
                        <i className="icon-material-outline-lock"></i>
                        <input type={isPasswordRepeat ? 'password' : 'text'} {...register('passwordRepeat', { required: true })} 
                        className="input-text with-border" name="passwordRepeat" id="password-repeat-register" placeholder={t("RepeatPassword")} required />
                    </div>
                    <i className={`icon-feather-eye${isPasswordRepeat ? '' : '-off'}`} onClick={() => setIsPasswordRepeat(!isPasswordRepeat)}></i>
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

        <NotificationDialog open={isErrorOpen} onClose={() => setIsErrorOpen(false)}>
            {errorText}
        </NotificationDialog>

        <NotificationDialog type='warning' open={isWarningOpen} onClose={() => setIsWarningOpen(false)}>
            {warningText}
        </NotificationDialog>
    </div>;
};

export default Registration;
