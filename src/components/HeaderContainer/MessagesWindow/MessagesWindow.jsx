import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUnreadMessages, selectIsMaster, selectCurrentSocket } from "../../../features/auth/authSlice";
import { NavLink } from 'react-router-dom';
import MessageListItem from "./MessageListItem";
import { useTranslation } from "react-i18next";
import { addNewMessage, clearUnreadMessages } from "../../../features/auth/authSlice";
import { useDispatch } from "react-redux";

const MessagesWindow = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(false);
    let unreadMessages = useSelector(selectUnreadMessages); 
    let isMaster = useSelector(selectIsMaster);
    const socket = useSelector(selectCurrentSocket);

    const addNewMessageToArray = async data => {
        console.log(`new message from ${data.senderFK}`, data);

        try {
            dispatch(addNewMessage({ 
                id: data.senderFK, 
                receiverId: data.receiverFK,
                fullName: data.senderFullName, 
                message: data.message, 
                avatar: data.avatar, 
                date: Date.now()
            }));
        } catch (error) {
            console.error(error);
        }

        // setArrivalMessage({
        //     senderFK: data.senderFK,
        //     receiverFK: data.receiverFK,
        //     message: data.message,
        //     avatar: data.avatar,
        //     createdAt: Date.now()
        // });
    };

    useEffect(() => {
        if (socket) {
            socket.on('getMessage', addNewMessageToArray);            
        } else {
            console.log('socket is not available');
        }
    }, [socket]);

    useEffect(() => {
        if (unreadMessages.length !== 0) {
            console.log(unreadMessages);
        }
    }, [unreadMessages]);

    const markAsAllRead = () => {
        dispatch(clearUnreadMessages());
    }

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
                <h4>{t('Messages')}</h4>

                {unreadMessages.length !== 0 
                && <button onClick={markAsAllRead} className="mark-as-read ripple-effect-dark" title={t('MarkAllAsRead')} data-tippy-placement="left">
                    <i className="icon-feather-check-square"></i>
                </button>}
            </div>

            {unreadMessages.length === 0
            ? <div style={{ textAlign: 'center', margin: '10px', width: '100%' }}>{t('YouHaveNoUnreadMessages')}</div>
            :<div className="header-notifications-content">
                <div className="header-notifications-scroll"> {/*data-simplebar*/}
                    <ul>
                        {unreadMessages?.map(m => <MessageListItem key={m.id} {...m} isMaster={isMaster} />)}
                    </ul>
                </div>
            </div>}

            <NavLink state={{name: t('Messages'), page: t('Messages')}}
            to={`/${isMaster ? 'master' : 'client'}-office/messages`} className="header-notifications-button ripple-effect button-sliding-icon">{t('ViewAllMessages')}<i className="icon-material-outline-arrow-right-alt"></i></NavLink>
        </div>
    </div>;
}

export default MessagesWindow;