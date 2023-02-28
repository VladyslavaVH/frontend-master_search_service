import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Verified from "./Verified";
import { ReactComponent as MySpinner } from '../../.././amimations/mySpinner.svg';
import { setAuth } from '../../../features/auth/authSlice';
import { useRegistrationMutation } from "../../../features/auth/authApiSlice";
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentToken } from './../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

//authentication.languageCode = 'en-US';
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

const INPUT_STYLES = {
    maxWidth: '40px',
    maxHeight: '40px',
    padding: '14px'
};

const NumberVerification = ({ regData, phone, onClose, resendOTP }) => {
    const { t } = useTranslation();
    const [otp, setOTP] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [registration] = useRegistrationMutation();
    const [loading, setLoading] = useState(false);
    const token = useSelector(selectCurrentToken);
    const [user, setUser] = useState(null);
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        let code = '';
        for (const n in data) {
            code += data[n];
        }
        
        setLoading(true);
        window.confirmationResult
        .confirm(code)
        .then(async (res) => {
            //console.log(res);
            const userData = await registration(regData).unwrap();
            if (!userData) return;

            dispatch(setAuth({...userData}));
            setUser(res.user);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }

    const focusNext = e => {
        let target = e.srcElement || e.target;
        let maxLength = parseInt(target.attributes["maxlength"].value, 10);
        let myLength = target.value.length;
        if (myLength >= maxLength) {
            let next = target;
            while (next = next.nextElementSibling) {
                if (next == null)
                    break;
                if (next.tagName.toLowerCase() === "input") {
                    next.focus();
                    break;
                }
            }
        }
        // Move to previous field if empty (user pressed backspace)
        else if (myLength === 0) {
            let previous = target;
            while (previous = previous.previousElementSibling) {
                if (previous == null)
                    break;
                if (previous.tagName.toLowerCase() === "input") {
                    previous.focus();
                    break;
                }
            }
        }
    }

    return <>
        {token
        ? <Verified onClose={onClose} />
        : <>
            <div className="welcome-text">
                <h3>{t('PleaseCheckYourPhone')}</h3>
                <span>{t('WeReSendACodeTo')} <b>{phone}</b></span>
            </div>
    
            <form onKeyUp={focusNext} style={{ display: 'flex', justifyContent: 'space-evenly' }} onSubmit={handleSubmit(onSubmit)} id="phone-verification-form">
                <input type="text" maxLength={1} {...register('0', { required: true })}
                    className="input-text with-border" style={INPUT_STYLES}
                    name="0" placeholder="_" required />
    
                <input type="text" maxLength={1} {...register('1', { required: true })}
                    className="input-text with-border" style={INPUT_STYLES}
                    name="1" placeholder="_" required />
    
                <input type="text" maxLength={1} {...register('2', { required: true })}
                    className="input-text with-border" style={INPUT_STYLES}
                    name="2" placeholder="_" required />
    
                <input type="text" maxLength={1} {...register('3', { required: true })}
                    className="input-text with-border" style={INPUT_STYLES}
                    name="3" placeholder="_" required />
    
                <input type="text" maxLength={1} {...register('4', { required: true })}
                    className="input-text with-border" style={INPUT_STYLES}
                    name="4" placeholder="_" required />
    
                <input type="text" maxLength={1} {...register('5', { required: true })}
                    className="input-text with-border" style={INPUT_STYLES}
                    name="5" placeholder="_" required />
            </form>
    
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <span>{t("DidntHaveACode")} <a onClick={resendOTP} className="register-tab" style={{ color: '#2a41e8', cursor: 'pointer' }}>{t('ClickToResend')}</a></span>
            </div>
    
            {loading
                ? <div>
                    <span className='button full-width button-sliding-icon ripple-effect'>
                        <MySpinner style={{
                            display: 'inline-block',
                            marginBottom: '-10px',
                        }} />
                        {t("Confirm")}
                    </span>
                </div>
                : <button type="submit" form="phone-verification-form" className="margin-top-10 button full-width button-sliding-icon ripple-effect">
                    {t("Confirm")} 
                    <i className="icon-material-outline-arrow-right-alt"></i>
                </button>
            }
            
        </>}
    </>;
};

export default NumberVerification;
