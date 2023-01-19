import React from "react";
import Footer from "./Footer/Footer";
import { NavLink } from 'react-router-dom';

const OrderConfirmation = (props) => {
    return <>
        <div className="order-confirmation-page">
            <div className="breathing-icon"><i className="icon-feather-check"></i></div>
            <h2 className="margin-top-30">Thank you for your order!</h2>
            <p>Your payment has been processed successfully.</p>
            <NavLink to={'/invoice'} className="button ripple-effect-dark button-sliding-icon margin-top-30">View Invoice <i className="icon-material-outline-arrow-right-alt"></i></NavLink>
        </div>

        <Footer />
    </>;
}

export default OrderConfirmation;
