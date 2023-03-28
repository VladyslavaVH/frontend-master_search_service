import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import JobListing from "./JobListing";
import { useGetJobListingByClientQuery } from "../../../../features/jobs/jobsApiSlice";
import { setCandidates } from "../../../../features/jobs/clientJobsSlice";
import { useTranslation } from 'react-i18next';
import { selectCurrentLanguage } from "../../../../features/auth/authSlice";
import { useSelector } from 'react-redux';
import { fireCategoriesTr } from '../../../../utils/firebase.config';

let ManageJobs = (props) => {
    const { t } = useTranslation();
    const lang = useSelector(selectCurrentLanguage);
    const [trCategoriesArr, setTrCategoriesArr] = useState(null);

    const { data, isLoading } = useGetJobListingByClientQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoading) {
            fireCategoriesTr(setTrCategoriesArr); 
            dispatch(setCandidates(data.candidates));
        }
    }, [isLoading, data?.candidates]);

    return <div className="row">
        <div className="col-xl-12">
            <div className="dashboard-box margin-top-0">

                <div className="headline">
                    <h3><i className="icon-material-outline-business-center"></i> {t('MyJobListing')}</h3>
                </div>

                <div className="content">
                    <ul className="dashboard-box-list">
                        {!isLoading && data?.jobs?.map(j => {
                            let index = trCategoriesArr?.input?.indexOf(j.category);
                            
                            return <JobListing key={j.id} {...j}
                            category={trCategoriesArr?.translated ? trCategoriesArr.translated[index][lang] : j.category}
                            defaultCategoryName={j.category}
                            candidates={data?.candidates?.filter(c => c.jobFK === j.id)} />
                        })}
                    </ul>
                </div>
            </div>
        </div>
    </div>;
};

export default ManageJobs;