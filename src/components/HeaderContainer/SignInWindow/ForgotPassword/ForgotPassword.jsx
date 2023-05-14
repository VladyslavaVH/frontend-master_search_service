import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../../../utils/firebase.config';
import Footer from '../../../Footer/Footer';
import { useParams } from 'react-router-dom';
import { ReactComponent as MySpinner } from '../../../.././animations/mySpinner.svg';
import { ReactComponent as MyBigSpinner } from '../../../.././animations/myBigSpinner.svg';

const INPUT_STYLES = {
    maxWidth: '40px',
    maxHeight: '40px',
    padding: '14px'
};

const ForgotPassword = ({  }) => {
    const { t } = useTranslation();
    const { number } = useParams();
    const inputN0El = useRef(null);
    const [isSending, setIsSending] = useState(true);
    const [isPassword, setIsPassword] = useState(true);
    const [isRepeatPassword, setIsRepeatPassword] = useState(true);
    const [password, setPassword] = useState(true);
    const [repeatPassword, setRepeatPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [errorText, setErrorText] = useState('IncorrectPhoneNumberOrPassword');

    const [isWarningOpen, setIsWarningOpen] = useState(false);
    const [warningText, setWarningText] = useState('');

    useEffect(() => {
        if (!isSending) {
            inputN0El?.current?.focus();
        } 
    }, [isSending]);
    useEffect(() => console.log(user), [user]);

    useEffect(() => {
        try {
            if (number && number.length > 0) {
                sendOTP(number);
            }
        } catch (error) {
            console.log(number);
            console.error(error);
        }
    }, [number]);

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
            setIsSending(false);
        })
        .catch((error) => {
            //alert(error);//? modal dialog about error
            console.log(error.message);
            setErrorText(t('InvalidPhoneNumberFormat'));
            setIsErrorOpen(true);
            setLoading(false);
        });
    }

    const onSubmit = e => {
        e.preventDefault();

        const target = e.target;

        const inputs = target.children;
        let code = '';
        for (const n of inputs) {
            code += n.value != undefined ? n.value : '' ;
        }        
        setLoading(true);

        window.confirmationResult
        .confirm(code)
        .then(async (res) => {
            setUser(res.user);
            
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
        });
    }

    const onSubmitResetPassword = e => {
        e.preventDefault();
    }

    return <>
        <div className="container single padding-top-70">
            <div className="row">
                <div className="col-xl-5 offset-xl-3">
                    <div className="login-register-page">                        
                        {isSending
                            ? <div style={{ padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className="order-confirmation-page">
                                <MyBigSpinner />
                                <h2 className="" style={{ fontSize: '35px' }}>
                                    {'A confirmation code is being sent'}
                                </h2>
                            </div>
    
                            : <>
                                {!user
                                    ?   
                                        <>
                
                                            <div className="welcome-text">
                                                <h3>{t('PleaseCheckYourPhone')}</h3>
                                                <span>{t('WeReSendACodeTo')} <b>{number}</b></span>
                                            </div>
                                
                                            <form onKeyUp={focusNext} style={{ display: 'flex', justifyContent: 'space-evenly' }}
                                                onSubmit={onSubmit}
                                                id="phone-verification-form2">
                                                <input type="text" maxLength={1}
                                                    className="input-text with-border" style={INPUT_STYLES}
                                                    name="0" placeholder="_" required autoComplete="off"
                                                    ref={inputN0El} />
                
                                                <input type="text" maxLength={1}
                                                    className="input-text with-border" style={INPUT_STYLES}
                                                    name="1" placeholder="_" required autoComplete="off" />
                
                                                <input type="text" maxLength={1}
                                                    className="input-text with-border" style={INPUT_STYLES}
                                                    name="2" placeholder="_" required autoComplete="off" />
                
                                                <input type="text" maxLength={1}
                                                    className="input-text with-border" style={INPUT_STYLES}
                                                    name="3" placeholder="_" required autoComplete="off" />
                
                                                <input type="text" maxLength={1}
                                                    className="input-text with-border" style={INPUT_STYLES}
                                                    name="4" placeholder="_" required autoComplete="off" />
                
                                                <input type="text" maxLength={1}
                                                    className="input-text with-border" style={INPUT_STYLES}
                                                    name="5" placeholder="_" required autoComplete="off" />
                                            </form>
                
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <span>{t("DidntHaveACode")} <a onClick={() => sendOTP(number)} className="register-tab" style={{ color: '#2a41e8', cursor: 'pointer' }}>{t('ClickToResend')}</a></span>
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
                                                : <button type="submit" form="phone-verification-form2" className="margin-top-10 button full-width button-sliding-icon ripple-effect">
                                                    {t("Confirm")}
                                                    <i className="icon-material-outline-arrow-right-alt"></i>
                                                </button>
                                            }
                                        </>
                        
                                    : <form>
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
                                            <i className={`icon-feather-eye${isRepeatPassword ? '' : '-off'}`} onClick={() => setIsPassword(!isRepeatPassword)}></i>
                                        </div>
                                    </form>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
        
        <div className="margin-top-40"
            id="recaptcha-container"></div>

        <div className="margin-top-70"></div>

        <Footer />
    </>;
}

export default ForgotPassword;
