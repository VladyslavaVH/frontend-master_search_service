import React, { useEffect, useState } from "react";
import $ from 'jquery';
import Stats from "./Stats";
import SearchBar from './SearchBar';
import IntroHeadline from "./IntroHeadline";
import { inlineBG } from "../../../amimations/amimations";
import { useGetHomePageStatisticsQuery } from "../../../features/home/homeApiSlice";
import { selectIsAuth, selectIsMaster } from "../../../features/auth/authSlice";
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SignInWindow from './../../HeaderContainer/SignInWindow/SignInWindow';

const IntroBanner = ({isMapApiLoaded}) => {
    const { t } = useTranslation();
    const { data, isLoading } = useGetHomePageStatisticsQuery();
    const [ isOpen, setIsOpen ] = useState(false);
    const isAuth = useSelector(selectIsAuth);
    const isMaster = useSelector(selectIsMaster);

    const imgPath = process.env.REACT_APP_IMG_PATH;

    const fixIntroBanners = () => {
        $(".intro-search-field").each(function () {
            let bannerLabel = $(this).children("label").length;
            if (bannerLabel > 0) {
                $(this).addClass("with-label");
            }
        });
    };

    useEffect(() => {
        inlineBG();
        fixIntroBanners();
    }, []);

    return <div className="intro-banner" data-background-image={`${imgPath}home-background.jpg`}>
        <div className="container">

            <IntroHeadline />

            {
                isAuth
                ? <>
                    {
                        isMaster && <SearchBar isMapApiLoaded={isMapApiLoaded} />
                    }
                </>
                : <>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="margin-top-35">
                                <button onClick={() => setIsOpen(true)} style={{ marginRight: '35px', paddingRight: '20px' }} className="button ripple-effect">
                                    {t('PostAJob')}
                                </button>
                                <button onClick={() => setIsOpen(true)} className="button ripple-effect">
                                    {t('BecomeAMaster')}
                                </button>
                                <SignInWindow open={isOpen} onClose={() => setIsOpen(false)} />
                            </div>
                        </div>
                    </div>
                </>
            }

            {!isLoading && <Stats jobsCount={data?.jobsCount || 0} usersCount={data?.usersCount || 0} />}

        </div>
    </div>;
}

export default IntroBanner;
