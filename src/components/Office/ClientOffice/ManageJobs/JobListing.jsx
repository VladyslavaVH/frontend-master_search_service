import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import TimeAgo from './../../../TimeAgo';
import ExpiringOn from '../../../ExpiringOn';
import { useDeleteJobMutation } from "../../../../features/jobs/jobsApiSlice";

const JobListing = (props) => {
    const { id, title, createTime, status, candidates } = props;
    const [confirmedMaster, setConfirmedMaster] = useState(candidates.find(c => (!!+c.isConfirmed) === true));
    const [deleteJob] = useDeleteJobMutation();

    const [statusColor, setStatusColor] = useState('');

    useEffect(() => {
        console.log(candidates.find(c => (!!+c.isConfirmed) === true));
        switch (status) {
            case 'Pending Approval':
                setStatusColor('green');
                break;
            case 'Expiring':
                setStatusColor('yellow');
                break;
            case 'Expired':
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
                        <NavLink state={{ id: id, name: 'Job', page: 'Job' }}
                            to={`/client-office/manage-jobs/job/${title}`}>
                            {title}
                        </NavLink> 
                    <span className={`dashboard-status-button ${statusColor}`}>{status}</span></h3>

                    <div className="job-listing-footer">
                        <ul>
                            <li><i className="icon-material-outline-date-range"></i>Posted <TimeAgo timestamp={createTime} /></li>
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
                    name: confirmedMaster ? 'My master' : 'Manage Candidates', 
                    page: confirmedMaster ? 'My master' : 'Manage Candidates'
                }}
                    to={`/client-office/manage-jobs/manage-candidates/${title}`} className="button ripple-effect">
                        {confirmedMaster 
                        ?<>
                            <i className="icon-feather-user-check"></i> 
                             My master
                        </> 
                        : <>
                            <i className="icon-material-outline-supervisor-account"></i> 
                             Manage Candidates 
                            <span className="button-info">
                                {candidates.length}
                            </span>
                         </>
                        }
                </NavLink>
            }

            {(status === 'red') && <a href="#" className="button dark ripple-effect"><i className="icon-feather-rotate-ccw"></i> Refresh</a>}
            
            {false && <NavLink state={{ id: id, name: 'Edit Job', page: 'Edit Job' }}
                to={`/client-office/manage-jobs/edit/job/${title}`}
                className="button gray ripple-effect ico" title="Edit" data-tippy-placement="top"><i className="icon-feather-edit"></i></NavLink>}

            <a onClick={removeJob} className="button gray ripple-effect ico" title="Remove" data-tippy-placement="top"><i className="icon-feather-trash-2"></i></a>
        </div>
    </li>;
}

export default JobListing;
