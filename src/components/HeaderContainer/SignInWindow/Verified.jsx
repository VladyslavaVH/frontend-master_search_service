import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser, selectIsMaster } from './../../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Verified = ({ onClose }) => {
    const { t } = useTranslation();
    const isMaster = useSelector(selectIsMaster);
    const user = useSelector(selectCurrentUser);
    const navigate = useNavigate();
    useEffect(() => {
        debugger;
        if (isMaster) {
            navigate('/master-office/statistics', { state: { name: `${t('Howdy')}, ${user.firstName}!`, page: t('Statistics'), span: `${t('Greetings')}` } });
        } else {
            navigate('/client-office/manage-jobs', { state: { name: `${t('ManageJobs')}`, page: `${t('ManageJobs')}` } });
        }

        //onClose();
        setTimeout(onClose, 5000);
    }, []);

    return <div className="order-confirmation-page" style={{ margin: 0, padding: 0 }}>
    <div className="breathing-icon" style={{ marginBottom: '55px' }} ><i className="icon-feather-check"></i></div>
    <h2 className="margin-top-30" style={{ fontSize: '35px' }}>Thank you for registration!</h2>
    <p>You have been successfully registered</p>
</div>;
};

export default Verified;
