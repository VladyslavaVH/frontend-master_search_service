import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NotificationDialog from '../../HeaderContainer/Popup/NotificationDialog';
import { useSendEmailConfirmationMutation } from '../../../features/user/userApiSlice';
import { ReactComponent as MySpinner } from '../../.././amimations/mySpinner.svg';

const EmailVerification = ({  }) => {
    const { t } = useTranslation();
    const [sendEmailConfirmation] = useSendEmailConfirmationMutation();
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');
    const [type, setType] = useState('notice');
    const [isClicked, setIsClicked] = useState(false);
    const [email, setEmail] = useState('');

    const onClick = async () => {
        try {
            setIsClicked(true);
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if (!email || email?.length === 0 || !regex.test(email)) {
                throw new Error('TheEmailIsNotValid');
            }

            const res = await sendEmailConfirmation({ email }).unwrap();
            if (!res.success) throw new Error(res.message);

            setIsClicked(false);
            setText('TheConfirmationLetterHasBeenSentSuccessfully');
            setType('notice');
            setIsOpen(true);
        } catch (error) {
            setText(error.message);
            setType('error');
            setIsOpen(true);
            setIsClicked(false); 
            console.error(error);
        }
    };

    return <div className="col-xl-12">
        <div className="dashboard-box" style={{ boxShadow: '0 2px 8px rgba(255,0,0,0.2)' }}>
            <div className="headline" style={{ borderBottomColor: 'rgba(255,0,0,0.2)' }}>
                <h3><i style={{ color: 'red' }} className="icon-feather-user-check"></i> {t("Verification")}</h3>
            </div>

            <div className="content with-padding">
                <div className='row'>
                    <div className='col-xl-8 margin-bottom-15'>
                        <input type="text" className="with-border" placeholder='test@gmail.com'
                        value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    
                    <div className='col-xl-4'>
                        
                        {isClicked
                            ? <div style={{ height: '48px', width: 'inherit' }}>
                                <span style={{ height: '48px', width: 'inherit', textAlign: 'center' }} className='button ripple-effect'>
                                    <MySpinner style={{
                                        display: 'inline-block',
                                        marginBottom: '-10px',
                                    }} />
                                    {t("Verify")}
                                </span>
                            </div>
                            :<button onClick={onClick} style={{ height: '48px', width: 'inherit' }} className="button ripple-effect" type="button">
                                {t("Verify")}
                            </button>
                        }
                    </div>
                    
                </div>
            </div>

            <NotificationDialog type={type} open={isOpen} onClose={() => setIsOpen(false)}>
                {t(text)}
            </NotificationDialog>
        </div>
    </div>
}

export default EmailVerification;
