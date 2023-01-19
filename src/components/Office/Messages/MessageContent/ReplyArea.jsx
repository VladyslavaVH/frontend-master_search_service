import React from "react";

const ReplyArea = (props) => {
    return <div className="message-reply">
    <textarea cols="1" rows="1" placeholder="Your Message" data-autoresize onChange={() => {}}></textarea>
    <button className="button ripple-effect">Send</button>
</div>;
}

export default ReplyArea;