import React, { useState, useEffect } from "react";
import JobListItem from "../Jobs/JobListItem";
import { NavLink } from 'react-router-dom';
import { useGetRecentJobsListQuery } from "../../features/home/homeApiSlice";
import { useTranslation } from "react-i18next";
import { selectCurrentLanguage, selectIsAuth, selectIsMaster } from "../../features/auth/authSlice";
import { useSelector } from 'react-redux';
import { fireCategoriesTr } from '../../utils/firebase.config';

const RecentJobsList = (props) => {
    const { t } = useTranslation();
    const lang = useSelector(selectCurrentLanguage);
    const [trCategoriesArr, setTrCategoriesArr] = useState(null);
    const isAuth = useSelector(selectIsAuth);
    const isMaster = useSelector(selectIsMaster);
    const { 
        data: jobs,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetRecentJobsListQuery();

    useEffect(() => {
        if (!isLoading) {
            fireCategoriesTr(setTrCategoriesArr); 
        }
    }, [isLoading]);

    return <div className="section gray margin-top-45 padding-top-65 padding-bottom-65">
        <div className="container">
            <div className="row">
                <div className="col-xl-12">

                    <div className="section-headline margin-top-0 margin-bottom-35">
                        <h3>{t('RecentJobs')}</h3>
                        {isAuth && isMaster && <NavLink to={`/jobs`} className="headline-link">{t('BrowseAllJobs')}</NavLink>}
                    </div>

                    <div className="listings-container compact-list-layout margin-top-35">
                        {
                            !isLoading && jobs?.map((j) => {
                                let index = trCategoriesArr?.input?.indexOf(j.category);

                                return <JobListItem key={j.id} {...j}
                                category={trCategoriesArr?.translated ? trCategoriesArr.translated[index][lang] : j.category}
                                isHomePage={true} />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default RecentJobsList;