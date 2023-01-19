import React, { useEffect } from "react";

const Verified = ({ onClose }) => {
    useEffect(() => {
        console.log("Verified");
        setTimeout(onClose, 2000);
    }, []);

    return <div className="order-confirmation-page" style={{ margin: 0, padding: 0 }}>
    <div className="breathing-icon" style={{ marginBottom: '55px' }} ><i className="icon-feather-check"></i></div>
    <h2 className="margin-top-30" style={{ fontSize: '35px' }}>Thank you for registration!</h2>
    <p>You have been successfully registered</p>
</div>;
};

export default Verified;
