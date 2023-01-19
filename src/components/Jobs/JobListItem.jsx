import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsAuth, selectIsMaster } from "../../features/auth/authSlice";
import SignInWindow from "../HeaderContainer/SignInWindow/SignInWindow";
import { NavLink } from 'react-router-dom';
import DisplayTime from './DisplayTime';
import TimeAgo from "../TimeAgo";
import Geocode from 'react-geocode';

const JobListItem = (props) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const isAuth = useSelector(selectIsAuth); 
    const isMaster = useSelector(selectIsMaster);

    const { minPayment, maxPayment,
        id, isVerified, title, clientName, lat, lng, category, days, createTime,
         isHomePage } = props;

    const coordinatesToAddress = () => {
        Geocode.setApiKey(process.env.REACT_APP_GEOCODING_KEY);

        Geocode.setLanguage("en");
        Geocode.setRegion("ua");
        
        if(lat && lng) {
            Geocode.fromLatLng(lat, lng).then(
                response => {
                  const address = response.results[0].formatted_address;
                  console.log(address);
                  return address;
                },
                error => {
                  console.error(error);
                }
              );
        } else return null;
    }

    return <div className={`job-listing${isHomePage ? ' with-apply-button' : ''}`}>
    
        <div className="job-listing-details">
    
            <div className="job-listing-description">
                <h3 className="job-listing-title">{title}</h3>
    
                <div className="job-listing-footer">
                    <ul>
                        <li><i className="icon-feather-user"></i> {clientName}
                            {!!+isVerified && <div className="verified-badge" title="Verified Employer" data-tippy-placement="top"></div>}
                        </li>
                        <li><i className="icon-material-outline-location-on"></i> {coordinatesToAddress()}</li>
                        <li><i className="icon-material-outline-business-center"></i> {category}</li>
                        <li><i className="icon-feather-dollar-sign"></i>{minPayment}-{maxPayment}</li>
                        <li><i className="icon-material-outline-access-time"></i> 
                        {/* <DisplayTime days={days} createTime={createTime} /> */}
                        <TimeAgo timestamp={createTime} />
                        </li>
                    </ul>
                </div>
            </div>

            {isHomePage &&
            <>
                {(isAuth)
                ?<>
                    {isMaster &&
                    <NavLink state={{ name: 'Apply for a Job', page: 'Apply for a Job', isApply: true }}
                        to={`/master-office/job/${title}/${id}`}>
                        <span className="list-apply-button ripple-effect">Apply Now</span>
                    </NavLink>}
                </>
                :<a onClick={() => setIsOpen(true)} className="popup-with-zoom-anim log-in-button" style={{ cursor: 'pointer' }}>
                    <span className="list-apply-button ripple-effect">Apply Now</span>
                </a>}
                <SignInWindow open={isOpen} onClose={() => setIsOpen(false)} />
            </>}
        </div>
    </div>
};

export default JobListItem;