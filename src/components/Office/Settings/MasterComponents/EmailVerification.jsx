import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RecaptchaVerifier, signOut, sendEmailVerification, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../utils/firebase.config';

const EmailVerification = ({  }) => {
    const { t } = useTranslation();
    const [init, setInit] = useState(true);
    const [email, setEmail] = useState('test@gmail.com');
    const [password, setPassword] = useState('');
    const [isEmailVer, setIsEmailVer] = useState(false);
    const [user, setUser] = useState(null);

    const onSubmit = e => {
        e.preventDefault();


    };

    return <div className="col-xl-12">
        <div className="dashboard-box" style={{ boxShadow: '0 2px 8px rgba(255,0,0,0.2)' }}>
            <div className="headline">
                <h3><i style={{ color: 'red' }} className="icon-feather-user-check"></i> {t("Verification")}</h3>
            </div>

                <div className="content with-padding padding-bottom-0">
                    <div className='col-xl-12 margin-bottom-15'>
                        <form className='row' onSubmit={onSubmit} id="verificationForm">
                            <input type="text" className="col-xl-6 col-md-6 with-border" placeholder='test@gmail.com'
                            value={email} onChange={e => setEmail(e.target.value)} />

                            <div className='col-xl-6 col-md-6'>
                                <button className="button ripple-effect" type="submit" form='verificationForm'>
                                    {t("Verify")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
        </div>
    </div>
}

export default EmailVerification;
