import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { starRating } from "../../../../amimations/amimations";
import { useDeleteCandidateMutation, useConfirmCandidateMutation } from "../../../../features/jobs/jobsApiSlice";
import { useTranslation } from 'react-i18next';

const Candidate = (props) => {
    const { t } = useTranslation();
    const { id, jobFK, isConfirmed, isVerified, avatar, firstName, lastName, flag, country, email, phone, rating } = props;

    const [fullName, setFullName] = useState(`${firstName} ${lastName}`);
    const [deleteCandidate] = useDeleteCandidateMutation();
    const [confirmCandidate] = useConfirmCandidateMutation();

    useEffect(() => {
        setFullName(`${firstName} ${lastName}`);
    }, []);

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
                window.location.reload(true);
            });
        } else console.log('error');
    }

    const confirmMaster = async () => {
        const jobId = jobFK;
        const masterId = id;
        console.log(jobId, masterId);
        if (jobId && masterId) {
            await confirmCandidate({jobId, masterId}).unwrap()
            .then(() => {
                console.log('confirmed');
                //window.location.reload(true);
            });
        } else console.log('error');
    }

    return <li>
        <div className="freelancer-overview manage-candidates">
            <div className="freelancer-overview-inner">

                <div className="freelancer-avatar">
                    {!!+isVerified && <div className="verified-badge"></div>}
                    <NavLink state={{ id: id, name: fullName, page: t('MasterProfile')}}
                    to={`/client-office/master-profile`}><img src={`${profilePhotosPath}${avatar}`} alt={t("Candidate.part1")} /></NavLink>
                </div>

                <div className="freelancer-name">
                    <h4><NavLink state={{ id: id, name: fullName, page: t('Master')}}
                    to={`/client-office/master-profile`}>{fullName} {flag && <img className="flag" src={`${flagPath}${flag}.svg`} alt="flag" title={country} data-tippy-placement="top" />}</NavLink></h4>

                    {email && <span className="freelancer-detail-item"><i className="icon-feather-mail"></i> {email}</span>}
                    {phone && <span className="freelancer-detail-item"><i className="icon-feather-phone"></i> {phone}</span>}

                    {(rating && rating > 0) &&
                         <div className="freelancer-rating">
                            <div className="star-rating" data-rating={rating}></div>
                        </div>}

                    {/* <!-- Buttons --> */}
                    <div className="buttons-to-right always-visible margin-top-25 margin-bottom-5">
                        {!!+isConfirmed &&
                            <>
                                {/*href="#small-dialog" */}
                                <NavLink state={{ targetUser: id, name: t('Messages'), page: t('Messages') }}
                                to={`/client-office/messages/user/${firstName}/${lastName}`}
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
