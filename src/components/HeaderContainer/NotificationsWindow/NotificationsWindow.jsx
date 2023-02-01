import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUnreadNotifications } from "../../../features/auth/authSlice";
import NotificationListItem from "./NotificationListItem";
import { useTranslation } from "react-i18next";

const NotificationsWindow = (props) => {
    const { t } = useTranslation();
    const [isActive, setIsActive] = useState(false);
    const unreadNotifications = useSelector(selectUnreadNotifications);

    return <div className={`header-notifications ${isActive ? 'active' : ''}`}>

        <div className="header-notifications-trigger" style={{ cursor: 'pointer' }}>
            <a onClick={() => setIsActive(!isActive)}>
                <i className="icon-feather-bell"></i>
                {(unreadNotifications?.length > 0) && <span>{unreadNotifications?.length}</span>}
            </a>
        </div>

        <div className="header-notifications-dropdown">

            <div className="header-notifications-headline">
                <h4>{t('Notifications')}</h4>

                {unreadNotifications.length !== 0
                && <button className="mark-as-read ripple-effect-dark" title={t('MarkAllAsRead')} data-tippy-placement="left">
                    <i className="icon-feather-check-square"></i>
                </button>}
            </div>

            {unreadNotifications.length === 0
            ? <div style={{ textAlign: 'center', margin: '10px', width: '100%' }}>{t('YouHaveNoUnreadNotifications')}</div>
            :<div className="header-notifications-content">
                <div className="header-notifications-scroll">{/*data-simplebar */}
                    <ul>
                        {unreadNotifications?.map(n => 
                        <NotificationListItem key={n.id} isSmall={true} {...n} />)}
                    </ul>
                </div>
            </div>}

        </div>

    </div>;
};

export default NotificationsWindow;