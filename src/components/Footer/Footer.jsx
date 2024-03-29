import React, { useEffect, useState } from "react";
import SignInWindow from "../HeaderContainer/SignInWindow/SignInWindow";
//import 'bootstrap/dist/css/bootstrap.min.css';
import Select, { components } from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { setLanguage, setDefaultLanguage } from "../../features/auth/authSlice";
import { useTranslation, Trans } from 'react-i18next';
import { selectCurrentUser, selectIsAuth, selectIsMaster, selectIsAdmin, selectDefaultLanguage } from "../../features/auth/authSlice";
// import AsyncSelect from 'react-select/async';
import { NavLink } from 'react-router-dom';
import { FooterDropdownIndicator, Option, FOOTER_LANG_SELECT_STYLES } from '../../animations/selectDetails';

let Footer = (props) => {
    const { t, i18n } = useTranslation();
    const user = useSelector(selectCurrentUser);
    const isAuth = useSelector(selectIsAuth);
    const isAdmin = useSelector(selectIsAdmin);
    const isMaster = useSelector(selectIsMaster);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const SITE_NAME = process.env.REACT_APP_SITE_NAME;
    const [YEAR, setYear] = useState(2023);
    const defaultLanguage = useSelector(selectDefaultLanguage);
    const [languages] = useState([
        { value: 'en', label: 'English' },
        { value: 'uk', label: 'Українська' },
        { value: 'cs', label: 'Czech' },
    ]);

    const changeLanguage = selectedLanguage => {
        dispatch(setLanguage(selectedLanguage.value));
        dispatch(setDefaultLanguage(selectedLanguage));
        i18n.changeLanguage(selectedLanguage.value);
    }

    useEffect(() => {
        setYear(new Date(Date.now()).getFullYear());
    }, []);

    return <footer>
        <div id="footer">
            <div className="footer-top-section">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">

                            <div className="footer-rows-container">
                                <div className="footer-rows-left">
                                    <div className="footer-row">
                                        <div className="footer-row-inner footer-logo">
                                            {/* <img src="/images/logo2.png" alt="" /> */}
                                            <h1>HELP 2 FIX</h1>
                                        </div>
                                    </div>
                                </div>

                                <div className="footer-rows-right">

                                    <div className="footer-row">
                                        <div className="footer-row-inner">
                                            <ul className="footer-social-links">
                                                <li>
                                                    <a href="#" title="Facebook" data-tippy-placement="bottom" data-tippy-theme="light">
                                                        <i className="icon-brand-facebook-f"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" title="Twitter" data-tippy-placement="bottom" data-tippy-theme="light">
                                                        <i className="icon-brand-twitter"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" title="Google Plus" data-tippy-placement="bottom" data-tippy-theme="light">
                                                        <i className="icon-brand-google-plus-g"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" title="LinkedIn" data-tippy-placement="bottom" data-tippy-theme="light">
                                                        <i className="icon-brand-linkedin-in"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
 
                                    <div className="footer-row">
                                        <div className="footer-row-inner">
                                            <Select
                                                defaultValue={defaultLanguage}
                                                value={defaultLanguage}
                                                options={languages}
                                                onChange={changeLanguage}
                                                components={{
                                                    DropdownIndicator: FooterDropdownIndicator,
                                                    Option
                                                }}
                                                styles={FOOTER_LANG_SELECT_STYLES} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-middle-section">
                <div className="container">
                    <div className="row">

                        <div className="col-xl-2 col-lg-2 col-md-3">
                            <div className="footer-links">
                                <h3>{t('ForMasters')}</h3>
                                <ul>
                                    {isAuth
                                        ? <>{(isMaster && !isAdmin) && 
                                            <li style={{ cursor: 'pointer' }}>
                                                <NavLink state={{ masterId: user?.id }}
                                                 to='/jobs'>
                                                   <span>{t('BrowseJobs')}</span>
                                                </NavLink>
                                            </li>}
                                        </>
                                        :<li style={{ cursor: 'pointer' }}>
                                            <a onClick={() => setIsOpen(true)}>
                                                <span>{t('BrowseJobs')}</span>
                                            </a>
                                        </li>
                                    }
                                </ul>
                            </div>
                        </div>

                        <div className="col-xl-2 col-lg-2 col-md-3">
                            <div className="footer-links">
                                <h3>{t('ForClients')}</h3>
                                <ul>
                                    {isAuth
                                        ? <>{(!isMaster && !isAdmin) && 
                                            <li style={{ cursor: 'pointer' }}>
                                                <NavLink  state={{name: 'ManageJobs', page: 'ManageJobs'}}
                                                to='/client-office/manage-jobs'>
                                                   <span>{t('ManageJobs')}</span>
                                                </NavLink>
                                            </li>}
                                        </>
                                        :<li style={{ cursor: 'pointer' }}>
                                            <a onClick={() => setIsOpen(true)}>
                                                <span>{t('ManageJobs')}</span>
                                            </a>
                                        </li>
                                    }
                                    {isAuth
                                        ? <>{(!isMaster && !isAdmin) &&
                                            <li style={{ cursor: 'pointer' }}>
                                                <NavLink state={{ name: 'PostAJob', page: 'PostAJob' }} className={({ isActive }) => { return isActive ? 'current' : '' }}
                                                    to='/client-office/job-posting'>
                                                    <span>{t('PostAJob')}</span>
                                                </NavLink>
                                            </li>}
                                        </>
                                        : <li style={{ cursor: 'pointer' }}>
                                            <a onClick={() => setIsOpen(true)}>
                                                <span>{t('PostAJob')}</span>
                                            </a>
                                        </li>
                                    }
                                    {/* <li><a href="#"><span>Plans & Pricing</span></a></li> */}
                                </ul>
                            </div>
                        </div>

                        <div className="col-xl-2 col-lg-2 col-md-3">
                            <div className="footer-links">
                                <h3>{t('HelpfulLinks')}</h3>
                                <ul>
                                    <li style={{ cursor: 'pointer' }}>
                                        <NavLink to='/contact/us'><span>{t('ContactUs')}</span></NavLink>
                                    </li>
                                    <li style={{ cursor: 'pointer' }}>
                                        <NavLink to='/faqs'><span>FAQs</span></NavLink>
                                    </li>
                                    <li style={{ cursor: 'pointer' }}><a href=""><span>{t('PrivacyPolicy')}</span></a></li>
                                    {/* <li><a href="#"><span>Terms of Use</span></a></li> */}
                                </ul>
                            </div>
                        </div>

                        <div className="col-xl-2 col-lg-2 col-md-3">
                            <div className="footer-links">
                                <h3>{t('Account')}</h3>
                                <ul style={{ cursor: 'pointer' }}>
                                    <li><a onClick={() => !isAuth && setIsOpen(true)}><span>{t('LogIn')}</span></a></li>
                                    {isAuth
                                        ?<li>
                                        {isMaster
                                            ? <NavLink state={{ name: 'Howdy', page: 'Statistics', span: 'Greetings' }}
                                                    to='/master-office/statistics' className={({ isActive }) => { return isActive ? 'current' : '' }}>
                                                    <span>{t('MyAccount')}</span>
                                               </NavLink>
                                            :  <NavLink state={{ name: 'ManageJobs', page: 'ManageJobs' }} className={({ isActive }) => { return isActive ? 'current' : '' }}
                                                    to='/client-office/manage-jobs'>
                                                    <span>{t('MyAccount')}</span>
                                               </NavLink>
                                        }
                                    </li>
                                    : <li style={{ cursor: 'pointer' }}><a onClick={() => setIsOpen(true)}><span>{t('MyAccount')}</span></a></li>}
                                </ul>
                            </div>
                        </div>

                        {/* <!-- Newsletter --> */}
                        {/* <div className="col-xl-4 col-lg-4 col-md-12">
                            <h3><i className="icon-feather-mail"></i> Sign Up For a Newsletter</h3>
                            <p>Weekly breaking news, analysis and cutting edge advices on job searching.</p>
                            <form action="#" method="get" className="newsletter">
                                <input type="text" name="fname" placeholder="Enter your email address"/>
                                    <button type="submit"><i className="icon-feather-arrow-right"></i></button>
                            </form>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="footer-bottom-section">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            © {YEAR} <strong>{SITE_NAME}</strong>. {t('AllRightsReserved')}
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <SignInWindow open={isOpen} onClose={() => setIsOpen(false)} />
    </footer>; 
};

export default Footer;