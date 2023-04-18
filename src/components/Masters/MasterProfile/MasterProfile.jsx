import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { inlineBG, starRating } from "../../../amimations/amimations";
import { useGetMasterByIdQuery } from "../../../features/masters/mastersApiSlice";
import Comments from "./Comments/Comments";
import Sidebar from "./Sidebar/Sidebar";
import { useTranslation } from 'react-i18next';
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useGetAdditionalMasterInfoQuery } from "../../../features/master/masterApiSlice";

const MasterProfile = ({ isMapApiLoaded }) => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const { data, isLoading } = useGetMasterByIdQuery(searchParams.get('id'));
    const { id, isVerified, avatar, firstName, lastName, tagLine, rating, jobsDoneCount, description, lng, lat } = data || {};
    const [cityName, setCityName] = useState(null);
    const [country, setCountry] = useState(null);
    const [flag, setFlag] = useState(null);
    const { data: additionalInfo } = useGetAdditionalMasterInfoQuery((id && !isLoading) ? ({jobId: searchParams.get('jobId'), masterId: searchParams.get('id')}) : skipToken);
    const { proposedPayment, currency, currencyFK, executionTime, status } = additionalInfo || {};

    useEffect(() => {
        inlineBG();
    }, []);

    useEffect(() => {
        if (!isLoading) {            
            if (document.getElementsByClassName('star').length == 0) {
                starRating();
            }
        }
    }, [isLoading]);

    useEffect(() => {
        if (window.google && isMapApiLoaded && (lat && lng)) {

            if (!window.myGeocoder) {
                window.myGeocoder = new window.google.maps.Geocoder();
            }

            window.myGeocoder
            .geocode({ location: { lat, lng } }, function(results, status) {
                if( status === window.google.maps.GeocoderStatus.OK ) {
                    let address = results[0].address_components;
                    //console.log(results);
                    //console.log(address);
                    for (let p = address.length-1; p >= 0; p--) {
                      if ((address[p].types.indexOf("locality") != -1)
                       && (address[p].types.indexOf("political") != -1)) {
                        setCityName(address[p].long_name);
                      }

                      if ((address[p].types.indexOf("country") != -1)
                       && (address[p].types.indexOf("political") != -1)) {
                        setCountry(address[p].long_name);
                        setFlag(address[p].short_name);
                      }
                    }
                  } else {
                    console.error("Sorry - We couldn't find this location. Please try an alternative");
                 }
            })
            .catch((e) => console.error("Geocoder failed due to: " + e));
        }
    }, [isMapApiLoaded]);
    
    const imgPath = process.env.REACT_APP_IMG_PATH;
    const profilePhotosPath = process.env.REACT_APP_PROFILE_PHOTOS_PATH;
    const flagPath = process.env.REACT_APP_FLAG_PATH;

    return <><div className="single-page-header freelancer-header" data-background-image={`${imgPath}single-freelancer.jpg`}>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="single-page-header-inner">
                        <div className="left-side">
                            <div className="header-image freelancer-avatar"><img src={`${profilePhotosPath}${avatar}`} alt="" /></div>
                            <div className="header-details">
                                <h3>{`${firstName} ${lastName}`} <span>{tagLine}</span></h3>
                                <ul>
                                    <li><div className="star-rating" data-rating={rating}></div></li>
                                    {(country && flag && cityName) && <li><img className="flag" src={`${flagPath}${flag}.svg`} title={country} alt='flag' /> {cityName}</li>}
                                    {!!+isVerified && <li><div className="verified-badge-with-title">Verified</div></li>}
                                </ul>
                            </div>
                        </div>

                        {proposedPayment && currency && executionTime &&
                            <div className="right-side">
                            <div className="salary-box">
                                <div className="salary-type">{t('ProposedPayment')}</div>
                                <div className="salary-amount">{`${proposedPayment} ${currency}`}</div>

                                <div className="salary-type">{t("SuggestedLeadTime")}</div>
                                <div className="salary-amount">{executionTime}</div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    </div>

        <div className="container">
            <div className="row">

                {/* <!-- Content --> */}
                <div className="col-xl-8 col-lg-8 content-right-offset">
                    {(description && description.length > 0) &&
                    <div className="single-page-section">
                        <h3 className="margin-bottom-25">{t("AboutMe")}</h3>
                        <p>{description}</p>
                    </div>}

                    <Comments id={searchParams.get('id')} />
                </div>


                <Sidebar proposedPayment={proposedPayment} currency={currency} executionTime={executionTime}
                jobsDoneCount={jobsDoneCount} masterId={searchParams.get('id')} />

            </div>
        </div>
    </>;
};

export default MasterProfile;
