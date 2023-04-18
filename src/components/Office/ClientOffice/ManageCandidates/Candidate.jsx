import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { starRating } from "../../../../amimations/amimations";
import { useDeleteCandidateMutation, useConfirmCandidateMutation } from "../../../../features/jobs/jobsApiSlice";
import { useTranslation } from 'react-i18next';
import { useGetAdditionalMasterInfoQuery } from '../../../../features/master/masterApiSlice';

const Candidate = (props) => {
    const { t } = useTranslation();
    const { isMapApiLoaded, id, lat, lng, jobFK, isConfirmed, isVerified, avatar, firstName, lastName, email, phone, rating } = props;
    const { data: additionalInfo } = useGetAdditionalMasterInfoQuery(({jobId: jobFK, masterId: id}));
    const { proposedPayment, currency, currencyFK, executionTime, status } = additionalInfo || {};
    const [cityName, setCityName] = useState(null);
    const [country, setCountry] = useState(null);
    const [flag, setFlag] = useState(null);

    const [fullName, setFullName] = useState(`${firstName} ${lastName}`);
    const [deleteCandidate] = useDeleteCandidateMutation();
    const [confirmCandidate] = useConfirmCandidateMutation();

    useEffect(() => {
        setFullName(`${firstName} ${lastName}`);
    }, []);

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

    const profilePhotosPath = process.env.REACT_APP_PROFILE_PHOTOS_PATH;
    const flagPath = process.env.REACT_APP_FLAG_PATH;

    useEffect(() => {
        if (document.getElementsByClassName('star').length == 0) {
            starRating();
        }
    }, []);

    const removeCandidate = async () => {
        const jobId = jobFK;
        const masterId = id;
        console.log(jobId, masterId);
        if (jobId && masterId) {
            await deleteCandidate({jobId, masterId}).unwrap()
            .then(() => {
                //console.log("Removing candidate");
                //window.location.reload(true);
            });
        } else console.log('error');
    }

    const confirmMaster = async () => {
        const jobId = jobFK;
        const masterId = id;
        if (jobId && masterId) {
            await confirmCandidate({jobId, masterId}).unwrap()
            .then(() => {
                //console.log('confirmed');
                //window.location.reload(true);
            });
        } else console.log('error');
    }

    return <li>
        <div className="freelancer-overview manage-candidates">
            <div className="freelancer-overview-inner">

                <div className="freelancer-avatar">
                    {!!+isVerified && <div className="verified-badge"></div>}
                    <NavLink state={{ id: id, jobId: jobFK, name: fullName, page: 'MasterProfile'}}
                    to={`/client-office/master-profile?name=${fullName}&page=MasterProfile&jobId=${jobFK}&id=${id}`}><img src={`${profilePhotosPath}${avatar}`} alt={t("Candidate.part1")} /></NavLink>
                </div>

                <div className="freelancer-name">
                    <h4><NavLink state={{ id: id, jobId: jobFK, name: fullName, page: 'Master'}}
                    to={`/client-office/master-profile?name=${fullName}&page=MasterProfile&jobId=${jobFK}&id=${id}`}>{fullName} {(country && flag) && <img className="flag" src={`${flagPath}${flag}.svg`} alt="flag" title={country} data-tippy-placement="top" />}</NavLink></h4>

                    {email && <span className="freelancer-detail-item"><i className="icon-feather-mail"></i>&nbsp;{email}</span>}
                    {phone && <span className=""><i className="icon-feather-phone"></i>&nbsp;{phone}</span>}
                    {/* {<strong className="margin-top-5">&nbsp;</strong>} */}

                    {(rating && rating > 0) &&
                         <div className="freelancer-rating">
                            <div className="star-rating" data-rating={rating}></div>
                        </div>}

                    {/* <!-- Buttons --> */}
                    <div className="buttons-to-right always-visible margin-top-25 margin-bottom-5">
                        <div class="freelancer-details-list">
                            <ul>
                                {cityName && 
                                <li>{t('Location')} <strong><i class="icon-material-outline-location-on"></i> {cityName}</strong></li>}
                                
                                <li>{t('ProposedPayment')} <strong>{proposedPayment} {currency}</strong></li>
                                <li>{t('SuggestedLeadTime')} <strong>{executionTime}</strong></li>
                            </ul>
                        </div>

                        {!!+isConfirmed &&
                            <>
                                {/*href="#small-dialog" */}
                                <NavLink state={{ targetUser: id, jobId: jobFK, name: t('Messages'), page: t('Messages') }}
                                to={`/client-office/messages?firstName=${firstName}&lastName=${lastName}&targetUser=${id}&jobId=${jobFK}`}
                                className="popup-with-zoom-anim button dark ripple-effect"><i className="icon-feather-mail"></i> {t("SendMessage")}</NavLink>
                                {/* <SendMessagePopup popupSettings={popupSettings} />  */}
                            </>
                        }                        
                        
                        {!(!!+isConfirmed) &&
                            <>
                                <a onClick={removeCandidate} className="button gray ripple-effect ico" title={`${t('Remove')} ${t("Candidate.part1")}`} data-tippy-placement="top"><i className="icon-feather-trash-2"></i></a>
                                <a onClick={confirmMaster} className="button gray ripple-effect ico" title={`${t("Accept")} ${t("Candidate.part1")}`} data-tippy-placement="top"><i className="icon-feather-check"></i></a>
                            </>
                        }
                    </div>                    
                </div>
            </div>
        </div>
    </li>;
}

export default Candidate;
