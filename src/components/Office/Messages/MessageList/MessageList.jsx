import React from "react";
import MessageListItem from "./MessageListItem";
import MessagesHeadline from './MessagesHeadline';
import { connect } from "react-redux";

const MessageList = (props) => {
    // const { msgList } = props;
    const { isMaster, messages } = props;
    
    return <div className="messages-inbox">
        <MessagesHeadline />

        <ul>
            {messages?.map(m => <MessageListItem key={m.id} {...m} isMaster={isMaster} />)}

        </ul>
    </div>;
}

let mapStateToProps = (state) => {
    return {
        isMaster: state.auth.isMaster,
        messages: state.auth.messages
    };
}

export default connect(mapStateToProps, {})(MessageList);