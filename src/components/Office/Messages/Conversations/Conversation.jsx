import React from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectIsMaster } from '../../../../features/auth/authSlice';

const Conversation = (props) => {
    const { id, firstName, lastName, isActive, isOnline, avatar, date, message,
        setActiveConversation } = props; 
    
    
    const isMaster = useSelector(selectIsMaster);
    const profilePhotosPath = process.env.REACT_APP_PROFILE_PHOTOS_PATH;

    return <li className={isActive ? 'active-message' : ''} onClick={() => setActiveConversation(id)}>
        <NavLink state={{ userId: id, name: 'Messages', page: 'Messages'}} 
        to={`/${isMaster ? 'master' : 'client'}-office/messages/user/${firstName}/${lastName}`}>
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