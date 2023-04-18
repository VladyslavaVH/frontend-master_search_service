import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectIsMaster } from '../../../../features/auth/authSlice';

const Conversation = (props) => {
    const [isOnline, setIsOnline] = useState(false);
    const { socket, id, firstName, lastName, isActive, avatar, date, message,
        setActiveConversation } = props;  
    
    useEffect(() => {
        if (socket) {
            socket.on('isOnline', userId => {
                if (userId == id) {
                    setIsOnline(true);                
                }
            });
        }
    }, [socket]);
    
    const isMaster = useSelector(selectIsMaster);
    const profilePhotosPath = process.env.REACT_APP_PROFILE_PHOTOS_PATH;

    const onConversationClick = () => {
        setActiveConversation(id);
        let parent = document.getElementsByClassName('messages-inbox')[0].parentElement.parentElement.parentElement.parentElement;
        parent.scrollTop = parent.scrollHeight;
    };

    return <li className={isActive ? 'active-message' : ''} onClick={onConversationClick}>
        <NavLink state={{ userId: id, receiverAvatar: avatar, name: 'Messages', page: 'Messages'}} 
        to={`/${isMaster ? 'master' : 'client'}-office/messages?firstName=${firstName}&lastName=${lastName}&targetUser=${id}`}>
            <div className="message-avatar">
                <i className={`status-icon status-${isOnline ? 'online' : 'offline'}`}></i>
                <img src={`${profilePhotosPath}${avatar}`} alt="" />
            </div>

            <div className="message-by">
                <div className="message-by-headline">
                    <h5>{`${firstName} ${lastName}`}</h5>
                    <span>{date}</span>
                </div>
                <p>{message}</p>
            </div>
        </NavLink>
    </li>;
}

export default Conversation;