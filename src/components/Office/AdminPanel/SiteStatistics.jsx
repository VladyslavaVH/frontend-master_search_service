import React, { useEffect, useRef } from 'react';
import { funFacts } from "../../../amimations/amimations";
import { useCountUp } from 'react-countup';
import { useGetAdminPanelQuery } from '../../../features/admin/adminApiSlice';

const SiteStatistics = (props) => {
    const { data: statistics, isLoading } = useGetAdminPanelQuery();
    const { newJobs, newMasters } = statistics || { newJobs: 0, newMasters: 0 };
    const parameters = { separator: ',', duration: 2 };

    const countNewJobsRef = useRef(null);
    const countNewMastersRef = useRef(null);

    const { start: startNewJobs } = useCountUp({ ref: countNewJobsRef, end: newJobs, ...parameters });
    const { start: startNewMasters } = useCountUp({ ref: countNewMastersRef, end: newMasters, ...parameters });

    useEffect(() => {
        if (!isLoading) {
            startNewJobs();
            startNewMasters();
        }
    }, [isLoading]);


    useEffect(() => {
        funFacts();
    }, []);

    return <div className="fun-facts-container">
        <div className="fun-fact" data-fun-fact-color="#2a41e8">
            <div className="fun-fact-text">
                <span>New Jobs</span>
                <h4 ref={countNewJobsRef}></h4>
            </div>
            <div className="fun-fact-icon"><i className="icon-material-outline-assignment"></i></div>
        </div>
        <div className="fun-fact" data-fun-fact-color="#b81b7f">
            <div className="fun-fact-text">
                <span>New Masters</span>
                <h4 ref={countNewMastersRef}></h4>
            </div>
            <div className="fun-fact-icon"><i className="icon-material-outline-business-center"></i></div>{/*icon-line-awesome-money  icon-material-outline-local-atm*/}
        </div>
    </div>;
};

export default SiteStatistics;