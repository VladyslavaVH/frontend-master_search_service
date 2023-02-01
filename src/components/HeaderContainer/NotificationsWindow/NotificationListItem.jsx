import React from "react";
import { useTranslation } from "react-i18next";

const NotificationListItem = (props) => {
    const { t } = useTranslation();
    const { id, fullName, jobTitle, isSmall } = props;

    return <li className="notifications-not-read">
        <a>
            <span className="notification-icon"><i className="icon-material-outline-group"></i></span>
            <span className="notification-text">
                <strong>{fullName}</strong> {t('appliedForAJob')} <span className="color">{jobTitle}</span>
            </span>
            {!isSmall &&
            <div className="buttons-to-right">
                <a href="#" className="button ripple-effect ico" title="Mark as read" data-tippy-placement="left"><i className="icon-feather-check-square"></i></a>
            </div>}
        </a>
    </li>;
};

export default NotificationListItem;
