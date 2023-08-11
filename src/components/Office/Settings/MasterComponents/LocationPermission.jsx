import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NotificationDialog from '../../../HeaderContainer/Popup/NotificationDialog';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNewLocation } from '../../../../features/auth/authSlice';
import { useUpdateCurrentMasterLocationMutation } from '../../../../features/master/masterApiSlice';

const LocationPermission = ({ }) => {
    const { t } = useTranslation();
    const [isChecked, setIsChecked] = useState(false);
    const [isDenied, setIsDenied] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [updateCurrentMasterLocation] = useUpdateCurrentMasterLocationMutation();
    const [isNotificationOpen, setIsNotificationOpen] = useState(location?.state?.permission);
    const [notificationText, setNotificationText] = useState('ViewPermissionNotAllowed');

    const success = async ({ coords }) => {
        let newCoords = {
            lat: coords.latitude,
            lng: coords.longitude
        };

        try {
            let { success } = await updateCurrentMasterLocation(newCoords).unwrap();
            if (success) {
                dispatch(setNewLocation(newCoords));                
            }
        } catch (error) {
            console.error(error);
        }

    }

    // useEffect(() => {
    //     if (!/safari/i.test(navigator.userAgent)) {
    //         navigator.permissions.query({ name: "geolocation" }).then((result) => {
    //             let permission = false;
    //             if (result.state === "granted") {
    //                 permission = true;
    //                 navigator.geolocation.getCurrentPosition(
    //                     success,
    //                     () => console.error('Geolocation API not supported by this browser')
    //                 ); 
    //             } else if (result.state === "prompt") {
    //                 permission = false;
    //             } else if (result.state === "denied") {
    //                 permission = false;
    //                 setIsDenied(true);              
    //             }
    
    //             setIsChecked(permission);
    
    //             result.addEventListener("change", () => {
    //                 if (result.state === "granted") {
    //                     navigator.geolocation.getCurrentPosition(
    //                         success,
    //                         () => console.error('Geolocation API not supported by this browser')
    //                     ); 
    //                 }
    
    //                 setIsChecked(result.state === "granted" ? true : false);
    //                 setIsDenied(result.state === "denied" ? true : false);
    //             });
    //         });
    //     } else {
    //         onClick();
    //     }
    // }, []);

    const onClick = () => {
        if (!navigator.geolocation) {
            //console.log('Geolocation API not supported by this browser.');
            setIsChecked(false);
          } else {
            navigator.geolocation.getCurrentPosition(
                () => {
                    setIsChecked(true);
                    location?.state?.permission && navigate(-1);
                }, 
                () => setIsChecked(false)
            );
          }
    }

    return <div className="col-xl-12">
        <div className="dashboard-box" style={{ boxShadow: !isChecked ? '0 2px 8px rgba(255,0,0,0.2)' : '' }}>
            <div className="headline" style={{ borderBottomColor: !isChecked ? 'rgba(255,0,0,0.2)' : '' }}>
                <h3><i style={{ color: !isChecked ? 'red' : '' }} className={`icon-material-outline-my-location`}></i> {t("ViewGeolocation")}</h3>
            </div>

            <div className="content with-padding">
                <div className='row'>
                    <div className='col-xl-12'>

                        {!isDenied
                            ? <div>
                                <p style={{ cursor: 'pointer' }} title='explanation'>
                                    <i className="icon-feather-info"></i> 
                                    &nbsp;{t('ViewGeolocationTooltip')}
                                </p>
                                <div className='switches-list'>
                                    <div className="switch-container">
                                        <label className="switch">
                                            <input onClick={onClick} type="checkbox" checked={isChecked} />
                                            <span className="switch-button">
                                            </span> {t('AllowViewingOfMyGeolocation')}
                                        </label>
                                    </div>
                                </div>
                             </div>
                            : <p style={{ maxWidth: 'inherit', cursor: 'pointer' }} title='recommendation'>
                                <i className="icon-feather-info"></i> 
                                &nbsp;{t('DeniedPermission')}
                            </p>
                        }

                    </div>

                </div>
            </div>
        </div>
        <NotificationDialog type='notice' open={isNotificationOpen} onClose={() => setIsNotificationOpen(false)}>
            {t(notificationText)}
        </NotificationDialog>
    </div>
}

export default LocationPermission;
