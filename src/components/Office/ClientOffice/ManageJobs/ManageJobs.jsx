import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import JobListing from "./JobListing";
import { useGetJobListingByClientQuery } from "../../../../features/jobs/jobsApiSlice";
import { setCandidates } from "../../../../features/jobs/clientJobsSlice";

let ManageJobs = (props) => {
    // const jobs = [
    //     { id: 1, title: 'Frontend React Developer', createTime: 'Posted on 10 July, 2019', endDate: 'Expiring on 10 August, 2019', status: 'Pending Approval', candidatesCount: 0 },
    //     { id: 2, title: 'Full Stack PHP Developer', createTime: 'Posted on 28 June, 2019', endDate: 'Expiring on 28 July, 2019', status: 'Expiring', candidatesCount: 3 },
    //     { id: 3, title: 'Node.js Developer', createTime: 'Posted on 16 May, 2019', endDate: null, status: 'Expired', candidatesCount: 7 }
    // ];

    const { data, isLoading } = useGetJobListingByClientQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoading) {
            dispatch(setCandidates(data.candidates));
        }
    }, [isLoading]);

    return <div className="row">
        <div className="col-xl-12">
            <div className="dashboard-box margin-top-0">

                <div className="headline">
                    <h3><i className="icon-material-outline-business-center"></i> My Job Listings</h3>
                </div>

                <div className="content">
                    <ul className="dashboard-box-list">
                        {!isLoading && data?.jobs?.map(j => 
                            <JobListing key={j.id} {...j}
                            candidates={data?.candidates?.filter(c => c.jobFK === j.id)} />)}
                    </ul>
                </div>
            </div>
        </div>
    </div>;
};

export default ManageJobs;