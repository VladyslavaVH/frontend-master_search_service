import React from "react";
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";

const MessageListItem = (props) => {
    const { id, isNotRead, isActive, isOnline, avatar, fullName, date, message,
    imgPath, userPlaceholder, isMaster } = props;

    return <li className={isActive ? 'active-message' : ''}>
        <NavLink state={{name: 'Messages', page: 'Messages'}} 
        to={`/${isMaster ? 'master' : 'client'}-office/messages/user/${id}`}>
            <div className="message-avatar">
                <i className={`status-icon status-${isOnline ? 'online' : 'offline'}`}></i>
                <img src={`${imgPath}${avatar ? avatar : userPlaceholder}`} alt="" />
            </div>

            <div className="message-by">
                <div className="message-by-headline">
                    <h5>{fullName}</h5>
                    <span>{date}</span>
                </div>
                <p>{message}</p>
            </div>
        </NavLink>
    </li>;
}

let mapStateToProps = (state) => {
    return {
        imgPath: state.path.imgPath,
        userPlaceholder: state.path.userPlaceholder
    };
}

export default connect(mapStateToProps, {})(MessageListItem);