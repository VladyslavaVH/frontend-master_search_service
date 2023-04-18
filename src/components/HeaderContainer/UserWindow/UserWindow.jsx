import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsMaster, selectCurrentUser, selectIsAdmin } from "../../../features/auth/authSlice";
import useLogout from './../../../hooks/useLogout';
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';
import Snackbar from "node-snackbar";
import $ from 'jquery';
import { useTranslation } from "react-i18next";

const UserWindow = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    const user = useSelector(selectCurrentUser);
    const logout = useLogout();
    const isMaster = useSelector(selectIsMaster);
    const isAdmin = useSelector(selectIsAdmin);
    const { userPlaceholder, firstName, lastName, avatar} = user;

    const [fullName, setFullName] = useState(`${firstName} ${lastName}`);

    const profilePhotosPath = process.env.REACT_APP_PROFILE_PHOTOS_PATH;

    useEffect(() => {
        if (!localStorage.getItem('isPersistent')) {
            if (isAdmin) {
                navigate('/admin-panel/statistics', { replace: true, state: { name: 'Howdy', page: 'Statistics' } });
            } else {
                if (isMaster) {
                    navigate(`/master-office`, { replace: true, state: { name: 'Howdy', span: 'Greetings' } });
                } else {
                    navigate(`/client-office`, { replace: true, state: { name: 'Howdy', span: 'Greetings' } });
                }
            } 
        } else {
            localStorage.removeItem('isPersistent');
        }
         
        
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
                    <img style={{ height: 'inherit' }} src={`${profilePhotosPath}${avatar}`} alt="" />
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
                        {isAdmin 
                        ? <>{fullName} <span>{t('Administrator')}</span></> 
                        : <>{fullName} <span>{isMaster ? t('Master') : t('Client')}</span></>}
                    </div>
                </div>
            </div>

            <ul className="user-menu-small-nav">
                {isMaster && <li>
                    <NavLink state={{ name: 'Statistics', page: 'Statistics' }}
                        to={`/master-office/statistics`}>
                        <i className="icon-material-outline-dashboard"></i> 
                        {t('Statistics')}
                    </NavLink>
                </li>}
                {!isAdmin 
                ? <li>
                    {isMaster
                    ?  <NavLink state={{ name: 'Howdy', span: 'Greetings' }}
                            to='/master-office' className={({ isActive }) => { return isActive ? 'current' : '' }}>
                            <i className="icon-feather-user"></i> 
                            { t('Office') }
                        </NavLink> 
                    
                    : <NavLink state={{ name: 'Howdy', span: 'Greetings' }} className={({ isActive }) => { return isActive ? 'current' : '' }}
                            to='/client-office'>
                            <i className="icon-feather-user"></i> 
                            { t('Office') }
                        </NavLink>
                    }
                </li>
                : <li>
                    <NavLink state={{ name: 'Howdy', page: 'Statistics' }}
                        to='/admin-panel/statistics' className={({ isActive }) => { return isActive ? 'current' : '' }}>
                        <i className="icon-feather-settings"></i> 
                        { t('AdminPanel') }
                    </NavLink> 
                </li>}
                {!isAdmin &&
                <li>
                    <NavLink state={{ name: 'Settings', page: 'Settings' }}
                        to={`/${isMaster ? 'master' : 'client'}-office/settings`}>
                        <i className="icon-feather-settings"></i> 
                        {t('Settings')}
                    </NavLink>
                </li>}
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
