import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsAuth, selectIsMaster } from "../../features/auth/authSlice";
import SignInWindow from "../HeaderContainer/SignInWindow/SignInWindow";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import DisplayTime from './DisplayTime';
import TimeAgo from "../TimeAgo";
import { useTranslation } from "react-i18next";
//import Geocode from 'react-geocode';

const JobListItem = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [ isOpen, setIsOpen ] = useState(false);
    const isAuth = useSelector(selectIsAuth); 
    const isMaster = useSelector(selectIsMaster);
    const { minPayment, maxPayment, currency,
        id, isVerified, clientName, lat, lng, category, createTime,
         isHomePage } = props;
    const [cityName, setCityName] = useState('');

    useEffect(() => {
        if (window.google && (lat && lng)) {

            if (!window.myGeocoder) {
                window.myGeocoder = new window.google.maps.Geocoder();
            }

            window.myGeocoder
            .geocode({ location: { lat, lng } }, function(results, status) {
                if( status === window.google.maps.GeocoderStatus.OK ) {
                    let address = results[0].address_components;
                    for (let p = address.length-1; p >= 0; p--) {
                      if ((address[p].types.indexOf("locality") != -1)
                       && (address[p].types.indexOf("political") != -1)) {
                        setCityName(address[p].long_name);
                      }
                    }
                  } else {
                    console.log("Sorry - We couldn't find this location. Please try an alternative");
                 }
            })
            .catch((e) => console.log("Geocoder failed due to: " + e));
        }
    }, []);

    return <div className={`job-listing${isHomePage ? ' with-apply-button' : ''}`}>
    
        <div className="job-listing-details">
    
            <div onClick={() => {
                if (!isHomePage && isAuth && isMaster && location.pathname.includes('/jobs')) {
                    navigate(`/master-office/job/${category}`, { state: { id: id, name: t('ApplyForAJob'), page: t('ApplyForAJob'), isApply: true } })                    
                }
            }} 
            className="job-listing-description">
                <h3 className="job-listing-title">{category}</h3>
    
                <div className="job-listing-footer">
                    <ul>
                        <li><i className="icon-feather-user"></i> {clientName}
                            {!!+isVerified && <div className="verified-badge" title="Verified Employer" data-tippy-placement="top"></div>}
                        </li>
                        {cityName?.length > 0 && <li><i className="icon-material-outline-location-on"></i> {cityName}</li>}
                        {/* <li><i className="icon-material-outline-business-center"></i> {category}</li> */}
                        <li><i className="icon-line-awesome-money"></i>{minPayment}-{maxPayment} {currency}</li>
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
                    <NavLink state={{ id: id, name: t('ApplyForAJob'), page: t('ApplyForAJob'), isApply: true }}
                        to={`/master-office/job/${category}/${id}`}>
                        <span className="list-apply-button ripple-effect">{t('ApplyNow')}</span>
                    </NavLink>}
                </>
                :<a onClick={() => setIsOpen(true)} className="popup-with-zoom-anim log-in-button" style={{ cursor: 'pointer' }}>
                    <span className="list-apply-button ripple-effect">{t('ApplyNow')}</span>
                </a>}
                <SignInWindow open={isOpen} onClose={() => setIsOpen(false)} />
            </>}
        </div>
    </div>
};

export default JobListItem;