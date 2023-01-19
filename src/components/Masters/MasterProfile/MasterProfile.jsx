import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { inlineBG, starRating } from "../../../amimations/amimations";
import SendMessagePopup from './../../Office/ClientOffice/ManageCandidates/SendMessagePopup';
import { useGetMasterByIdQuery } from "../../../features/masters/mastersApiSlice";
import Comments from "./Comments/Comments";
import Sidebar from "./Sidebar/Sidebar";

const MasterProfile = (props) => {
    const location = useLocation();
    const { data, isLoading } = useGetMasterByIdQuery(location.state.id);
    const { id, isVerified, avatar, firstName, lastName, tagLine, rating, jobsDoneCount, description, flag, country, lng, lat } = data || {};

    useEffect(() => {
        inlineBG();
    }, []);

    useEffect(() => {
        if (!isLoading) {            
            if (document.getElementsByClassName('star').length == 0) {
                starRating();
            }
        }
    }, [isLoading])
    
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
                                    {flag && <li><img className="flag" src={`${flagPath}${flag}.svg`} alt="" /> Germany</li>}
                                    {!!+isVerified && <li><div className="verified-badge-with-title">Verified</div></li>}
                                </ul>
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

                    {(description && description.length > 0) &&
                    <div className="single-page-section">
                        <h3 className="margin-bottom-25">About Me</h3>
                        <p>{description}</p>
                    </div>}

                    <Comments id={location.state.id} />
                </div>


                <Sidebar jobsDoneCount={jobsDoneCount} masterId={location.state.id} />

            </div>
        </div>
    </>;
};

export default MasterProfile;
