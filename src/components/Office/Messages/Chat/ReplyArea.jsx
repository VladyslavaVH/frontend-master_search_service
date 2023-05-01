import React, { useState, useEffect } from "react";
import { useCreateNewMessageMutation } from '../../../../features/user/userApiSlice';
import { useTranslation } from 'react-i18next';

const ReplyArea = ({ socket, setMessages, messages, avatar, senderId, senderFullName, receiverId }) => {
    const [newMessage, setNewMessage] = useState('');
    const [isEmptyMessage, setIsEmptyMessage] = useState(true);
    const [timer, setTimer] = useState(undefined);
    const { t } = useTranslation();
    const [createNewMessage] = useCreateNewMessageMutation();

    const typingTimeout = () => {
        socket.emit('typing', { receiverId, typing: false });
    };

    useEffect(() => {
        if (!newMessage || newMessage.length === 0) {
            setIsEmptyMessage(true);
        } else {
            setIsEmptyMessage(false);            
        }

        if (newMessage.length > 0) {
            socket.emit('typing', { receiverId, typing: true })
            clearTimeout(timer);
            setTimer(setTimeout(typingTimeout, 3000));
        } else {
            clearTimeout(timer);
            typingTimeout();
        }
    }, [newMessage]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        //socket?.current
        socket.emit('sendMessage', {
            senderFK: senderId,
            senderFullName,
            receiverFK: receiverId,
            message: newMessage,
            avatar
        });

        try {
            const newResMessage = await createNewMessage({senderId, receiverId, message: newMessage}).unwrap();
            if (!newResMessage) console.error(newResMessage);

            setMessages([...messages, newResMessage]);
            setNewMessage('');            
        } catch (error) {
            console.log(error);
        }
    }

    return <div className="message-reply">
    <textarea cols="1" rows="1" placeholder={t("YourMessage")} data-autoresize 
    name="newMessage"
    value={newMessage}
    onChange={e => setNewMessage(e.target.value)}></textarea>

    <button disabled={isEmptyMessage}
    onClick={handleSubmit} 
    className={`button ${isEmptyMessage ? 'gray' : ''} ripple-effect${isEmptyMessage ? '-dark' : ''}`}>
        {t("Send")}
    </button>
</div>;
}

export default ReplyArea;