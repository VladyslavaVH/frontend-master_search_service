import React, { useEffect } from "react";
import ApplyPopup from "./ApplyPopup";
import { inlineBG } from "../../../amimations/amimations";
import JobCard from "../JobCard";
import PhotoCarousel from "../PhotoCarousel";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsMaster } from './../../../features/auth/authSlice';
import { useGetJobByIdQuery, useGetJobPhotosQuery } from "../../../features/jobs/jobsApiSlice";
import TimeAgo from './../../TimeAgo';

const SingleJob = (props) => {
    const location = useLocation();
    const isMaster = useSelector(selectIsMaster);

    const imgPath = process.env.REACT_APP_IMG_PATH;
    const flagPath = process.env.REACT_APP_FLAG_PATH;

    const { data: photos } = useGetJobPhotosQuery(location.state.id);
    const { data } = useGetJobByIdQuery(location.state.id);
    const { id, title, firstName, lastName, isVerified, minPayment, maxPayment, description, lat, lng, category, createTime } = data || {};

    const similarJobs = [
        {id: 1, icon: null, title: 'Barista and Cashier', clientName: 'Alexander', isClientVerified: false, category: 'Coffee', location: 'San Francisco', minPayment: 100, maxPayment: 300, postedDate: '2 days ago'},
        {id: 2, icon: null, title: 'Restaurant Manager', clientName: 'Jude', isClientVerified: true, category: 'Coffee', location: 'San Francisco', minPayment: 300, maxPayment: 500, postedDate: '2 days ago'}
    ];
    
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
                                    <h3>{title}</h3>
                                    <h5>About the Client</h5>
                                    <ul>
                                        <li><i className="icon-feather-user"></i> {`${firstName} ${lastName}`}</li>
                                        {false && <li><img className="flag" src={`${flagPath}gb.svg`} alt="" /> United Kingdom</li>}
                                        {!!+isVerified && <li><div className="verified-badge-with-title">Verified</div></li>}
                                    </ul>
                                </div>
                            </div>
                            <div className="right-side">
                                <div className="salary-box">
                                    <div className="salary-type">Annual payment</div>
                                    <div className="salary-amount">${minPayment} - ${maxPayment}</div>
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
                        <h3 className="margin-bottom-25">Job Description</h3>
                        <p>{description}</p>
                    </div>

                    {photos && <PhotoCarousel photos={photos} />}

                    {isMaster &&
                        <div className="single-page-section">
                            <h3 className="margin-bottom-25">Similar Jobs</h3>

                            <div className="listings-container grid-layout">
                                {similarJobs?.map(j =>
                                    <JobCard key={j.id}
                                        {...j} />)}
                            </div>
                        </div>
                    }
                </div>

                {/* <!-- Sidebar --> */}
                <div className="col-xl-4 col-lg-4">
                    <div className="sidebar-container">

                        {isMaster &&
                            <>
                                <a href="#small-dialog" className="apply-now-button popup-with-zoom-anim">Apply Now <i className="icon-material-outline-arrow-right-alt"></i></a>
                                <ApplyPopup />
                            </>
                        }

                        <div className="sidebar-widget">
                            <div className="job-overview">
                                <div className="job-overview-headline">Job Information</div>
                                <div className="job-overview-inner">
                                    <ul>
                                        <li>
                                            <i className="icon-material-outline-location-on"></i>
                                            <span>Location</span>
                                            <h5>{`lat: ${lat}, lng: ${lng}`}</h5>
                                        </li>
                                        <li>
                                            <i className="icon-material-outline-business-center"></i>
                                            <span>Category</span>
                                            <h5>{category}</h5>
                                        </li>
                                        <li>
                                            <i className="icon-material-outline-local-atm"></i>
                                            <span>Payment</span>
                                            <h5>${minPayment} - ${maxPayment}</h5>
                                        </li>
                                        <li>
                                            <i className="icon-material-outline-access-time"></i>
                                            <span>Date Posted</span>
                                            <h5><TimeAgo timestamp={createTime} /></h5>
                                        </li>
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
