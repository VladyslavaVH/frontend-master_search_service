import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import OfficeFooter from "../OfficeFooter";
import Sidebar from './Sidebar';
import Titlebar from "../Titlebar";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { responsiveDashboardNavTrigger } from "../../../amimations/amimations";

let MasterOffice = (props) => {
    const location = useLocation();

    useEffect(() => {
        responsiveDashboardNavTrigger();
    }, []);
    
    return <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-content-container">{/*data-simplebar*/}
                <div className="dashboard-content-inner">
                    <Titlebar name={location.state?.name} page={location.state?.page} span={location.state?.span} />
                    <Outlet />
                    <OfficeFooter />
                </div>
            </div>
        </div>;
};

export default MasterOffice;