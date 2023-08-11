import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useUpdateCurrentMasterLocationMutation } from '../../features/master/masterApiSlice';
import { setNewLocation } from '../../features/auth/authSlice';
import NotificationDialog from '../HeaderContainer/Popup/NotificationDialog';
import { useTranslation } from 'react-i18next';

const PermissionRequest = ({ start, finish, action }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [updateCurrentMasterLocation] = useUpdateCurrentMasterLocationMutation();

	const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationText, setNotificationText] = useState('');
    const [notificationType, setNotificationType] = useState('error');

    const DEFAULT_LOCATION = {
        lat: parseFloat(process.env.REACT_APP_DEFAULT_LAT),
        lng: parseFloat(process.env.REACT_APP_DEFAULT_LNG),
    };

    const updateMasterGeo = async GEO => {
        dispatch(setNewLocation(GEO));
        await updateCurrentMasterLocation(GEO).unwrap();
    };
	
	const success = ({ coords }) => {
        const MASTER_GEO = { lat: coords.latitude, lng: coords.longitude };
		updateMasterGeo(MASTER_GEO);
        
        setNotificationText('GrantedAccessToView');
		setNotificationType('success');
        !isNotificationOpen && setIsNotificationOpen(true);
		
        if (action) {
            action(MASTER_GEO, false);
        }
        
        finish();
	}
	
	const unsuccess = err => {
		setNotificationType('error');
        
		let text = 'ViewPermissionNotAllowed';
		if (err?.code === 1) {
			text = 'DeniedPermission';
		}
		setNotificationText(text);
		!isNotificationOpen && setIsNotificationOpen(true);
		console.error(err);

        if (action) {
            action(DEFAULT_LOCATION, true);
        }

        finish();
	};

	const getCurPos = () => navigator.geolocation.getCurrentPosition(success, unsuccess);

    useEffect(() => {
        if (start) {
            
            setNotificationText('ViewPermissionNotAllowed');
            !isNotificationOpen && setIsNotificationOpen(true);
            if (navigator.geolocation) {
                getCurPos();
            } else {
                setNotificationText(`Browser doesn't support Geolocation`);
            }
        }
    }, [start]);

    return <>
        <NotificationDialog type={notificationType} open={isNotificationOpen} onClose={() => setIsNotificationOpen(false)}>
            {t(notificationText)}
        </NotificationDialog>
    </>;
};

export default PermissionRequest;
