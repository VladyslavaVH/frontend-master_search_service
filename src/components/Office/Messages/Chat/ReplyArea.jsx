import React, { useState, useEffect } from "react";
import { useCreateNewMessageMutation } from '../../../../features/user/userApiSlice';
import { useTranslation } from 'react-i18next';
import NotificationDialog from './../../../HeaderContainer/Popup/NotificationDialog';

const ReplyArea = ({ socket, setMessages, messages, avatar, senderId, senderFullName, receiverId }) => {
    const [newMessage, setNewMessage] = useState('');
    const [notification, setNotification] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [timer, setTimer] = useState(undefined);
    const { t } = useTranslation();
    const [createNewMessage] = useCreateNewMessageMutation();

    const typingTimeout = () => {
        socket.emit('typing', { receiverId, typing: false });
    };

    useEffect(() => {
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

        if (!newMessage || newMessage.length === 0) {
            setNotification('EmptyMessage');
            setIsOpen(true);
            return;
        }

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
    <button onClick={handleSubmit} className="button ripple-effect">{t("Send")}</button>

    <NotificationDialog type="warning" open={isOpen} onClose={() => setIsOpen(false)}>
        {t(notification)}
    </NotificationDialog>
</div>;
}

export default ReplyArea;