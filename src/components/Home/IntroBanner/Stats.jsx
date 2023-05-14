import React, { useRef } from "react";
import { useCountUp } from 'react-countup';
import { useTranslation } from "react-i18next";

const Stats = ({ jobsCount, usersCount }) => {   
    const { t } = useTranslation();
    const parameters = { separator: ',', duration: 2 };
    const jobsCountRef = useRef(null);
    const usersCountRef = useRef(null);

    useCountUp({ ref: jobsCountRef, end: jobsCount, ...parameters });
    useCountUp({ ref: usersCountRef, end: usersCount, ...parameters });

    return <div className="row">
    <div className="col-md-12">
        <ul className="intro-stats margin-top-25 hide-under-992px">
            <li>
                <strong className="counter" ref={jobsCountRef}></strong>
                <span>{t('JobsPosted')}</span>
            </li>
            <li>
                <strong className="counter" ref={usersCountRef}></strong>
                <span>{t('Users')}</span>
            </li>
        </ul>
    </div>
</div>
};

export default Stats;
