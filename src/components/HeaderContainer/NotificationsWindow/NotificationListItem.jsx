import React from "react";

const NotificationListItem = (props) => {
    const { id, fullName, jobTitle, isSmall } = props;

    return <li className="notifications-not-read">
        <a>
            <span className="notification-icon"><i className="icon-material-outline-group"></i></span>
            <span className="notification-text">
                <strong>{fullName}</strong> applied for a job <span className="color">{jobTitle}</span>
            </span>
            {!isSmall &&
            <div className="buttons-to-right">
                <a href="#" className="button ripple-effect ico" title="Mark as read" data-tippy-placement="left"><i className="icon-feather-check-square"></i></a>
            </div>}
        </a>
    </li>;
};

export default NotificationListItem;
