import React, { useEffect, useRef } from 'react';
import { funFacts } from "../../../amimations/amimations";
import { useCountUp } from 'react-countup';

const SiteStatistics = (props) => {
    const parameters = { separator: ',', duration: 2 };

    const countNewJobsRef = useRef(null);
    const countNewMastersRef = useRef(null);

    useCountUp({ ref: countNewJobsRef, end: 25, ...parameters });
    useCountUp({ ref: countNewMastersRef, end: 15, ...parameters });

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