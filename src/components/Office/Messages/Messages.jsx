import React from "react";
import Conversations from "./Conversations/Conversations";
import { Outlet } from 'react-router-dom';
import io from "socket.io-client";

let Messages = (props) => {
    //const socket = io(process.env.REACT_APP_BACKEND_URL);
    
    return <div className="messages-container margin-top-0">
        <div className="messages-container-inner" >
            <Conversations />
            <Outlet />
        </div>
    </div>;
};

export default Messages;