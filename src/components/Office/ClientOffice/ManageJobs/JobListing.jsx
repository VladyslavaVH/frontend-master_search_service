import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import TimeAgo from './../../../TimeAgo';
import ExpiringOn from '../../../ExpiringOn';
import { useDeleteJobMutation } from "../../../../features/jobs/jobsApiSlice";
import Modal from './../../../HeaderContainer/Popup/Modal';
import QrCodeGenerator from "../../../Jobs/QrCode/QrCodeGenerator";
import { useTranslation } from 'react-i18next';

const JobListing = (props) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [translatedStatus, setTranslatedStatus] = useState('');
    const [modalTab] = useState(t('ConfirmTheWorkDone'));
    const { id, category, qrCode, createTime, status, candidates } = props;
    const [confirmedMaster] = useState(candidates.find(c => (!!+c.isConfirmed) === true));
    const [deleteJob] = useDeleteJobMutation();

    const [statusColor, setStatusColor] = useState('');

    useEffect(() => {
        switch (status) {
            case 'Pending Approval':
                setTranslatedStatus(t('jobStatus.PendingApproval'));
                setStatusColor('green');
                break;
            case 'Expiring':
                setTranslatedStatus(t('jobStatus.Expiring'));
                setStatusColor('yellow');
                break;
            case 'Expired':
                setTranslatedStatus(t('jobStatus.Expired'));
                setStatusColor('red');
                break;
            default:
                break;
        }
    }, []);

    const editJobData = async () => {

    };

    const removeJob = async () => {
        await deleteJob(id).unwrap(); 
        window.location.reload(true);
    }

    return <li>
        <div className="job-listing">

            <div className="job-listing-details">

                <div className="job-listing-description">
                    <h3 className="job-listing-title">
                        <NavLink state={{ id: id, name: t('Job'), page: t('Job') }}
                            to={`/client-office/manage-jobs/job/${category}`}>
                            {category}
                        </NavLink> 
                        {!(confirmedMaster && candidates?.length > 0) && <span className={`dashboard-status-button ${statusColor}`}>{translatedStatus}</span>}
                    </h3>

                    <div className="job-listing-footer">
                        <ul>
                            <li><i className="icon-material-outline-date-range"></i>{t('Posted')} <TimeAgo timestamp={createTime} /></li>
                            <li><i className="icon-material-outline-date-range"></i><ExpiringOn timestamp={createTime} /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        {/* <!-- Buttons --> */}
        <div className="buttons-to-right always-visible">
                    
            {candidates?.length > 0 &&
                <NavLink 
                state={{ 
                    id: id, 
                    masterId: confirmedMaster?.id, 
                    name: confirmedMaster ? t('MyMaster') : t('ManageCandidates'), 
                    page: confirmedMaster ? t('MyMaster') : t('ManageCandidates')
                }}
                    to={`/client-office/manage-jobs/manage-candidates/${category}`} className="button ripple-effect">
                        {confirmedMaster 
                        ?<>
                            <i className="icon-feather-user-check"></i> 
                             {t('MyMaster')}
                        </> 
                        : <>
                            <i className="icon-material-outline-supervisor-account"></i> 
                             {t("ManageCandidates")} 
                            <span className="button-info">
                                {candidates?.length}
                            </span>
                         </>
                        }
                </NavLink>
            }

            {(status === 'red') && <a href="#" className="button dark ripple-effect"><i className="icon-feather-rotate-ccw"></i> Refresh</a>}
            
            {false && <NavLink state={{ id: id, name: 'Edit Job', page: 'Edit Job' }}
                to={`/client-office/manage-jobs/edit/job/${category}`}
                className="button gray ripple-effect ico" title="Edit" data-tippy-placement="top"><i className="icon-feather-edit"></i></NavLink>}

            <a onClick={removeJob} className="button gray ripple-effect ico" title="Remove" data-tippy-placement="top"><i className="icon-feather-trash-2"></i></a>
            {/* {candidates?.length > 0 && confirmedMaster
                ? <>
                    <a onClick={() => setIsOpen(true)} className="button gray ripple-effect ico" title="QrCode" data-tippy-placement="top"><i className="icon-line-awesome-qrcode"></i></a>
                    <Modal tabs={[modalTab]} open={isOpen} onClose={() => setIsOpen(false)} >
                        <QrCodeGenerator qrCodeString={qrCode} />
                    </Modal>
                </>
                : null
            } */}
        </div>
    </li>;
}

export default JobListing;
