import React from "react";
import TypingIndicator from './TypingIndicator';

const Message = (props) => {
    const { isMe, avatar, message, isTyping } = props;
    const profilePhotosPath = process.env.REACT_APP_PROFILE_PHOTOS_PATH;

    return <div className={`message-bubble${isMe ? ' me' : ''}`}>
    <div className="message-bubble-inner">
        <div className="message-avatar"><img src={`${profilePhotosPath}${avatar}`} alt="" /></div>
        <div className="message-text">
            {isTyping ? <TypingIndicator /> : <p>{message}</p>}
        </div>
    </div>
    <div className="clearfix"></div>
</div>;
}

export default Message;