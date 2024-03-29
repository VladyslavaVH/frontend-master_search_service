import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectUnreadMessages } from "../../../features/auth/authSlice";
import useLogout from './../../../hooks/useLogout';
import { useTranslation } from 'react-i18next';
import PermissionRequest from "../../Jobs/PermissionRequest";

let Sidebar = ({}) => {
    const { t } = useTranslation();
    const [start, setStartPermissionRequest] = useState(false);
    let unreadMessages = useSelector(selectUnreadMessages); 
    const [isApply, setApply] = useState(null);
    const user = useSelector(selectCurrentUser);
    const logout = useLogout();

    const location = useLocation();    
    const navigate = useNavigate();

    const DEFAULT_LOCATION = {
        lat: parseFloat(process.env.REACT_APP_DEFAULT_LAT),
        lng: parseFloat(process.env.REACT_APP_DEFAULT_LNG),
    };

    useEffect(() => {        
        setApply(location.state?.isApply)
    });

    const viewJobsClick = () => setStartPermissionRequest(true);

    return <div className="dashboard-sidebar">
    <div className="dashboard-sidebar-inner" >
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

                    <ul data-submenu-title={t('Start')}>
                        {isApply && <li className={isApply ? 'active' : ''}>
                            <a>
                                <i className="icon-material-outline-assignment"></i> 
                                {t("ApplyForAJob")}
                            </a>
                        </li>}
                        <li className={location.pathname.includes('jobs') ? 'active' : ''}>
                            <a onClick={viewJobsClick}>
                                <i className="icon-material-outline-assignment"></i> 
                                {t('ViewJobs')}
                            </a>
                        </li>
                        <li className={location.pathname.includes('messages') ? 'active' : ''}>
                            <NavLink state={{name: 'Messages', page: 'Messages'}}
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
                        <li className={location.pathname.includes('statistics') ? 'active' : ''}>
                            <NavLink state={{ name: 'Statistics', page: 'Statistics' }}
                            className={({ isActive }) => { return isActive ? 'active' : '' }}
                            to='/master-office/statistics'>
                                <i className="icon-material-outline-dashboard"></i>
                                {t('Statistics')}
                            </NavLink>
                        </li>
                        {/* <li className={isOpen ? 'active' : ''} onClick={() => setIsOpen(true)}>
                            <a className={isOpen ? 'active' : ''}>
                                <i className="icon-line-awesome-qrcode"></i>
                                {t('JobQRScanner')}
                            </a>
                            <Modal tabs={['Scan Job QR code']} open={isOpen} onClose={() => setIsOpen(false)} >
                                <QrCodeScanner onClose={() => setIsOpen(false)} />
                            </Modal>
                        </li>
                        */}
                    </ul>

                    <ul data-submenu-title={t('Account')}>
                        <li className={location.pathname.includes('settings') ? 'active' : ''}>
                            <NavLink state={{name: 'Settings', page: 'Settings'}}
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

            <PermissionRequest 
            start={start} 
            finish={() => setStartPermissionRequest(false)} 
            action={(GEO, defaultCenter) => navigate('/jobs', { state: { defaultCenter, masterPos: GEO, masterCategories: user?.masterInfo?.categories }})} />
        </div>
    </div>
</div>;
};

export default Sidebar;