import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { selectCurrentSocket } from "../../../features/auth/authSlice";
import { useSelector } from 'react-redux';

const MessageListItem = (props) => {
    const { t } = useTranslation();
    const socket = useSelector(selectCurrentSocket);
    const { id, isNotRead, isMaster, avatar, fullName, message, date } = props;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        if (fullName) {
            const index = fullName.lastIndexOf(' ');
            setFirstName(fullName.substring(0, index));
            setLastName(fullName.substring(index + 1));
        }
    }, [fullName]);

    useEffect(() => {
        if (socket) {
            socket.emit('checkUserStatus', id);

            socket.on('isOnline', userId => {
                if (userId == id) {
                    setIsOnline(true);                
                }
            });

            socket.on('getUsers', (users) => {
                let tmp = users.find(u => u.id == id);
                if (!tmp) {
                    setIsOnline(false);
                } else {
                    setIsOnline(true);
                }
            });
        }
    }, [socket]);
    
    const profilePhotosPath = process.env.REACT_APP_PROFILE_PHOTOS_PATH;
    return <li className="notifications-not-read">
        <NavLink state={{name: t('Messages'), page: t('Messages')}}
        to={`/${isMaster ? 'master' : 'client'}-office/messages?firstName=${firstName}&lastName=${lastName}&targetUser=${id}`}>
            <span className={`notification-avatar status-${isOnline ? 'online' : 'offline'}`}><img src={`${profilePhotosPath}${avatar}`} alt="message" /></span>
            <div className="notification-text">
                <strong>{fullName}</strong>
                <p className="notification-msg-text">{message}</p>
                <span className="color">{new Date(date).toUTCString()}</span>
            </div>
        </NavLink>
    </li>;
}

export default MessageListItem;
