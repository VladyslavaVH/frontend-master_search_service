import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { connect } from "react-redux";
import { setLogout } from "../../../redux/authReducer";

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

let Sidebar = (props) => {
    const { messages, unreadMessages, setLogout } = props;
    const [isApply, setApply] = useState(null);

    const location = useLocation();    

    useEffect(() => {
        setApply(location.state.isApply)
    })

    return <div className="dashboard-sidebar">
    <SimpleBar data-simplebar-force-visible data-simplebar-auto-hide="false" style={{ maxHeight: '91vh' }} autoHide={false} className="dashboard-sidebar-inner" >{/*data-simplebar*/}
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
                        {isApply && <li className={isApply ? 'active' : ''}>
                            <a>
                                <i className="icon-material-outline-assignment"></i> 
                                Apply for a Job
                            </a>
                        </li>}
                        <li className={location.pathname.includes('jobs') ? 'active' : ''}>
                            <NavLink to='/jobs'>
                                <i className="icon-material-outline-assignment"></i> 
                                View my jobs
                            </NavLink>
                        </li>
                        <li className={location.pathname.includes('messages') ? 'active' : ''}>
                            <NavLink state={{name: 'Messages', page: 'Messages'}}
                            className={({ isActive }) => { return isActive ? 'active' : '' }}
                            to='/master-office/messages'>
                                <i className="icon-material-outline-question-answer"></i> 
                                Messages 
                                {(unreadMessages.length > 0) && <span className="nav-tag">{unreadMessages.length}</span>}
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
                            <NavLink state={{name: 'Howdy, Tom!', page: 'Statistics', span: 'We are glad to see you again!'}}
                            className={({ isActive }) => { return isActive ? 'active' : '' }}
                            to='/master-office/statistics'>
                                <i className="icon-material-outline-dashboard"></i>
                                Statistics
                            </NavLink>
                        </li>
                        
                    </ul>

                    <ul data-submenu-title="Account">
                        <li className={location.pathname.includes('settings') ? 'active' : ''}>
                            <NavLink state={{name: 'Settings', page: 'Settings'}}
                            className={({ isActive }) => { return isActive ? 'active' : '' }}
                            to='/master-office/settings'>
                                <i className="icon-material-outline-settings"></i>
                                Settings
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/' onClick={() => setLogout()}>
                                <i className="icon-material-outline-power-settings-new"></i> 
                                Logout
                            </NavLink>
                        </li>
                    </ul>
                    
                </div>
            </div>
            {/* <!-- Navigation / End --> */}

        </div>
    </SimpleBar>
</div>;
};

let mapStateToProps = (state) => {
    return {
        messages: state.auth.messages,
        unreadMessages: state.auth.unreadMessages,
    };
};

export default connect(mapStateToProps, {
    setLogout
})(Sidebar);