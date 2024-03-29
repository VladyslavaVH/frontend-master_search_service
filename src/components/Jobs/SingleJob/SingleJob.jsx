import React, { useEffect, useState } from "react";
import { inlineBG } from "../../../animations/animations";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentLanguage, selectIsMaster } from './../../../features/auth/authSlice';
import { useGetJobByIdQuery, useGetJobPhotosQuery } from "../../../features/jobs/jobsApiSlice";
import { useGetMasterJobApplyStatusQuery } from "../../../features/master/masterApiSlice";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import TimeAgo from './../../TimeAgo';
import ApplyJob from "./ApplyJob";
import { useTranslation } from 'react-i18next';
import { fireSingleCategory } from '../../../utils/firebase.config';
import DisplayTime from './../DisplayTime';
import { useSearchParams } from "react-router-dom";

const SingleJob = (props) => { 
    const { t } = useTranslation();
    const lang = useSelector(selectCurrentLanguage);
    const [searchParams] = useSearchParams();

    // useEffect(() => {
    //     console.log(searchParams.get('id'));
    //     for (const entry of searchParams.entries()) {
    //         console.log(entry);
    //     }
    // }, [searchParams]);

    const [ isOpen, setIsOpen ] = useState(false);
    const location = useLocation();
    const isMaster = useSelector(selectIsMaster);

    const imgPath = process.env.REACT_APP_IMG_PATH;
    const flagPath = process.env.REACT_APP_FLAG_PATH;
    const jobPhotosPath = process.env.REACT_APP_JOB_PHOTOS_PATH;

    const { data: photos } = useGetJobPhotosQuery(location?.state?.id ? location.state.id : searchParams.get('id'));
    const { data, isLoading } = useGetJobByIdQuery(location?.state?.id ? location.state.id : searchParams.get('id'));
    const { id, isMasterConfirmed, firstName, lastName, isVerified, minPayment, maxPayment, currency, description, lat, lng, category, createTime, days } = data || {};

    const [translatedCategory, setTranslatedCategory] = useState(category ? category : searchParams.get('category'));
    const { data: jobApply } = useGetMasterJobApplyStatusQuery(id);
    const [addr, setAddr] = useState('');

    useEffect(() => {
        if (!isLoading && (lat && lng)) {
            if (window.google) {

                if (!window.myGeocoder) {
                    window.myGeocoder = new window.google.maps.Geocoder();
                }
    
                window.myGeocoder
                .geocode({ location: { lat, lng } }, function(results, status) {
                    if( status === window.google.maps.GeocoderStatus.OK ) {
                        setAddr(results[0].formatted_address);
                      } else {
                        console.error("Sorry - We couldn't find this location. Please try an alternative");
                     }
                })
                .catch((e) => console.error("Geocoder failed due to: " + e + ` lat: ${lat} lng: ${lng}`));
            }
        }
    }, [isLoading]);
    
    useEffect(() => {
        if(!isLoading) {
            fireSingleCategory(category ? category : searchParams.get('category'), lang, setTranslatedCategory);
        }
    }, [isLoading, lang]);

    useEffect(() => {
        console.log(jobApply);
    } , [jobApply?.status]);
    
    useEffect(() => {
        inlineBG();
    }, []);

    return <>
        <div className="single-page-header" data-background-image={`${imgPath}single-job.jpg`}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="single-page-header-inner">
                            <div className="left-side">
                                <div className="header-details">
                                    <h3>{translatedCategory}</h3>
                                    <h5>{t('AboutTheClient')}</h5>
                                    <ul>
                                        <li><i className="icon-feather-user"></i> {`${firstName} ${lastName}`}</li>
                                        {false && <li><img className="flag" src={`${flagPath}gb.svg`} alt="" /> United Kingdom</li>}
                                        {!!+isVerified && <li><div className="verified-badge-with-title">{t('Verified')}</div></li>}
                                    </ul>
                                </div>
                            </div>
                            <div className="right-side">
                                <div className="salary-box">
                                    <div className="salary-type">{t('Payment')}</div>
                                    <div className="salary-amount">{minPayment} - {maxPayment} {currency}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="container">
            <div className="row">

                {/* <!-- Content --> */}
                <div className="col-xl-8 col-lg-8 content-right-offset">
                    
                    <div className="single-page-section">
                        <h3 className="margin-bottom-25">{t("JobDescription")}</h3>
                        <p>{description}</p>
                    </div>

                    {/* {photos && <PhotoCarousel photos={photos} />} */}
                    {photos &&
                        <div style={{ display: 'flex', flexWrap: 'wrap', }}>
                        <PhotoProvider
                            speed={() => 800}
                            easing={(type) => (type === 3 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')}
                        >
                            {photos?.map((item, index) => (
                                <PhotoView key={index} src={`${jobPhotosPath}${item.photo}`}>
                                    <img style={{ marginRight: '.5rem', marginBottom: '.5rem', objectFit: 'cover', width: '11rem', height: '9rem', maxWidth: '100%', display: 'block', verticalAlign: 'middle', cursor: 'pointer' }} src={`${jobPhotosPath}${item.photo}`} alt="" />
                                </PhotoView>
                            ))}
                        </PhotoProvider>
                    </div>
                        
                    }
                </div>

                {/* <!-- Sidebar --> */}
                <div className="col-xl-4 col-lg-4">
                    <div className="sidebar-container">

                        {(!(!!+isMasterConfirmed) && isMaster) && (jobApply?.status === null || jobApply?.status === undefined) &&
                            <>
                                <a onClick={() => setIsOpen(true)} style={{ color: '#fff', cursor: 'pointer' }} className="apply-now-button popup-with-zoom-anim">{t("ApplyNow")} <i className="icon-material-outline-arrow-right-alt"></i></a>
                                <ApplyJob jobId={location?.state?.id ? location.state.id : searchParams.get('id')} open={isOpen} onClose={() => setIsOpen(false)} />
                            </>
                        }

                        <div className="sidebar-widget">
                            <div className="job-overview">
                                <div className="job-overview-headline">{t("JobInformation")}</div>
                                <div className="job-overview-inner">
                                    <ul>
                                        <li>
                                            <i className="icon-material-outline-location-on"></i>
                                            <span>{t('Location')}</span>
                                            <h5>{addr}</h5>
                                        </li>
                                        <li>
                                            <i className="icon-material-outline-business-center"></i>
                                            <span>{t('Category')}</span>
                                            <h5>{translatedCategory}</h5>
                                        </li>
                                        <li>
                                            <i className="icon-line-awesome-money"></i>
                                            <span>{t('Payment')}</span>
                                            <h5>{minPayment} - {maxPayment} {currency}</h5>
                                        </li>
                                        <li>
                                            <i className="icon-material-outline-access-time"></i>
                                            <span>{t('DatePosted')}</span>
                                            {/* <h5><TimeAgo timestamp={createTime} /></h5> */}
                                            <h5><DisplayTime days={days} createTime={createTime} /></h5>
                                        </li>
                                        {(!!+isMasterConfirmed) &&
                                        <li>
                                            <i className="icon-feather-user"></i>
                                            <span>
                                                {
                                                    (!!+jobApply?.status && jobApply.status)
                                                    ? t('You')
                                                    : t('Master')
                                                }
                                            </span>
                                            <h5>{t('Confirmed')}</h5>
                                        </li>}

                                        {(jobApply?.status !== undefined) &&
                                        <>                                            
                                            {( !(!!+jobApply?.status) && !(!!+isMasterConfirmed)) &&
                                            <li>
                                                <i className="icon-feather-user"></i>
                                                <span>{t('You')}</span>
                                                <h5>{t("AppliedForThisJob")}</h5>
                                            </li>}
                                        </> }                                  
                                     </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </>;
}
export default SingleJob;
