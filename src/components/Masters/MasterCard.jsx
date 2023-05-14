import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import SignInWindow from "../HeaderContainer/SignInWindow/SignInWindow";
import { NavLink } from 'react-router-dom';
import { starRating } from '../../animations/animations';
import { selectIsAuth, selectIsMaster } from './../../features/auth/authSlice';
import { useTranslation } from 'react-i18next';

let MasterCard = (props) => {
    const { t } = useTranslation();
    const isAuth = useSelector(selectIsAuth); 
    const isMaster = useSelector(selectIsMaster);
    const [ isOpen, setIsOpen ] = useState(false);
    const { isMapApiLoaded, id, isAdminChecked, avatar, firstName, lastName, tagLine, rating, 
    lat, lng } = props;
    const [cityName, setCityName] = useState('');
    const [country, setCountry] = useState(null);
    const [shortCountry, setShortCountry] = useState(null);

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
                        setShortCountry(address[p].short_name.toLowerCase());
                      }
                    }
                  } else {
                    console.error("Sorry - We couldn't find this location. Please try an alternative");
                 }
            })
            .catch((e) => console.error("Geocoder failed due to: " + e));
        }
    }, [isMapApiLoaded]);

    //const imgPath = process.env.REACT_APP_IMG_PATH;
    const profilePhotosPath = process.env.REACT_APP_PROFILE_PHOTOS_PATH;
    const flagPath = process.env.REACT_APP_FLAG_PATH;

    useEffect(() => {
        if (document.getElementsByClassName('star').length == 0) {
            starRating();
        }
    }, []);

    return <div className="freelancer" style={{maxWidth: '300px'}}>

        <div className="freelancer-overview">
            <div className="freelancer-overview-inner">

                <div className="freelancer-avatar">
                    {!!+isAdminChecked && <div className="verified-badge"></div>}

                    {(isAuth && !isMaster) 
                    ?<NavLink state={{ id: id, name: 'MasterProfile', page: 'MasterProfile', isMasterProfile: true}}
                    to={`/client-office/master-profile?name=${`${firstName} ${lastName}`}&page=MasterProfile&id=${id}`}>
                        <img src={`${profilePhotosPath}${avatar}`} alt="" />
                    </NavLink>
                    :<img src={`${profilePhotosPath}${avatar}`} alt="" />}
                
                </div>

                <div className="freelancer-name">
                    <h4><a>{`${firstName} ${lastName}`} {(country && shortCountry) && <img className="flag" src={`${flagPath}${shortCountry}.svg`} alt="" title={country} data-tippy-placement="top" />}</a></h4>
                    <span>{tagLine}</span>
                </div>

                <div className="freelancer-rating">
                    <div className="star-rating" data-rating={rating}></div>
                </div>

                {cityName.length > 0 && <strong className="margin-top-5"><i className="icon-material-outline-location-on"></i> {cityName}</strong>}
                {<strong className="margin-top-5">&nbsp;</strong>}
            </div>
        </div>

        <div className="freelancer-details">
            {isAuth
            ?<>
                {!isMaster &&
                <NavLink state={{ id: id, name: 'MasterProfile', page: 'MasterProfile', isMasterProfile: true}}
                    to={`/client-office/master-profile?name=${`${firstName} ${lastName}`}&page=MasterProfile&id=${id}`} className="button button-sliding-icon ripple-effect">
                    {t('ViewProfile')} <i className="icon-material-outline-arrow-right-alt"></i>
                </NavLink>}
            </>
            :<a style={{ color: '#fff' }} onClick={() => setIsOpen(true)} className="button button-sliding-icon ripple-effect popup-with-zoom-anim log-in-button">
                {t('ViewProfile')} <i className="icon-material-outline-arrow-right-alt"></i>
            </a>}
            <SignInWindow open={isOpen} onClose={() => setIsOpen(false)} />
        </div> 
    </div>;
};

export default MasterCard;