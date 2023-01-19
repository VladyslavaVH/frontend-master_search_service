import React from "react";

const TimeSign = (props) => {
    const { date } = props;
    return <div className="message-time-sign">
        <span>{date}</span>
    </div>;
};

export default TimeSign;
