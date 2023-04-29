import React, { useState, useEffect } from "react";
import { NavLink, useSearchParams, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { selectIsMaster, clearUnreadMessagesByUser } from '../../../../features/auth/authSlice';

const Conversation = (props) => {
    const [isOnline, setIsOnline] = useState(false);
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { socket, id, firstName, lastName, isActive, avatar, date, message,
        setActiveConversation } = props;  
    
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
    
    const isMaster = useSelector(selectIsMaster);
    const profilePhotosPath = process.env.REACT_APP_PROFILE_PHOTOS_PATH;

    const onConversationClick = () => {
        setActiveConversation(id);
        dispatch(clearUnreadMessagesByUser({ targetUser: searchParams.get('targetUser') }));

        navigate(`/${isMaster ? 'master' : 'client'}-office/messages?firstName=${firstName}&lastName=${lastName}&targetUser=${id}`,
        { state: {
            userId: id, receiverAvatar: avatar, name: 'Messages', page: 'Messages'
        }});   
             
        let parent = document.getElementsByClassName('messages-inbox')[0].parentElement.parentElement.parentElement.parentElement;
        parent.scrollTop = parent.scrollHeight;

    };

    return <li className={isActive ? 'active-message' : ''} onClick={onConversationClick} style={{ cursor: 'pointer' }}>
        <a>
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
        </a>
    </li>;
}

export default Conversation;