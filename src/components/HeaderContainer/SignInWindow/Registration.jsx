import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import NumberVerification from './NumberVerification';
import { registerAPI } from '../../../api/api';
import { useTranslation } from "react-i18next";

const Registration = ({ onClose }) => {
    const { t } = useTranslation();
    const { register, handleSubmit } = useForm();
    const [isNumberVer, setIsNumberVer] = useState(false);//? set false
    const [phone, setPhone] = useState(null);
    const [isClientChecked, setIsClientChecked] = useState(true)

    const onSubmit = (data) => {
        registerAPI.register(data)
        .then(response => {
            if (response.status == 201) {
                console.log('Successfully registered');
                //setPhone(data.phone);
                //setIsNumberVer(true);
            } else {
                console.log('Failed to register');
            }
        });
    };

    return <div className="popup-tab-content" id="register">
        {isNumberVer
        ? <NumberVerification onClose={onClose} phone={phone} />
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

                <div className="input-with-icon-left">
                    <i className="icon-feather-phone"></i>
                    <input type="tel" title="Only + and numbers"
                        {...register('phone', { required: true })} className="input-text with-border"
                        pattern='^\+(?:[0-9] ?){6,14}[0-9]$'
                        name="phone" id="phone" placeholder="+38011111111" required />
                </div>

                <div className="input-with-icon-left" title="Should be at least 8 characters long" data-tippy-placement="bottom">
                    <i className="icon-material-outline-lock"></i>
                    <input type="password" {...register('password', { required: true })} pattern={'^[0-9A-Za-z-_\.`~!@#$%^&*()+=\?]{8,20}$'} className="input-text with-border" name="password" id="password-register" placeholder={t("Password")} required />
                </div>

                <div className="input-with-icon-left" title="Should be at least 8 characters long">
                    <i className="icon-material-outline-lock"></i>
                    <input type="password" {...register('passwordRepeat', { required: true })} pattern={'^[0-9A-Za-z-_\.`~!@#$%^&*()+=\?]{8,20}$'} className="input-text with-border" name="passwordRepeat" id="password-repeat-register" placeholder={t("RepeatPassword")} required />
                </div>
            </form>

            <button type="submit" form="register-account-form" className="margin-top-10 button full-width button-sliding-icon ripple-effect">{t("Register")} <i className="icon-material-outline-arrow-right-alt"></i></button>
        </>}
    </div>;
};

export default Registration;
