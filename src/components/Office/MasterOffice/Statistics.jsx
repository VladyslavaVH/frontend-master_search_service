import React, { useEffect, useState, useRef } from "react";
import { useGetMasterStatisticsQuery } from '../../../features/master/masterApiSlice';
import { useGetNotificationsQuery } from '../../../features/user/userApiSlice';
import { useCountUp } from "react-countup";
import { funFacts } from "../../../amimations/amimations";
import NotificationListItem from './../../HeaderContainer/NotificationsWindow/NotificationListItem';
import { useTranslation } from 'react-i18next';

let Statistics = (props) => {
    const { t } = useTranslation();
    const { data: statistics, isLoading } = useGetMasterStatisticsQuery();
    // const [completedJobs, setCompletedJobs] = useState(0);
    // const [totalAmount, setTotalAmount] = useState(0);
    const { completedJobs, totalAmount } = statistics || { completedJobs: 0, totalAmount: 0 };
    const { data: notifications } = useGetNotificationsQuery();
    const { unreadNotifications } = notifications || [];
    const parameters = { separator: ',', duration: 2 };

    const completedJobsRef = useRef(null);
    const totalAmountEarnedRef = useRef(null);

    const { start: startCompletedJobs } = useCountUp({ ref: completedJobsRef, end: completedJobs, ...parameters });
    const { start: startTotalAmount} = useCountUp({ ref: totalAmountEarnedRef, end: totalAmount, ...parameters });

    useEffect(() => {
        if (!isLoading) {
            startCompletedJobs();
            startTotalAmount();
        }
    }, [isLoading]);


    useEffect(() => {
        funFacts();

    }, []);

    return <>        
        {/* <!-- Facts Container --> */}
        <div className="fun-facts-container">
            <div className="fun-fact" data-fun-fact-color="#2a41e8">
                <div className="fun-fact-text">
                    <span>{t('CompletedJobs')}</span>
                    <h4 ref={completedJobsRef}></h4>
                </div>
                <div className="fun-fact-icon"><i className="icon-material-outline-business-center"></i></div>
            </div>
            <div className="fun-fact" data-fun-fact-color="#36bd78">{/*#b81b7f*/}
                <div className="fun-fact-text">
                <span>{t("TotalAmountEarned")}</span>
                    <h4 ref={totalAmountEarnedRef}></h4>
                </div>
                <div className="fun-fact-icon"><i className="icon-feather-dollar-sign"></i></div>{/*icon-line-awesome-money  icon-material-outline-local-atm*/}
            </div>
        </div>

        {/* <!-- Row --> */}
        {unreadNotifications?.length > 0 &&
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
                        <div className="header-notifications-scroll">{/*data-simplebar */}
                            <ul className="dashboard-box-list">
                                {unreadNotifications.map(n => 
                                <NotificationListItem key={n.id} isSmall={false} {...n} />)}
                            </ul>
                        </div>
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

        </div>}
        {/* <!-- Row / End --> */}    
</>;
};

export default Statistics;