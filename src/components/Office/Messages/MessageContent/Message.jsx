import React from "react";
import TypingIndicator from './TypingIndicator';

const Message = (props) => {
    const { isMe, avatar, message, isTyping } = props;
    const imgPath = '/images/';

    return <div className={`message-bubble${isMe ? ' me' : ''}`}>
    <div className="message-bubble-inner">
        <div className="message-avatar"><img src={`${imgPath}${avatar}`} alt="" /></div>
        <div className="message-text">
            {isTyping ? <TypingIndicator /> : <p>{message}</p>}
        </div>
    </div>
    <div className="clearfix"></div>
</div>;
}

export default Message;