import React from "react";
import MessageContent from "./MessageContent/MessageContent";
import MessageList from "./MessageList/MessageList";
import { Outlet } from 'react-router-dom';

let Messages = (props) => {
    const msgList = [
        { id: 1, isActive: false, isOnline: true, avatar: 'user-avatar-small-03.jpg', fullName: 'David Peterson', date: '4 hours ago', lastMessage: `Thanks for reaching out. I'm quite busy right now on many` },
        { id: 2, isActive: true, isOnline: false, avatar: 'user-avatar-small-02.jpg', fullName: 'Cindy Forest', date: 'Yesterday', lastMessage: `Hi Tom! Hate to break it to you but I'm actually on vacation` },
        { id: 3, isActive: false, isOnline: false, avatar: null, fullName: 'Sebastiano Piccio', date: '2 days ago', lastMessage: `Hello, I want to talk about my project if you don't mind!` },
        { id: 4, isActive: false, isOnline: true, avatar: null, fullName: 'Marcin Kowalski', date: '2 days ago', lastMessage: `Yes, I received payment. Thanks for cooperation!` }
    ];

    const msgInfo = { id: 1, user: 'Cindy Forest', avatar: 'user-avatar-small-02.jpg', mainAvatar: 'user-avatar-small-01.jpg',
    messages: [
        { date: '28 June, 2019', messages: [
            { isTyping: false, isMe: true, message: `Thanks for choosing my offer. I will start working on your project tomorrow.` },
            { isTyping: false, isMe: false, message: `Great. If you need any further clarification let me know. 👍` },
            { isTyping: false, isMe: true, message: `Ok, I will. 😉` },
        ] },
        { date: 'Yesterday', messages: [
            { isTyping: false, isMe: true, message: `Hi Sindy, I just wanted to let you know that project is finished and I'm waiting for your approval.` },
            { isTyping: false, isMe: false, message: `Hi Tom! Hate to break it to you, but I'm actually on vacation 🌴 until Sunday so I can't check it now. 😎` },
            { isTyping: false, isMe: true, message: `Ok, no problem. But don't forget about last payment. 🙂` },
            { isTyping: true, isMe: false, message: ``}
        ] }
    ]
};
    return <div className="messages-container margin-top-0">
        <div className="messages-container-inner">
            <MessageList msgList={msgList} />
            <Outlet />
            {/* <MessageContent msgInfo={msgInfo} /> */}
        </div>
    </div>;
};

export default Messages;