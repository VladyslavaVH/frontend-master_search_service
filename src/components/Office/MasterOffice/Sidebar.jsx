import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from "../../../features/auth/authSlice";
import useLogout from './../../../hooks/useLogout';
import { useGetMessagesQuery } from '../../../features/user/userApiSlice';
import Modal from "../../HeaderContainer/Popup/Modal";
import QrCodeScanner from "../../Jobs/QrCode/QrCodeScanner";
import { useTranslation } from 'react-i18next';

let Sidebar = (props) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const { data: unreadMessages } = useGetMessagesQuery();
    const [isApply, setApply] = useState(null);
    const user = useSelector(selectCurrentUser);
    const logout = useLogout();

    const location = useLocation();    

    useEffect(() => {        
        setApply(location.state.isApply)
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
                <span className="trigger-title">{t("OfficeNavigation")}</span>
            </a>
            
            {/* <!-- Navigation --> */}
            <div className="dashboard-nav">
                <div className="dashboard-nav-inner">

                    <ul data-submenu-title="Start">
                        {isApply && <li className={!isOpen &&
                            isApply ? 'active' : ''}>
                            <a>
                                <i className="icon-material-outline-assignment"></i> 
                                {t("ApplyForAJob")}
                            </a>
                        </li>}
                        <li className={!isOpen && location.pathname.includes('jobs') ? 'active' : ''}>
                            <NavLink to='/jobs'>
                                <i className="icon-material-outline-assignment"></i> 
                                {t('ViewMyJobs')}
                            </NavLink>
                        </li>
                        <li className={!isOpen && location.pathname.includes('messages') ? 'active' : ''}>
                            <NavLink state={{name: t('Messages'), page: t('Messages')}}
                            className={({ isActive }) => { return isActive ? 'active' : '' }}
                            to='/master-office/messages'>
                                <i className="icon-material-outline-question-answer"></i> 
                                {t("Messages")} 
                                {(unreadMessages?.length > 0) && <span className="nav-tag">{unreadMessages?.length}</span>}
                            </NavLink>
                        </li>
                        {false && <li className={location.pathname.includes('pricing-plans') ? 'active' : ''}>
                            <NavLink state={{name: 'Pricing Plans', page: 'Pricing Plans'}}
                            className={({ isActive }) => { return isActive ? 'active' : '' }}
                            to='/master-office/pricing-plans'>
                                <i className="icon-material-outline-star-border"></i> 
                                Pricing Plans
                            </NavLink>
                        </li>}
                        <li className={!isOpen && location.pathname.includes('statistics') ? 'active' : ''}>
                            <NavLink state={{ name: `${t('Howdy')}, ${user?.firstName}!`, page: t('Statistics'), span: t('Greetings')}}
                            className={({ isActive }) => { return isActive ? 'active' : '' }}
                            to='/master-office/statistics'>
                                <i className="icon-material-outline-dashboard"></i>
                                {t('Statistics')}
                            </NavLink>
                        </li>
                        <li className={isOpen ? 'active' : ''} onClick={() => setIsOpen(true)}>
                            <a className={isOpen ? 'active' : ''}>
                                <i className="icon-line-awesome-qrcode"></i>
                                {t('JobQRScanner')}
                            </a>
                            <Modal tabs={['Scan Job QR code']} open={isOpen} onClose={() => setIsOpen(false)} >
                                <QrCodeScanner onClose={() => setIsOpen(false)} />
                            </Modal>
                        </li>                        
                    </ul>

                    <ul data-submenu-title="Account">
                        <li className={location.pathname.includes('settings') ? 'active' : ''}>
                            <NavLink state={{name: t('Settings'), page: t('Settings')}}
                            className={({ isActive }) => { return isActive ? 'active' : '' }}
                            to='/master-office/settings'>
                                <i className="icon-material-outline-settings"></i>
                                {t('Settings')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/' onClick={async () => await logout()}>
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