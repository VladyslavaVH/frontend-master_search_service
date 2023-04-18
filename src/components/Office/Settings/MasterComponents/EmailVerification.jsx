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
            <div className="headline" style={{ borderBottomColor: 'rgba(255,0,0,0.2)' }}>
                <h3><i style={{ color: 'red' }} className="icon-feather-user-check"></i> {t("Verification")}</h3>
            </div>

                <div className="content with-padding">
                    <form className='row' onSubmit={onSubmit} id="verificationForm">
                        <div className='col-xl-8'>
                            <input type="text" className="with-border" placeholder='test@gmail.com'
                            value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        
                        <div className='col-xl-4'>
                            <button style={{ height: '48px', width: 'inherit' }} className="button ripple-effect" type="submit" form='verificationForm'>
                                {t("Verify")}
                            </button>
                        </div>
                        
                    </form>
                </div>
        </div>
    </div>
}

export default EmailVerification;
