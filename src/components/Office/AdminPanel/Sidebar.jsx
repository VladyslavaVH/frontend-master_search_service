import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import useLogout from './../../../hooks/useLogout';
import { useTranslation } from 'react-i18next';

let Sidebar = (props) => {
    const { t } = useTranslation();
    const logout = useLogout();
    const { messages, unreadMessages, setLogout } = props;

    const location = useLocation();    

    return <div className="dashboard-sidebar">
    <div className="dashboard-sidebar-inner" >{/*data-simplebar*/}
        <div className="dashboard-nav-container">

            {/* <!-- Responsive Navigation Trigger --> */}
            <a href="#" className="dashboard-responsive-nav-trigger">
                <span className="hamburger hamburger--collapse" >
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </span>
                <span className="trigger-title">{t("AdminPanelNavigation")}</span>
            </a>
            
            {/* <!-- Navigation --> */}
            <div className="dashboard-nav">
                <div className="dashboard-nav-inner">

                    <ul data-submenu-title={t("Start")}>
                        <li className={location.pathname.includes('statistics') ? 'active' : ''}>
                            <NavLink state={{ name: t('AdminPanel'), page: t('Statistics')}}
                            className={({ isActive }) => { return isActive ? 'active' : '' }}
                            to='/admin-panel/statistics'>
                                <i className="icon-material-outline-dashboard"></i>
                                {t("Statistics")}
                            </NavLink>
                        </li>
                        <li className={location.pathname.includes('doc-') ? 'active' : ''}>
                            <NavLink state={{ name: t('AdminPanel'), page: t('VerificationOfDocuments')}}
                            className={({ isActive }) => { return isActive ? 'active' : '' }}
                            to='/admin-panel/doc-verification'>
                                <i className="icon-feather-user-check"></i> 
                                {t("VerifyTheDocuments")}
                            </NavLink>
                        </li>
                        <li className={location.pathname.includes('faqs') ? 'active' : ''}>
                            <NavLink state={{ name: t('AdminPanel'), page: `FAQs ${t('Editing')}`}}
                            className={({ isActive }) => { return isActive ? 'active' : '' }}
                            to='/admin-panel/faqs-editing'>
                                <i className="icon-line-awesome-edit"></i> 
                                {t("Edit")} FAQs
                            </NavLink>
                        </li>                       
                        <li className={location.pathname.includes('add-category') ? 'active' : ''}>
                            <NavLink state={{ name: t('AdminPanel'), page: t('AddingJobCategories')}}
                            className={({ isActive }) => { return isActive ? 'active' : '' }}
                            to='/admin-panel/add-category'>
                                <i className="icon-line-awesome-plus-square-o"></i> 
                                {t("AddJobCategory")}
                            </NavLink>
                        </li>                       
                    </ul>

                    <ul data-submenu-title="">
                        {/* <li className={location.pathname.includes('settings') ? 'active' : ''}>
                            <NavLink state={{name: 'Settings', page: 'Settings'}}
                            className={({ isActive }) => { return isActive ? 'active' : '' }}
                            to='/admin-panel/settings'>
                                <i className="icon-material-outline-settings"></i>
                                Settings
                            </NavLink>
                        </li> */}
                        <li>
                            <NavLink to='/' onClick={async () => await logout()}>
                                <i className="icon-material-outline-power-settings-new"></i> 
                                {t("Logout")}
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