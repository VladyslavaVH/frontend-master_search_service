import React from "react";
import { useTranslation } from "react-i18next";

const IntroHeadline = (props) => {
    const { t } = useTranslation();
    const siteName = process.env.REACT_APP_SITE_NAME;
    
    return <div className="row">
        <div className="col-md-12">
            <div className="banner-headline">
                <h3>
                    <strong>{t('mainDescription.part1')}</strong>
                    <br />
                    <span>{t('mainDescription.part2')}<strong className="color">{siteName}</strong>{t('mainDescription.part3')}</span>
                </h3>
            </div>
        </div>
    </div>;
};

export default IntroHeadline;
