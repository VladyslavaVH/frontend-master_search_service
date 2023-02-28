import React, { useEffect } from "react";

const Success = ({ onClose, mainText, secondText }) => {
    useEffect(() => {
        setTimeout(onClose, 3500);
    }, []);

    return <div className="order-confirmation-page margin-top-40 margin-bottom-35" style={{ margin: 0, padding: 0 }}>
    <div className="breathing-icon" style={{ marginBottom: '55px' }} ><i className="icon-feather-check"></i></div>
    <h2 className="margin-top-30" style={{ fontSize: '35px' }}>{mainText}</h2>
    {secondText && <p>{secondText}</p>}
</div>;
};

export default Success;
