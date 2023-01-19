import React, { useEffect, useRef } from "react";
import { connect } from 'react-redux';
import { useCountUp } from "react-countup";
import { funFacts } from "../../../amimations/amimations";
import NotificationListItem from './../../HeaderContainer/NotificationsWindow/NotificationListItem';
import SimpleBar from "simplebar-react";

let Statistics = (props) => {
    const { completedJobs, totalAmountEarned,
        unreadNotifications } = props;
    const parameters = { separator: ',', duration: 2 };

    const completedJobsRef = useRef(null);
    const totalAmountEarnedRef = useRef(null);

    useCountUp({ ref: completedJobsRef, end: 22, ...parameters });
    useCountUp({ ref: totalAmountEarnedRef, end: 300, ...parameters });

    useEffect(() => {
        funFacts();

    }, []);

    return <>        
        {/* <!-- Facts Container --> */}
        <div className="fun-facts-container">
            <div className="fun-fact" data-fun-fact-color="#2a41e8">
                <div className="fun-fact-text">
                    <span>Completed Jobs</span>
                    <h4 ref={completedJobsRef}></h4>
                </div>
                <div className="fun-fact-icon"><i className="icon-material-outline-business-center"></i></div>
            </div>
            <div className="fun-fact" data-fun-fact-color="#36bd78">{/*#b81b7f*/}
                <div className="fun-fact-text">
                    <span>Total Amount Earned</span>
                    <h4 ref={totalAmountEarnedRef}></h4>
                </div>
                <div className="fun-fact-icon"><i className="icon-feather-dollar-sign"></i></div>{/*icon-line-awesome-money  icon-material-outline-local-atm*/}
            </div>
        </div>

        {/* <!-- Row --> */}
        <div className="row">

            {/* <!-- Dashboard Box --> */}
            <div className="col-xl-6">
                <div className="dashboard-box">
                    <div className="headline">
                        <h3><i className="icon-material-baseline-notifications-none"></i> Notifications</h3>
                        <button className="mark-as-read ripple-effect-dark" data-tippy-placement="left" title="Mark all as read">
                                <i className="icon-feather-check-square"></i>
                        </button>
                    </div>
                    <div className="content">
                        <SimpleBar data-simplebar-force-visible data-simplebar-auto-hide="false" autoHide={false} className="header-notifications-scroll">{/*data-simplebar */}
                            <ul className="dashboard-box-list">
                                {unreadNotifications.map(n => 
                                <NotificationListItem key={n.id} isSmall={false} {...n} />)}
                            </ul>
                        </SimpleBar>
                    </div>
                </div>
            </div>

            {/* <!-- Dashboard Box --> */}
            {false && <div className="col-xl-6">
                <div className="dashboard-box">
                    <div className="headline">
                        <h3><i className="icon-material-outline-assignment"></i> Orders</h3>
                    </div>
                    <div className="content">
                        <ul className="dashboard-box-list">
                            <li>
                                <div className="invoice-list-item">
                                <strong>Professional Plan</strong>
                                    <ul>
                                        <li><span className="unpaid">Unpaid</span></li>
                                        <li>Order: #326</li>
                                        <li>Date: 12/08/2019</li>
                                    </ul>
                                </div>
                                {/* <!-- Buttons --> */}
                                <div className="buttons-to-right">
                                    <a href="pages-checkout-page.html" className="button">Finish Payment</a>
                                </div>
                            </li>
                            <li>
                                <div className="invoice-list-item">
                                <strong>Professional Plan</strong>
                                    <ul>
                                        <li><span className="paid">Paid</span></li>
                                        <li>Order: #264</li>
                                        <li>Date: 10/07/2019</li>
                                    </ul>
                                </div>
                                {/* <!-- Buttons --> */}
                                <div className="buttons-to-right">
                                    <a href="pages-invoice-template.html" className="button gray">View Invoice</a>
                                </div>
                            </li>
                            <li>
                                <div className="invoice-list-item">
                                <strong>Professional Plan</strong>
                                    <ul>
                                        <li><span className="paid">Paid</span></li>
                                        <li>Order: #211</li>
                                        <li>Date: 12/06/2019</li>
                                    </ul>
                                </div>
                                {/* <!-- Buttons --> */}
                                <div className="buttons-to-right">
                                    <a href="pages-invoice-template.html" className="button gray">View Invoice</a>
                                </div>
                            </li>
                            <li>
                                <div className="invoice-list-item">
                                <strong>Professional Plan</strong>
                                    <ul>
                                        <li><span className="paid">Paid</span></li>
                                        <li>Order: #179</li>
                                        <li>Date: 06/05/2019</li>
                                    </ul>
                                </div>
                                {/* <!-- Buttons --> */}
                                <div className="buttons-to-right">
                                    <a href="pages-invoice-template.html" className="button gray">View Invoice</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>}

        </div>
        {/* <!-- Row / End --> */}    
</>;

};

let mapStateToProps = (state) => {
	return {
		unreadNotifications: state.auth.unreadNotifications,
		notifications: state.auth.notifications
	};
}

export default connect(mapStateToProps, {})(Statistics);