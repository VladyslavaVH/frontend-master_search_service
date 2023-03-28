import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import useLogout from "../../../hooks/useLogout";
import { useGetMessagesQuery } from '../../../features/user/userApiSlice';
import { useTranslation } from "react-i18next";

let Sidebar = (props) => {
    const { t } = useTranslation();
    const [isMasterProfile, setMasterProfile] = useState(null);
    const { data: unreadMessages } = useGetMessagesQuery();
    const location = useLocation();
    const logout = useLogout();

    useEffect(() => {
        setMasterProfile(location.state.isMasterProfile);
    })

    return <div className="dashboard-sidebar">
    <div className="dashboard-sidebar-inner" >{/*data-simplebar*/}
        <div className="dashboard-nav-container">

            {/* <!-- Responsive Navigation Trigger --> */}
            <a href="" className="dashboard-responsive-nav-trigger">
                <span className="hamburger hamburger--collapse" >
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </span>
                <span className="trigger-title">{t('OfficeNavigation')}</span>
            </a>
            
            {/* <!-- Navigation --> */}
            <div className="dashboard-nav">
                <div className="dashboard-nav-inner">

                    <ul data-submenu-title={t('Start')}>
                        {isMasterProfile &&
                        <li className={isMasterProfile ? 'active' : ''}>
                            <a>
                                <i className="icon-material-outline-business-center"></i>
                                {t('ViewMasterProfile')}
                            </a>
                        </li>}
                        <li className={(location.pathname.includes('job-posting')) ? 'active' : ''}>
                            <NavLink state={{name: 'PostAJob', page: 'PostAJob'}} className={({isActive}) => { return isActive ? 'current' : ''}}
                            to='/client-office/job-posting'>
                                <i className="icon-material-outline-business-center"></i>
                                {t('PostAJob')}
                            </NavLink>
                        </li>
                        <li className={(location.pathname.includes('messages')) ? 'active' : ''}>
                        <NavLink state={{name: 'Messages', page: 'Messages'}}
                            to='/client-office/messages'>
                                <i className="icon-material-outline-question-answer"></i> 
                                {t('Messages')} 
                                {(unreadMessages?.length > 0) && <span className="nav-tag">{unreadMessages.length}</span>}
                        </NavLink>
                        </li>
                        <li className={(location.pathname.includes('master')
                        || location.pathname.includes('manage')) ? 'active' : ''}>
                            <NavLink  state={{name: 'ManageJobs', page: 'ManageJobs'}}
                            to='/client-office/manage-jobs'>
                                <i className="icon-material-outline-assignment"></i> 
                                {t('ManageJobs')}
                            </NavLink>
                        </li>
                    </ul>
                    
                    <ul data-submenu-title={t('Account')}>
                        <li className={(location.pathname.includes('settings')) ? 'active' : ''}>
                            <NavLink  state={{name: 'Settings', page: 'Settings'}}
                            to='/client-office/settings'>
                                <i className="icon-material-outline-settings"></i>
                                {t('Settings')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/'} onClick={async () => await logout()}>
                                <i className="icon-material-outline-power-settings-new"></i> 
                                {t('Logout')}
                            </NavLink>
                        </li>
                    </ul>
                    
                </div>
            </div>
            {/* <!-- Navigation / End --> */}

        </div>
    </div>
</div>;
};

export default Sidebar;