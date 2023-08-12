import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import OfficeFooter from "../OfficeFooter";
import Sidebar from './Sidebar';
import Titlebar from "../Titlebar";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { responsiveDashboardNavTrigger } from "../../../animations/animations";
import Modal from '../../HeaderContainer/Popup/Modal';
import { useTranslation } from "react-i18next";

let MasterOffice = (props) => {
    const { t } = useTranslation();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        responsiveDashboardNavTrigger();
        
        if (localStorage.getItem('isRegistration')) {
            setIsOpen(true);
        }
    }, []);

    const okClick = () => {
        setIsOpen(false);
        localStorage.removeItem('isRegistration');
    };
    
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content-container">
          {/*data-simplebar*/}
          <div className="dashboard-content-inner">
            <Titlebar
              name={location.state?.name}
              page={location.state?.page}
              span={location.state?.span}
            />
            <Outlet />
            <OfficeFooter />
          </div>
        </div>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} tabs={[]}>
        <div className="col margin-bottom-30 margin-top-30">
            <div className="">
                <div className="welcome-text" style={{ textAlign: 'justify', marginBottom: '15px' }}>
                    <h3><span>{t('ViewGeolocationTooltip')} </span></h3>
                </div>
                <div className='row' style={{ display: 'flex', justifyContent: 'end' }}>
                    <div className="col-xl-6 col-md-6">
                        <button onClick={okClick} className="button big full-width ripple-effect" type="button">
                            {t('OfCourse')} 
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </Modal>
      </div>
    );
};

export default MasterOffice;