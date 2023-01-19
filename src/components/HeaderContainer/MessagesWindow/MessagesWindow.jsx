import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUnreadMessages, selectIsMaster } from "../../../features/auth/authSlice";
import { NavLink } from 'react-router-dom';
import SimpleBar from "simplebar-react";
import 'simplebar/dist/simplebar.min.css';
import MessageListItem from "./MessageListItem";

const MessagesWindow = (props) => {
    const [isActive, setIsActive] = useState(false);
    let unreadMessages = useSelector(selectUnreadMessages); 
    let isMaster = useSelector(selectIsMaster);

    return <div className={`header-notifications ${isActive ? 'active' : ''}`} >
        <div className="header-notifications-trigger" style={{ cursor: 'pointer' }}>
            <a onClick={() => setIsActive(!isActive)}>
                <i className="icon-feather-mail"></i>
                {(unreadMessages?.length > 0) && <span>{unreadMessages?.length}</span>}
            </a>
        </div>

        {/* <!-- Dropdown --> */}
        <div className="header-notifications-dropdown">

            <div className="header-notifications-headline">
                <h4>Messages</h4>

                {unreadMessages.length !== 0 
                && <button className="mark-as-read ripple-effect-dark" title="Mark all as read" data-tippy-placement="left">
                    <i className="icon-feather-check-square"></i>
                </button>}
            </div>

            {unreadMessages.length === 0
            ? <div style={{ textAlign: 'center', margin: '10px', width: '100%' }}>You have no unread messages</div>
            :<div className="header-notifications-content">
                <SimpleBar data-simplebar-force-visible data-simplebar-auto-hide="false" autoHide={false} className="header-notifications-scroll"> {/*data-simplebar*/}
                    <ul>
                        {unreadMessages?.map(m => <MessageListItem key={m.id} {...m} isMaster={isMaster} />)}
                    </ul>
                </SimpleBar>
            </div>}

            <NavLink state={{name: 'Messages', page: 'Messages'}}
            to={`/${isMaster ? 'master' : 'client'}-office/messages`} className="header-notifications-button ripple-effect button-sliding-icon">View All Messages<i className="icon-material-outline-arrow-right-alt"></i></NavLink>
        </div>
    </div>;
}

export default MessagesWindow;