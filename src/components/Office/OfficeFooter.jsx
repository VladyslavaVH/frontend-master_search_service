import React, { useEffect, useState } from "react";
import $ from 'jquery';
import { useTranslation } from 'react-i18next';

let OfficeFooter = (props) => {
    const { t } = useTranslation();
    const [year, setYear] = useState(2023);
    const SITE_NAME = process.env.REACT_APP_SITE_NAME;

    useEffect(() => {
        // Small Footer Adjustment
        $(window).on('load resize', function () {
            var smallFooterHeight = $('.small-footer').outerHeight();
            $('.dashboard-footer-spacer').css({
                'padding-top': smallFooterHeight + 45
            });
        });

        setYear(new Date(Date.now()).getFullYear());
    }, []);

    return <>
    <div className="dashboard-footer-spacer"></div>
        <div className="small-footer margin-top-15">
            <div className="small-footer-copyrights">
                © {year} <strong>{SITE_NAME}</strong>. {t('AllRightsReserved')}
            </div>
            <ul className="footer-social-links">
                <li>
                    <a href="#" title="Facebook" data-tippy-placement="top">
                        <i className="icon-brand-facebook-f"></i>
                    </a>
                </li>
                <li>
                    <a href="#" title="Twitter" data-tippy-placement="top">
                        <i className="icon-brand-twitter"></i>
                    </a>
                </li>
                <li>
                    <a href="#" title="Google Plus" data-tippy-placement="top">
                        <i className="icon-brand-google-plus-g"></i>
                    </a>
                </li>
                <li>
                    <a href="#" title="LinkedIn" data-tippy-placement="top">
                        <i className="icon-brand-linkedin-in"></i>
                    </a>
                </li>
            </ul>
            <div className="clearfix"></div>
        </div>
    </>;
};

export default OfficeFooter;