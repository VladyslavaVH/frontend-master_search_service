import React from "react";
import Footer from "../Footer/Footer";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Map from "./Map";

let ContactUs = ({ isMapApiLoaded }) => {
    const { t } = useTranslation();

    const LAT = parseFloat(process.env.REACT_APP_LAT);
    const LNG = parseFloat(process.env.REACT_APP_LNG);
    const ADDRESS = process.env.REACT_APP_ADDRESS;
    const PHONE = process.env.REACT_APP_PHONE;
    const EMAIL = process.env.REACT_APP_EMAIL;

    return <>
        <div id="titlebar" className="gradient">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">

                        <h2>{t('ContactUs')}</h2>

                        <nav id="breadcrumbs" className="dark">
                            <ul style={{ cursor: 'pointer' }}>
                                <li><NavLink to={'/'}>{t("Home")}</NavLink></li>
                                <li><NavLink to={'/'}>{t("About")}</NavLink></li>
                                <li>{t("ContactUs")}</li>
                            </ul>
                        </nav>

                    </div>
                </div>
            </div>
        </div>

        <div className="container">
            <div className="row">

                <div className="col-xl-12">
                    <div className="contact-location-info margin-bottom-100">
                        <div className="contact-address">
                            <ul>
                                <li className="contact-address-headline">{t('OurOffice')}</li>
                                <li>{ADDRESS}</li>
                                <li>{t("Phone")} {PHONE}</li>
                                <li><a href="">{EMAIL}</a></li>
                                <li>
                                    <div className="freelancer-socials">
                                        <ul>
                                            <li><a href="#" title="Dribbble" data-tippy-placement="top"><i className="icon-brand-dribbble"></i></a></li>
                                            <li><a href="#" title="Twitter" data-tippy-placement="top"><i className="icon-brand-twitter"></i></a></li>
                                            <li><a href="#" title="Behance" data-tippy-placement="top"><i className="icon-brand-behance"></i></a></li>
                                            <li><a href="#" title="GitHub" data-tippy-placement="top"><i className="icon-brand-github"></i></a></li>

                                        </ul>
                                    </div>
                                </li>
                            </ul>

                        </div>
                        <div id="single-job-map-container">
                            <Map center={{ lat: LAT, lng: LNG }} mapZoom={15} isMapApiLoaded={isMapApiLoaded} />
                        </div>
                    </div>
                </div>

                {/* <div className="col-xl-8 col-lg-8 offset-xl-2 offset-lg-2">

                    <section id="contact" className="margin-bottom-60">
                        <h3 className="headline margin-top-15 margin-bottom-35">Any questions? Feel free to contact us!</h3>

                        <form method="post" name="contactform" id="contactform" autoComplete="on">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-with-icon-left">
                                        <input className="with-border" name="name" type="text" id="name" placeholder="Your Name" required="required" />
                                        <i className="icon-material-outline-account-circle"></i>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="input-with-icon-left">
                                        <input className="with-border" name="email" type="email" id="email" placeholder="Email Address" pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$" required="required" />
                                        <i className="icon-material-outline-email"></i>
                                    </div>
                                </div>
                            </div>

                            <div className="input-with-icon-left">
                                <input className="with-border" name="subject" type="text" id="subject" placeholder="Subject" required="required" />
                                <i className="icon-material-outline-assignment"></i>
                            </div>

                            <div>
                                <textarea className="with-border" name="comments" cols="40" rows="5" id="comments" placeholder="Message" spellCheck="true" required="required"></textarea>
                            </div>

                            <input type="submit" className="submit button margin-top-15" id="submit" value="Submit Message" />

                        </form>
                    </section>

                </div> */}

            </div>
        </div>

        <Footer />
    </>;
}

export default ContactUs;