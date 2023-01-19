import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const MessageListItem = (props) => {
    const { id, isNotRead, isOnline, isMaster, imgPath, avatar, userPlaceholder, fullName, message, date } = props;
    
    return <li className="notifications-not-read">
        <NavLink state={{name: 'Messages', page: 'Messages'}}
        to={`/${isMaster ? 'master' : 'client'}-office/messages/user/${id}`}>
            <span className={`notification-avatar status-${isOnline ? 'online' : 'offline'}`}><img src={`${imgPath}${avatar ? avatar : userPlaceholder}`} alt="message" /></span>
            <div className="notification-text">
                <strong>{fullName}</strong>
                <p className="notification-msg-text">{message}</p>
                <span className="color">{date}</span>
            </div>
        </NavLink>
    </li>;
}

let mapStateToProps = (state) => {
    return {
        imgPath: state.path.imgPath,
        userPlaceholder: state.path.userPlaceholder
    }
};

export default connect(mapStateToProps, {})(MessageListItem);
