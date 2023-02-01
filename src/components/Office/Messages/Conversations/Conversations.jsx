import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import MessagesHeadline from './MessagesHeadline';
import { useSelector } from "react-redux";
import { selectIsMaster, selectCurrentUser } from '../../../../features/auth/authSlice';
import { useGetConversationsQuery } from '../../../../features/client/clientApiSlice';
// import { useGetConversationsQuery as getMasterConversations } from '../../../../features/master/masterApiSlice';
import { useGetMasterConversationsQuery } from '../../../../features/master/masterApiSlice';

const Conversations = (props) => {
    // const { msgList } = props;
    const isMaster = useSelector(selectIsMaster);
    const user = useSelector(selectCurrentUser);
    const { data: masterConversations } = useGetMasterConversationsQuery(user?.id);
    const [conversations, setConversations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { data: clientConversations } = useGetConversationsQuery(user?.id);
    const [activeConversation, setActiveConversation] = useState(null);
    
    useEffect(() => {
        if (isMaster !== null || isMaster !== undefined) {
            if (user) {
                if (isMaster) {
                    setConversations(masterConversations);                    
                } else {
                    setConversations(clientConversations);                    
                }
                setIsLoading(false);
            } else setIsLoading(true);
        } else setIsLoading(true);
    }, [isMaster, user, masterConversations, clientConversations]);
    
    return <div className="messages-inbox">
        <MessagesHeadline />

        <ul>
            {!isLoading &&
                conversations?.map(c => 
                    <Conversation key={c.id} {...c} 
                    setActiveConversation={setActiveConversation}
                    isActive={(activeConversation === c.id)}
                    isMaster={isMaster} />)
            }
        </ul>
    </div>;
}

export default Conversations;