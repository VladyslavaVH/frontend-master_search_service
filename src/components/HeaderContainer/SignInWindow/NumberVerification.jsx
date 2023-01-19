import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Verified from "./Verified";

import { authentication } from "../../firebase_config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

authentication.languageCode = 'en-US';
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

const INPUT_STYLES = {
    maxWidth: '40px',
    maxHeight: '40px',
    padding: '14px'
};

const NumberVerification = ({ phone, onClose }) => {
    const [isVerified, setIsVerified] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('+380965323364');//? set phone from props
    const [otp, setOTP] = useState(0);
    const { register, handleSubmit } = useForm();

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container', {
            'size': 'normal',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
            },
            'expired-callback': () => {
                // Response expired. Ask user to solve reCAPTCHA again.
                // ...
            }
        }, 
        authentication);
    }

    useEffect(() => {
        console.log('created');

        generateRecaptcha();
        let appVerifier = window.recaptchaVerifier;
        console.log(phoneNumber)
        signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
        .then(confirmationResult => {
            window.confirmationResult = confirmationResult;
            console.log(confirmationResult)
        })
        .catch(error => {
            //Error: SMS not sended
            console.log(error);
        });
    }, []);

    //with request otp
    const onSubmit = (data) => {
        let code = '';
        for (const n in data) {
            code += data[n];
        }
        code = parseInt(code);
        console.log(code);
        setOTP(code);

        let confirmationResult = window.confirmationResult;
        confirmationResult
        .confirm(code)
        .then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log('verification successful', user);
            // ...
        }).catch((error) => {
            console.log(error);
            // User couldn't sign in (bad verification code?)
            // ...
        });
        
        //verifyCode(code);

        //setIsVerified(true);
    }

    return <>
        {isVerified
        ? <Verified onClose={onClose} />
        : <>
            <div className="welcome-text">
                <h3>Please check your phone</h3>
                <span>We're send a code to <b>{phone}</b></span>
            </div>
    
            <form style={{ display: 'flex', justifyContent: 'space-evenly' }} onSubmit={handleSubmit(onSubmit)} id="phone-verification-form">
                <input type="text" maxLength={1} {...register('0', { required: true })}
                    className="input-text with-border" style={INPUT_STYLES}
                    name="0" id="phone" placeholder="_" required />
    
                <input type="text" maxLength={1} {...register('1', { required: true })}
                    className="input-text with-border" style={INPUT_STYLES}
                    name="1" id="phone" placeholder="_" required />
    
                <input type="text" maxLength={1} {...register('2', { required: true })}
                    className="input-text with-border" style={INPUT_STYLES}
                    name="2" id="phone" placeholder="_" required />
    
                <input type="text" maxLength={1} {...register('3', { required: true })}
                    className="input-text with-border" style={INPUT_STYLES}
                    name="3" id="phone" placeholder="_" required />
    
                <input type="text" maxLength={1} {...register('4', { required: true })}
                    className="input-text with-border" style={INPUT_STYLES}
                    name="4" id="phone" placeholder="_" required />
    
                <input type="text" maxLength={1} {...register('5', { required: true })}
                    className="input-text with-border" style={INPUT_STYLES}
                    name="5" id="phone" placeholder="_" required />
            </form>
    
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <span>Didn't have a code? <a href="#" className="register-tab">Click to resend</a></span>
            </div>
    
            <button type="submit" form="phone-verification-form" className="margin-top-10 button full-width button-sliding-icon ripple-effect">Confirm <i className="icon-material-outline-arrow-right-alt"></i></button>
            
            <div id="recaptcha-container"></div>
        </>}
    </>;
};

export default NumberVerification;
