import React, { useState } from "react";
import { ReactComponent as MySpinner } from '../../../../.././animations/mySpinner.svg';
import { useTranslation } from 'react-i18next';
import ResetForm from "./ResetForm";
import ResetPassword from "./ResetPassword";

const ResetNumberVerification = ({ loading, setLoading, phone, onClose, resendOTP }) => {
    const [user, setUser] = useState(null);

    return <>
        {!user
            ? <ResetForm loading={loading} setLoading={setLoading} setUser={setUser} phone={phone} resendOTP={resendOTP} />
            : <ResetPassword phone={phone} onClose={onClose} loading={loading} setLoading={setLoading} />
        }
    </>;
};

export default ResetNumberVerification;
