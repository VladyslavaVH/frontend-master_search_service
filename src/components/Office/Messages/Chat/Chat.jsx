import React, { useEffect, useState, useRef } from "react";
import ReplyArea from "./ReplyArea";
import TimeSign from './TimeSign';
import Message from './Message';
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useGetMessagesQuery } from '../../../../features/user/userApiSlice';
import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentSocket } from './../../../../features/auth/authSlice';
import { useTranslation } from 'react-i18next';

const Chat = ({}) => {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const { t } = useTranslation();
    const user = useSelector(selectCurrentUser);
    const socket = useSelector(selectCurrentSocket);
    const location = useLocation();
    const { firstName, lastName } = useParams();
    const [searchParams] = useSearchParams();
    const { data, isLoading } = useGetMessagesQuery(location?.state?.userId ? location.state.userId : searchParams.get('targetUser'));
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();
    //const socket = useRef();

    useEffect(() => {
        //socket.current = io(`ws://localhost:5000`);
        //socket.current = io(`http://localhost:5000`);
        if (socket) {
            socket.on('getMessage', data => {
                console.log('client data from getMessage', data);
                setArrivalMessage({
                    senderFK: data.senderFK,
                    receiverFK: data.receiverFK,
                    message: data.message,
                    avatar: data.avatar,
                    createdAt: Date.now()
                });
            });

            socket.on('displayTyping', typing => {
                setIsTyping(typing);
            })
            
        } else {
            console.log('socket is not available');
        }
        
    }, [socket]);

    useEffect(() => {
        if (arrivalMessage) {
            setMessages(prev => [...prev, arrivalMessage]);            
        }
    }, [arrivalMessage]);

    // useEffect(() => {
    //     if (socket.current) {
    //         if (user) {
    //             socket.current.emit('sendUser', user.id);
    //         }

    //         socket.current.on('getUsers', users => {
    //             console.log('from server get users');
    //             console.log(users);
    //         });
    //     }        
    // }, [user]);

    useEffect(() => {
        if (!isLoading && user) {
            setMessages([]);               
            setMessages(data);        
        }
    }, [isLoading, data]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);


    return <div style={{ maxHeight: '730px' }} className="message-content">
        {searchParams.get('lastName') != null &&<div className="messages-headline">
             <h4>{`${firstName ? firstName : searchParams.get('firstName')} ${lastName ? lastName : searchParams.get('lastName')}`}</h4>
            {false && <a href="#" className="message-action"><i className="icon-feather-trash-2"></i> {t('DeleteConversation')}</a>}
        </div>}

        <div ref={scrollRef} className="message-content-inner">

            {(!isLoading && user) &&
                messages?.map((m, i) => 
                    <Message key={i} {...m}
                    isMe={(user?.id == m?.senderFK)} />)
            }

            {isTyping ?
             <Message avatar={location.state.receiverAvatar} isTyping={true} />
            : null}
        </div>

        {searchParams.get('lastName') != null &&
        <ReplyArea 
        avatar={user?.avatar}
        socket={socket}
        setMessages={setMessages} 
        messages={messages} 
        senderId={user?.id} 
        receiverId={location?.state?.userId ? location.state.userId : searchParams.get('targetUser')} />}
    </div>;
}

export default Chat;