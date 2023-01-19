import React from "react";

const MessagesHeadline = (props) => {
    return <div className="messages-headline">
    <div className="input-with-icon">
        <input id="autocomplete-input" type="text" placeholder="Search" onChange={() => {}} />
        <i className="icon-material-outline-search"></i>
    </div>
</div>;
}

export default MessagesHeadline;