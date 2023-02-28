import React, { useEffect, useState, useRef } from "react";
import ReplyArea from "./ReplyArea";
import TimeSign from './TimeSign';
import Message from './Message';
import { useLocation, useParams } from "react-router-dom";
import { useGetMessagesQuery } from '../../../../features/user/userApiSlice';
import { useSelector } from "react-redux";
import { selectCurrentUser } from './../../../../features/auth/authSlice';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';

const Chat = (props) => {
    const { t } = useTranslation();
    const user = useSelector(selectCurrentUser);
    const location = useLocation();
    const { firstName, lastName } = useParams();
    const { data, isLoading } = useGetMessagesQuery(location.state.userId);
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();
    const socket = useRef();

    useEffect(() => {
        socket.current = io(`ws://localhost:5000`);
        socket.current.on('getMessage', data => {
            console.log('client data from getMessage', data);
            setArrivalMessage({
                senderFK: data.senderFK,
                receiverFK: data.receiverFK,
                message: data.message,
                avatar: data.avatar,
                createdAt: Date.now()
            });
        });
    }, []);

    useEffect(() => {
        if (arrivalMessage) {
            setMessages(prev => [...prev, arrivalMessage]);            
        }
    }, [arrivalMessage]);

    useEffect(() => {
        if (user) {
            socket.current?.emit('sendUser', user.id);
        }

        socket.current?.emit('getUsers', users => {
            console.log('from server get users');
            console.log(users);
        });
    }, [user]);

    useEffect(() => {
        setMessages([]);               
        if (!isLoading && user) {
            setMessages(data);        
        }
    }, [isLoading, data]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);


    return <div style={{ maxHeight: '730px' }} className="message-content">
        <div className="messages-headline">
            <h4>{`${firstName} ${lastName}`}</h4>
            <a href="#" className="message-action"><i className="icon-feather-trash-2"></i> {t('DeleteConversation')}</a>
        </div>

        <div ref={scrollRef} className="message-content-inner">

            {(!isLoading && user) &&
                messages?.map((m, i) => 
                    <Message key={i} {...m}
                    isMe={(user?.id == m?.senderFK)} />)
            }
        </div>

        <ReplyArea 
        avatar={user?.avatar}
        socket={socket}
        setMessages={setMessages} 
        messages={messages} 
        senderId={user?.id} 
        receiverId={location.state.userId} />
    </div>;
}

export default Chat;