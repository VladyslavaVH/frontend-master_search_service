import React from "react";
import JobListItem from "../Jobs/JobListItem";
import { NavLink } from 'react-router-dom';
import { useGetRecentJobsListQuery } from "../../features/home/homeApiSlice";

const RecentJobsList = (props) => {
    const { 
        data: jobs,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetRecentJobsListQuery();

    return <div className="section gray margin-top-45 padding-top-65 padding-bottom-65">
        <div className="container">
            <div className="row">
                <div className="col-xl-12">

                    <div className="section-headline margin-top-0 margin-bottom-35">
                        <h3>Recent jobs</h3>
                        <NavLink to={`/jobs`} className="headline-link">Browse All Jobs</NavLink>
                    </div>

                    <div className="listings-container compact-list-layout margin-top-35">
                        {
                            !isLoading && jobs?.map((j) => 
                            <JobListItem key={j.id} {...j}
                             isHomePage={true} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default RecentJobsList;