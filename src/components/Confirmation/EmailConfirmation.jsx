import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import { ReactComponent as MyBigSpinner } from '../../animations/myBigSpinner.svg';
import { useUpdateConfirmationMutation } from "../../features/user/userApiSlice";
import NotificationDialog from "../HeaderContainer/Popup/NotificationDialog";
import { useTranslation } from "react-i18next";

const EmailConfirmation = (props) => {
    const { t } = useTranslation();
    const { token, id, email } = useParams();
    const [updateConfirmation] = useUpdateConfirmationMutation();
    const [isProcessing, setIsProcessing] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');

    const confirmation = async () => {
        try {
            const res = await updateConfirmation({ token, id, email }).unwrap();
            if (!res.success) throw new Error(`Confirmation failed`);

            setIsProcessing(false);
        } catch (error) {
            setText(error.message);
            setIsOpen(true);
            console.error(error);
        }
    }

    useEffect(() => {
        if(id && email && token) {
            confirmation();
        }
    }, []);

    return <>
        <div style={{ margin: 0, padding: 0, minHeight: '71vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className="order-confirmation-page">
                {isProcessing
                    ? <MyBigSpinner />
                    : <div className="breathing-icon" style={{ marginBottom: '55px' }} ><i className="icon-feather-check"></i></div>
                }
                {isProcessing
                    ? <h2 className="" style={{ fontSize: '35px' }}>{'Email is being confirmed'}</h2>
                    : <h2 className="" style={{ fontSize: '35px' }}>{'Email is confirmed'}</h2>
                }
            </div>
        </div>
        <Footer />
        <NotificationDialog open={isOpen} onClose={() => setIsOpen(false)} >
            {t(text)}
        </NotificationDialog>
    </>;
}

export default EmailConfirmation;