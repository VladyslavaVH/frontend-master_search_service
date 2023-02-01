import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsMaster, selectCurrentUser } from "../../../features/auth/authSlice";
import useLogout from './../../../hooks/useLogout';
import { NavLink } from 'react-router-dom';
import Snackbar from "node-snackbar";
import $ from 'jquery';
import { useTranslation } from "react-i18next";

const UserWindow = (props) => {
    const { t } = useTranslation();
    const [isActive, setIsActive] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    const user = useSelector(selectCurrentUser);
    const logout = useLogout();
    const isMaster = useSelector(selectIsMaster);
    const {  userPlaceholder, firstName, lastName, avatar} = user;

    const [fullName, setFullName] = useState(`${firstName} ${lastName}`);

    //let imgPath = process.env.REACT_APP_IMG_PATH;
    const profilePhotosPath = process.env.REACT_APP_PROFILE_PHOTOS_PATH;

    useEffect(() => {
        setFullName(`${firstName} ${lastName}`);

        if ($('.status-switch label.user-invisible').hasClass('current-status')) {
            $('.status-indicator').addClass('right');
        }
    
        $('.status-switch label.user-invisible').on('click', function(){
            $('.status-indicator').addClass('right');
            $('.status-switch label').removeClass('current-status');
            $('.user-invisible').addClass('current-status');
        });
    
        $('.status-switch label.user-online').on('click', function(){
            $('.status-indicator').removeClass('right');
            $('.status-switch label').removeClass('current-status');
            $('.user-online').addClass('current-status');
        });

        $('#snackbar-user-status label').on('click', function() { 
            Snackbar.show({
                text: 'Your status has been changed!',
                pos: 'bottom-center',
                showAction: false,
                actionText: "Dismiss",
                duration: 3000,
                textColor: '#fff',
                backgroundColor: '#383838'
            }); 
        }); 
    }, []);

    return <div className={`header-notifications user-menu ${isActive ? 'active' : ''}`} onClick={() => setIsActive(!isActive)} style={{ cursor: 'pointer' }}>
        <div className="header-notifications-trigger">
            <a>
                <div className={`user-avatar status-${isOnline ? 'online' : 'offline'}`}>
                    <img src={`${profilePhotosPath}${avatar}`} alt="" />
                </div>
            </a>
        </div>

        {/* <!-- Dropdown --> */}
        <div className="header-notifications-dropdown">

            <div className="user-status">

                <div className="user-details">
                    <div 
                    className={`user-avatar status-${isOnline ? 'online' : 'offline'}`}>
                        <img src={`${profilePhotosPath}${avatar}`} alt="status" />
                    </div>
                    <div className="user-name">
                        {fullName} <span>{isMaster ? t('Master') : t('Client')}</span>
                    </div>
                </div>
            </div>

            <ul className="user-menu-small-nav">
                {isMaster && <li>
                    <NavLink state={{ name: `${t('Howdy')}, ${fullName}!`, page: t('Statistics'), span: t('Greetings') }}
                        to={`/master-office/statistics`}>
                        <i className="icon-material-outline-dashboard"></i> 
                        {t('Statistics')}
                    </NavLink>
                </li>}
                <li>
                    <NavLink state={{ name: t('Settings'), page: t('Settings') }}
                        to={`/${isMaster ? 'master' : 'client'}-office/settings`}>
                        <i className="icon-material-outline-dashboard"></i> 
                        {t('Settings')}
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/`} onClick={async () => await logout()}>
                        <i className="icon-material-outline-power-settings-new"></i> 
                        {t('Logout')}
                    </NavLink>
                </li>
            </ul>

        </div>
    </div>;
}

export default UserWindow;
