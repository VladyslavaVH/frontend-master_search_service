import React, { useRef } from "react";
import { useCountUp } from 'react-countup';

const Stats = ({ jobsCount, mastersCount }) => {    
    const parameters = { separator: ',', duration: 2 };
    const jobsCountRef = useRef(null);
    const mastersCountRef = useRef(null);

    useCountUp({ ref: jobsCountRef, end: jobsCount, ...parameters });
    useCountUp({ ref: mastersCountRef, end: mastersCount, ...parameters });

    return <div className="row">
    <div className="col-md-12">
        <ul className="intro-stats margin-top-45 hide-under-992px">
            <li>
                <strong className="counter" ref={jobsCountRef}></strong>
                <span>Jobs Posted</span>
            </li>
            <li>
                <strong className="counter" ref={mastersCountRef}></strong>
                <span>Masters</span>
            </li>
        </ul>
    </div>
</div>
};

export default Stats;
