import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import MessagesHeadline from './MessagesHeadline';
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { selectIsMaster, selectCurrentUser, selectCurrentSocket } from '../../../../features/auth/authSlice';
import { useGetConversationsQuery } from '../../../../features/client/clientApiSlice';
// import { useGetConversationsQuery as getMasterConversations } from '../../../../features/master/masterApiSlice';
import { useGetMasterConversationsQuery } from '../../../../features/master/masterApiSlice';
import { useTranslation } from 'react-i18next';

const Conversations = (props) => {
    const { t } = useTranslation();
    const isMaster = useSelector(selectIsMaster);
    const user = useSelector(selectCurrentUser);
    const socket = useSelector(selectCurrentSocket);
    const { data: masterConversations } = useGetMasterConversationsQuery((isMaster && user) ? user.id : skipToken);
    const [conversations, setConversations] = useState([]);
    const [searchTextValue, setSearchTextValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { data: clientConversations } = useGetConversationsQuery((!isMaster && user) ? user.id : skipToken);
    const [activeConversation, setActiveConversation] = useState(null);
    
    useEffect(() => {
        setIsLoading(true);

        if (isMaster) {
            if (searchTextValue.length > 0) {
                let search = searchTextValue.toLowerCase();
                setConversations(masterConversations.filter(c => c.firstName.toLowerCase().includes(search) || c.lastName.toLowerCase().includes(search)));
            } else {
                setConversations(masterConversations);                    
            }
        } else {
            if (searchTextValue.length > 0) {
                let search = searchTextValue.toLowerCase();
                setConversations(clientConversations.filter(c => c.firstName.toLowerCase().includes(search) || c.lastName.toLowerCase().includes(search)));
            } else {
                setConversations(clientConversations);                    
            }                
        }
        
        setIsLoading(false);
    }, [isMaster, searchTextValue, masterConversations, clientConversations]);

    useEffect(() => {
        console.log(searchTextValue);
    }, [searchTextValue]);
    
    return <div className="messages-inbox">
        {/* <MessagesHeadline /> */}
        <div className="messages-headline">
            <div className="input-with-icon">
                <input id="autocomplete-input" type="text" placeholder={t("Search")} onChange={e => setSearchTextValue(e.target.value)} />
                <i className="icon-material-outline-search"></i>
            </div>
        </div>

        <ul>
            {!isLoading &&
                conversations?.map(c => {
                    socket.emit('checkUserStatus', c.id);
                    return <Conversation key={c.id} {...c}
                    socket={socket}
                    setActiveConversation={setActiveConversation}
                    isActive={(activeConversation === c.id)}
                    isMaster={isMaster} />
                })
            }
        </ul>
    </div>;
}

export default Conversations;