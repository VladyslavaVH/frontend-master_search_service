import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { ReactComponent as MySpinner } from '../../../../.././animations/mySpinner.svg';
import Success from './../../../../Office/Settings/Success';
import { useResetPasswordMutation, useLoginMutation } from '../../../../../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../../../../features/auth/authSlice';
import NotificationDialog from './../../../Popup/NotificationDialog';

const ResetPassword = ({ onClose, phone, loading, setLoading }) => {
    const { t } = useTranslation();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationText, setNotificationText] = useState(false);
    const [resetPassword] = useResetPasswordMutation();
    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isPassword, setIsPassword] = useState(true);
    const [isRepeatPassword, setIsRepeatPassword] = useState(true);
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const onSubmit = async e => {
        e.preventDefault();

        try {
            setLoading(true);

            if (password !== repeatPassword) {
                throw new Error('InvalidTwicePasswordMessage');
            }

            const res = await resetPassword({ newPassword: password, phone }).unwrap();
            if (!res.success) throw new Error (res.message);
            
            setIsSuccess(true);

            const userData = await login({ phone: phone == '+0965323364' ? '0965323364' : phone, password }).unwrap();
            if (!userData) throw new Error('IncorrectPhoneNumberOrPassword');

            dispatch(setAuth({ ...userData }));

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
            setNotificationText(error.message);
            setIsNotificationOpen(true);
        }
    }

    return <>
        {!isSuccess
            ? <>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="welcome-text">
                        <h3>{t('EnterANewPassword')}</h3>
                    </div>

                    <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}
                        onSubmit={onSubmit}
                        id="reset-password-form">
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

                        <div className="input-with-eye-icon">
                            <div className='input-with-icon-left'>
                                <i className="icon-material-outline-lock"></i>
                                <input type={isRepeatPassword ? 'password' : 'text'} title='Should be at least 8 characters long'
                                    value={repeatPassword}
                                    onChange={e => setRepeatPassword(e.target.value)}
                                    className="input-text with-border" name="password" id="password" placeholder={t('RepeatPassword')} required />
                            </div>
                            <i className={`icon-feather-eye${isRepeatPassword ? '' : '-off'}`} onClick={() => setIsRepeatPassword(!isRepeatPassword)}></i>
                        </div>
                    </form>

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
                        : <button type="submit" form="reset-password-form" className="margin-top-10 button full-width button-sliding-icon ripple-effect">
                            {t("Confirm")}
                            <i className="icon-material-outline-arrow-right-alt"></i>
                        </button>
                    }
                </div>
            </>
            : <Success onClose={onClose} mainText={'PasswordReset'} secondText={'YourPasswordHasBeenUpdatedSuccessfully'} />}

        <NotificationDialog open={isNotificationOpen} onClose={() => setIsNotificationOpen(false)}>
            {t(notificationText)}
        </NotificationDialog>
    </>
}

export default ResetPassword;
