import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import SignInWindow from "../HeaderContainer/SignInWindow/SignInWindow";
import { NavLink } from 'react-router-dom';
import { starRating } from '../../amimations/amimations';
import { selectIsAuth, selectIsMaster } from './../../features/auth/authSlice';

let MasterCard = (props) => {
    const isAuth = useSelector(selectIsAuth); 
    const isMaster = useSelector(selectIsMaster);
    const [ isOpen, setIsOpen ] = useState(false);
    const { id, isAdminChecked, avatar, firstName, lastName, tagLine, rating, 
    nationality, lat, lng } = props;
    const [location, setLocation] = useState({lat: 0, lng: 0});

    //const imgPath = process.env.REACT_APP_IMG_PATH;
    const profilePhotosPath = process.env.REACT_APP_PROFILE_PHOTOS_PATH;
    const flagPath = process.env.REACT_APP_FLAG_PATH;
    const userPlaceholder = null;

    useEffect(() => {
        if (document.getElementsByClassName('star').length == 0) {
            starRating();
        }

        setLocation({lat, lng});
    }, []);

    return <div className="freelancer">

        <div className="freelancer-overview">
            <div className="freelancer-overview-inner">

                <div className="freelancer-avatar">
                    {!!+isAdminChecked && <div className="verified-badge"></div>}

                    {(isAuth && !isMaster) 
                    ?<NavLink state={{ name: 'Master Profile', page: 'Master Profile', isMasterProfile: true }}
                        to={`/client-office/master-profile/${id}`}>
                        <img src={`${profilePhotosPath}${avatar ? avatar : userPlaceholder}`} alt="" />
                    </NavLink>
                    :<img src={`${profilePhotosPath}${avatar ? avatar : userPlaceholder}`} alt="" />}
                
                </div>

                <div className="freelancer-name">
                    <h4><a>{`${firstName} ${lastName}`} {nationality && <img className="flag" src={`${flagPath}${nationality.flag}.svg`} alt="" title={nationality.country} data-tippy-placement="top" />}</a></h4>
                    <span>{tagLine}</span>
                </div>

                <div className="freelancer-rating">
                    <div className="star-rating" data-rating={rating}></div>
                </div>

                <strong className="margin-top-5"><i className="icon-material-outline-location-on"></i> {`lat: ${location.lat}, lng: ${location.lng}`}</strong>
            </div>
        </div>

        <div className="freelancer-details">
            {isAuth
            ?<>
                {!isMaster &&
                <NavLink state={{ id: id, name: 'Master Profile', page: 'Master Profile', isMasterProfile: true}}
                    to={`/client-office/master-profile`} className="button button-sliding-icon ripple-effect">
                    View Profile <i className="icon-material-outline-arrow-right-alt"></i>
                </NavLink>}
            </>
            :<a onClick={() => setIsOpen(true)} className="button button-sliding-icon ripple-effect popup-with-zoom-anim log-in-button">
                View Profile <i className="icon-material-outline-arrow-right-alt"></i>
            </a>}
            <SignInWindow open={isOpen} onClose={() => setIsOpen(false)} />
        </div> 
    </div>;
};

export default MasterCard;