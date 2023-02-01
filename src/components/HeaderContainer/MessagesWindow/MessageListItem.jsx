import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MessageListItem = (props) => {
    const { t } = useTranslation();
    const { id, isNotRead, isOnline, isMaster, avatar, fullName, message, date } = props;
    
    const profilePhotosPath = process.env.REACT_APP_PROFILE_PHOTOS_PATH;
    return <li className="notifications-not-read">
        <NavLink state={{name: t('Messages'), page: t('Messages')}}
        to={`/${isMaster ? 'master' : 'client'}-office/messages/user/${id}`}>
            <span className={`notification-avatar status-${isOnline ? 'online' : 'offline'}`}><img src={`${profilePhotosPath}${avatar}`} alt="message" /></span>
            <div className="notification-text">
                <strong>{fullName}</strong>
                <p className="notification-msg-text">{message}</p>
                <span className="color">{date}</span>
            </div>
        </NavLink>
    </li>;
}

export default MessageListItem;
