import React, { useEffect, useState } from "react";
import SignInWindow from "../HeaderContainer/SignInWindow/SignInWindow";

let Footer = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const SITE_NAME = process.env.REACT_APP_SITE_NAME;
    const [YEAR, setYear] = useState(2023);

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
                                            <img src="images/logo2.png" alt=""/>
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
                                            <select defaultValue='English' className="selectpicker language-switcher" data-selected-text-format="count" data-size="5">
                                                <option>English</option>
                                                <option>Українська</option>
                                                <option>Czech</option>
                                            </select>
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
                                <h3>For Masters</h3>
                                <ul>
                                    <li><a href="#"><span>Browse Jobs</span></a></li>
                                    <li><a href="#"><span>Add Resume</span></a></li>
                                    <li><a href="#"><span>Job Alerts</span></a></li>
                                    <li><a href="#"><span>My Bookmarks</span></a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-xl-2 col-lg-2 col-md-3">
                            <div className="footer-links">
                                <h3>For Clients</h3>
                                <ul>
                                    <li><a href="#"><span>Browse Candidates</span></a></li>
                                    <li><a href="#"><span>Post a Job</span></a></li>
                                    <li><a href="#"><span>Post a Task</span></a></li>
                                    <li><a href="#"><span>Plans & Pricing</span></a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-xl-2 col-lg-2 col-md-3">
                            <div className="footer-links">
                                <h3>Helpful Links</h3>
                                <ul>
                                    <li><a href="#"><span>Contact</span></a></li>
                                    <li><a href="#"><span>Privacy Policy</span></a></li>
                                    <li><a href="#"><span>Terms of Use</span></a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-xl-2 col-lg-2 col-md-3">
                            <div className="footer-links">
                                <h3>Account</h3>
                                <ul>
                                    <li><a href="#"><span>Log In</span></a></li>
                                    <li><a href="#"><span>My Account</span></a></li>
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
                            © {YEAR} <strong>{SITE_NAME}</strong>. All Rights Reserved.
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <SignInWindow open={isOpen} onClose={() => setIsOpen(false)} />
    </footer>;
};

export default Footer;