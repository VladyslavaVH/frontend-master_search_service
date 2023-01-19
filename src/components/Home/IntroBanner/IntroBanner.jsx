import React, { useEffect } from "react";
import $ from 'jquery';
import Stats from "./Stats";
import SearchBar from './SearchBar';
import IntroHeadline from "./IntroHeadline";
import { inlineBG } from "../../../amimations/amimations";
import { useGetJobsMastersCountQuery } from "../../../features/home/homeApiSlice";

const IntroBanner = (props) => {
    const { data, isLoading } = useGetJobsMastersCountQuery();

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

            <SearchBar />

            {!isLoading && <Stats jobsCount={data?.jobsCount || 0} mastersCount={data?.mastersCount || 0} />}

        </div>
    </div>;
}

export default IntroBanner;
