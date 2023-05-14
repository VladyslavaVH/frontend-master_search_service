import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Success = ({ onClose, mainText, secondText }) => {
    const { t } = useTranslation();

    useEffect(() => { setTimeout(onClose, 3500); }, []);

    return <div className="order-confirmation-page margin-top-40 margin-bottom-35" style={{ margin: 0, padding: 0 }}>
        <div className="breathing-icon" style={{ marginBottom: '55px' }} ><i className="icon-feather-check"></i></div>
        <h2 className="margin-top-30" style={{ fontSize: '35px' }}>{t(mainText)}</h2>
        {secondText && <p>{t(secondText)}</p>}
    </div>;
};

export default Success;
