import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import TimeAgo from './../../../TimeAgo';
import ExpiringOn from '../../../ExpiringOn';
import { useDeleteJobMutation } from "../../../../features/jobs/jobsApiSlice";
import Modal from './../../../HeaderContainer/Popup/Modal';
import QrCodeGenerator from "../../../Jobs/QrCode/QrCodeGenerator";
import { useTranslation } from 'react-i18next';
import Success from './../../Settings/Success';
import DisplayTime from "../../../Jobs/DisplayTime";

const JobListing = (props) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [deletedJob, setDeletedJob] = useState(false);
    const [translatedStatus, setTranslatedStatus] = useState('');
    const [modalTab] = useState(t('ConfirmTheWorkDone'));
    const { id, defaultCategoryName, category, qrCode, createTime, status, candidates } = props;
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

    const removeJob = async () => {
        await deleteJob(id).unwrap(); 
        window.location.reload(true);
    }

    useEffect(() => {
        if (isDelete) {
            removeJob();
            setIsSuccess(true);
            setIsDelete(false);
        }
    }, [isDelete]);

    return <li>
        <div className="job-listing">

            <div className="job-listing-details">

                <div className="job-listing-description">
                    <h3 className="job-listing-title">
                        <NavLink state={{ id: id, name: 'Job', page: 'Job' }}
                            to={`/client-office/manage-jobs/job?category=${defaultCategoryName.replaceAll('/', '-')}&id=${id}`}>
                            {category}
                        </NavLink> 

                        {false && <>{!(confirmedMaster && candidates?.length > 0) && <span className={`dashboard-status-button ${statusColor}`}>{translatedStatus}</span>}</>}
                    </h3>

                    <div className="job-listing-footer">
                        <ul>
                            <li><i className="icon-material-outline-date-range"></i>{t('Posted')} 
                                {/* <TimeAgo timestamp={createTime} /> */}
                                <DisplayTime createTime={createTime} />
                            </li>
                            {false && <li><i className="icon-material-outline-date-range"></i><ExpiringOn timestamp={createTime} /></li>}
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
                    to={`/client-office/manage-jobs/manage-candidates?category=${category}&masterId=${confirmedMaster?.id}&id=${id}`} className="button ripple-effect">
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

            <a onClick={() => setIsOpen(true)} className="button gray ripple-effect ico" title="Remove" data-tippy-placement="top"><i className="icon-feather-trash-2"></i></a>
            
            <Modal open={isOpen} onClose={() => setIsOpen(false)} tabs={[]} >
                <div className="container">
                    <div className="col margin-bottom-30 margin-top-20">
                        <div className="">
                            <div className="welcome-text">
                                <h3><span>{t('DeleteCategory')} <strong style={{color: '#2a41e8'}} className='color'>{category}</strong>?</span></h3>
                            </div>
                            <div className='row'>
                                <div className="col-xl-6 col-md-6">
                                    <button onClick={() => {
                                        setIsDelete(true);
                                        setIsOpen(false);
                                    }} className="button big full-width ripple-effect margin-top-10" type="button">
                                        {t('Yes')} 
                                    </button>
                                </div>
                                <div className="col-xl-6 col-md-6">
                                    <button onClick={() => {
                                        setIsOpen(false);
                                    }} className="button big full-width ripple-effect margin-top-10" type="button">
                                        {t('No')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal tabs={[t('Success')]} open={isSuccess}>
                <Success mainText={t('YourDataHasBeenSuccessfullyUpdated')} onClose={() => setIsSuccess(false)} />
            </Modal>
            
            
            
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
