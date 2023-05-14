import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as MySpinner } from '../../../../.././animations/mySpinner.svg';
import NotificationDialog from './../../../Popup/NotificationDialog';

const INPUT_STYLES = {
    maxWidth: '40px',
    maxHeight: '40px',
    padding: '14px'
};

const ResetForm = ({ loading, setLoading, setUser, phone, resendOTP }) => {
    const { t } = useTranslation();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationText, setNotificationText] = useState(false);

    const inputN0El = useRef(null);
    useEffect(() => inputN0El?.current?.focus(), [inputN0El.current]);
    
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
        .then((result) => {
            setUser(result.user);
            
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
            setNotificationText('InvalidCode');
            setIsNotificationOpen(true);
        });
    }

    return <>
        <div className="welcome-text">
            <h3>{t('PleaseCheckYourPhone')}</h3>
            <span>{t('WeReSendACodeTo')} <b>{phone}</b></span>
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
            : <button type="submit" form="phone-verification-form2" className="margin-top-10 button full-width button-sliding-icon ripple-effect">
                {t("Confirm")}
                <i className="icon-material-outline-arrow-right-alt"></i>
            </button>
        }

        <NotificationDialog open={isNotificationOpen} onClose={() => setIsNotificationOpen(false)}>
            {t(notificationText)}
        </NotificationDialog>

    </>;
}

export default ResetForm;
