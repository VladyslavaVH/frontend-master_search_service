import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logOut } from "../../../features/auth/authSlice";
import useLogout from "../../../hooks/useLogout";
import { connect } from "react-redux";
import { setLogout } from "../../../redux/authReducer";

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

let Sidebar = (props) => {
    //const { unreadMessages } = props;
    const [isMasterProfile, setMasterProfile] = useState(null);
    const location = useLocation();
    let unreadMessages = [];
    const logout = useLogout();

    useEffect(() => {
        setMasterProfile(location.state.isMasterProfile);
    })

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
                <span className="trigger-title">Office Navigation</span>
            </a>
            
            {/* <!-- Navigation --> */}
            <div className="dashboard-nav">
                <div className="dashboard-nav-inner">

                    <ul data-submenu-title="Start">
                        {isMasterProfile &&
                        <li className={isMasterProfile ? 'active' : ''}>
                            <a>
                                <i className="icon-material-outline-business-center"></i>
                                View Master Profile
                            </a>
                        </li>}
                        <li className={(location.pathname.includes('job-posting')) ? 'active' : ''}>
                            <NavLink state={{name: 'Post a Job', page: 'Post a Job'}} className={({isActive}) => { return isActive ? 'current' : ''}}
                            to='/client-office/job-posting'>
                                <i className="icon-material-outline-business-center"></i>
                                Post a Job
                            </NavLink>
                        </li>
                        <li className={(location.pathname.includes('messages')) ? 'active' : ''}>
                        <NavLink state={{name: 'Messages', page: 'Messages'}}
                            to='/client-office/messages'>
                                <i className="icon-material-outline-question-answer"></i> 
                                Messages 
                                {(unreadMessages.length > 0) && <span className="nav-tag">{unreadMessages.length}</span>}
                        </NavLink>
                        </li>
                        <li className={(location.pathname.includes('master')
                        || location.pathname.includes('manage')) ? 'active' : ''}>
                            <NavLink  state={{name: 'Manage Jobs', page: 'Manage Jobs'}}
                            to='/client-office/manage-jobs'>
                                <i className="icon-material-outline-assignment"></i> 
                                Manage Jobs
                            </NavLink>
                        </li>
                    </ul>
                    
                    <ul data-submenu-title="Account">
                        <li className={(location.pathname.includes('settings')) ? 'active' : ''}>
                            <NavLink  state={{name: 'Settings', page: 'Settings'}}
                            to='/client-office/settings'>
                                <i className="icon-material-outline-settings"></i>
                                Settings
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/'} onClick={async () => await logout()}>
                                <i className="icon-material-outline-power-settings-new"></i> Logout
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