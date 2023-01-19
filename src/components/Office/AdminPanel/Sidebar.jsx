import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { connect } from "react-redux";
import { setLogout } from "../../../redux/authReducer";

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

let Sidebar = (props) => {
    const { messages, unreadMessages, setLogout } = props;

    const location = useLocation();    

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
                <span className="trigger-title">Admin Panel Navigation</span>
            </a>
            
            {/* <!-- Navigation --> */}
            <div className="dashboard-nav">
                <div className="dashboard-nav-inner">

                    <ul data-submenu-title="Start">
                        <li className={location.pathname.includes('statistics') ? 'active' : ''}>
                            <NavLink state={{ name: 'Admin panel', page: 'Statistics'}}
                            className={({ isActive }) => { return isActive ? 'active' : '' }}
                            to='/admin-panel/statistics'>
                                <i className="icon-material-outline-dashboard"></i>
                                Statistics
                            </NavLink>
                        </li>
                        <li className={location.pathname.includes('doc-') ? 'active' : ''}>
                            <NavLink state={{ name: 'Admin panel', page: 'Verification of documents'}}
                            className={({ isActive }) => { return isActive ? 'active' : '' }}
                            to='/admin-panel/doc-verification'>
                                <i className="icon-feather-user-check"></i> 
                                Verify the documents
                            </NavLink>
                        </li>
                        <li className={location.pathname.includes('faqs') ? 'active' : ''}>
                            <NavLink state={{ name: 'Admin panel', page: 'FAQs Editing'}}
                            className={({ isActive }) => { return isActive ? 'active' : '' }}
                            to='/admin-panel/faqs-editing'>
                                <i className="icon-line-awesome-edit"></i> 
                                Edit FAQs
                            </NavLink>
                        </li>                       
                        <li className={location.pathname.includes('add-category') ? 'active' : ''}>
                            <NavLink state={{ name: 'Admin panel', page: 'Adding job categories'}}
                            className={({ isActive }) => { return isActive ? 'active' : '' }}
                            to='/admin-panel/add-category'>
                                <i className="icon-line-awesome-plus-square-o"></i> 
                                Add Job Category
                            </NavLink>
                        </li>                       
                    </ul>

                    <ul data-submenu-title="Account">
                        <li className={location.pathname.includes('settings') ? 'active' : ''}>
                            <NavLink state={{name: 'Settings', page: 'Settings'}}
                            className={({ isActive }) => { return isActive ? 'active' : '' }}
                            to='/admin-panel/settings'>
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