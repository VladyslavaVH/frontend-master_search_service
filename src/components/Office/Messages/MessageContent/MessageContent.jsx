import React from "react";
import ReplyArea from "./ReplyArea";
import TimeSign from './TimeSign';
import Message from './Message';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const MessageContent = (props) => {
    const { user, avatar, mainAvatar, messages } = props.msgInfo;
    return <SimpleBar data-simplebar-force-visible data-simplebar-auto-hide="true" style={{ maxHeight: '730px' }} autoHide={true} className="message-content">
        <div className="messages-headline">
            <h4>{user}</h4>
            <a href="#" className="message-action"><i className="icon-feather-trash-2"></i> Delete Conversation</a>
        </div>

        <div className="message-content-inner">
            {messages.map((m) => {
                let i = 1;
                return <>
                    <TimeSign key={`${i++}`} date={m.date} />

                    {m.messages.map((t, index) => {
                        return <Message key={index} avatar={t.isMe ? mainAvatar : avatar} {...t} />;
                    })}
                </>;
            })}
        </div>
        <ReplyArea />
    </SimpleBar>;
}

export default MessageContent;