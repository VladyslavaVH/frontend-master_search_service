import React from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { NavLink } from 'react-router-dom';

const MobileHeader = ({ open, onClose }) => {
    const { t } = useTranslation();
    if (!open) {
        document.getElementById('wrapper').style.transform = 'translate3d(0px, 0, 0)';
        //return null;
    } else {
        document.getElementById('wrapper').style.transform = 'translate3d(440px, 0, 0)';
    }

    return createPortal (
        <nav style={{
            transform: open ? `translateX(0px)` : `translateX(-440px)`,
            transitionProperty: 'transform',
            transitionDuration: '0.3s',
            transitionTimingFunction: 'ease'
        }}
         className="mmenu-init mm-menu mm-offcanvas mm-opened" id="mm-0">
            <div className="mm-panels">
                <div className="mm-panel mm-hasnavbar mm-opened" id="mm-1">
                    <div style={{ transition: '0.3s' }} className="mm-navbar">
                        <a className="mm-title">{t('Menu')}</a>
                    </div>
                    <ul className="mm-listview">
                        <li>
                            <NavLink to='/' end
                                className={({ isActive }) => { return isActive ? 'current' : '' }}>
                                { t('Home') }
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/faqs' end
								className={({ isActive }) => { return isActive ? 'current' : '' }}>FAQs</NavLink>
                        </li>
                        <li>
                            <NavLink to='/contact/us' end
								className={({ isActive }) => { return isActive ? 'current' : '' }}>{ t('ContactUs') }</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>,
        document.getElementById('mobnav__portal')
    );
}

export default MobileHeader;