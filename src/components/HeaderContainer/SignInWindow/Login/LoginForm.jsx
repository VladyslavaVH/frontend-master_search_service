import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, selectPersist, setPersist } from '../../../../features/auth/authSlice';
import { useLoginMutation } from '../../../../features/auth/authApiSlice';
import { useCheckPhoneMutation } from '../../../../features/details/detailsApiSlice';
import { ReactComponent as MySpinner } from '../../../.././animations/mySpinner.svg';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onClose, fromLocationData, from, loading, setLoading, setPhone, sendOTP, phone, setIsErrorOpen, isErrorOpen, setErrorText }) => {
    const { t } = useTranslation();
    const [checkPhone] = useCheckPhoneMutation();

    const [password, setPassword] = useState('');
    const [isPassword, setIsPassword] = useState(true);

    const [login] = useLoginMutation();
    const persist = useSelector(selectPersist);
    const [isPersist, setIsPersist] = useState(persist);//??

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async e => {
        e.preventDefault();
        setIsErrorOpen(false);
        try {
            const userData = await login({ phone: phone == '+0965323364' ? '0965323364' : phone, password }).unwrap();
            if (!userData) return;

            dispatch(setAuth({ ...userData }));

            if (from) {
                navigate(from, { replace: true, state: { ...fromLocationData } },);
            }
            onClose();

        } catch (error) {
            !isErrorOpen && setIsErrorOpen(true);
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

    const onClickForgotPassword = async () => {
        try {
            setLoading(true);

            if (!phone) {
                throw new Error(t('EmptyPhoneNumberMessage'));
            }

            const isPhoneExists = await checkPhone(phone).unwrap();

            if (!isPhoneExists) {
                throw new Error(t('PhoneNotExistsMessage'));
            }

            sendOTP(phone);
        } catch (error) {
            setErrorText(error.message);
            setIsErrorOpen(true);
            setLoading(false);
            console.error(error);
        }
    };

    return <>
        <div className="welcome-text">
            <h3>{`${t('Greetings')}`}</h3>
            <span>{t('DontHaveAnAccount')} <a data-signin="1" style={{ color: '#2a41e8', cursor: 'pointer' }} className="register-tab">{t('SignUp')}</a></span>
        </div>

        <form onSubmit={onSubmit} id="login-form">
            <div className="input-with-icon-left">
                <i className="icon-feather-phone"></i>
                <input type="tel" title="Only + and numbers"
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

        {loading
            ? <div>
                <span className='button full-width button-sliding-icon ripple-effect'>
                    <MySpinner style={{
                        display: 'inline-block',
                        marginBottom: '-10px',
                    }} />
                    {t("Sending")}
                </span>
            </div>
            : <button className="button full-width button-sliding-icon ripple-effect" type="submit" form="login-form">
                {t("LogIn")}
                <i className="icon-material-outline-arrow-right-alt"></i>
            </button>
        }
    </>;
};

export default LoginForm;
