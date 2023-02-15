import React, { useEffect, useState } from "react";
import Candidate from './Candidate';
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllCandidatesByClientQuery, useGetMasterByIdQuery } from "../../../../features/masters/mastersApiSlice";
import { useTranslation } from 'react-i18next';

const ManageCandidates = (props) => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const { data, isLoading } = useGetAllCandidatesByClientQuery(location.state.id);
    const { data: confirmedMaster } = useGetMasterByIdQuery(location.state.masterId);

    useEffect(() => {
        if (!isLoading) {
            console.log(location.state);
            console.log(location.state.masterId);
            console.log(confirmedMaster);

            let tmpArr = [];
            for (const c of data?.candidates) {
                let rating = data?.allMastersRating?.find(el => el.masterFK === c.id)?.rating;
                
                if (c.jobFK === location.state.id) tmpArr.push({...c, rating});
            }

            setCandidates(tmpArr);

            if (tmpArr.length === 0) {
                navigate(-1);
            }
        }
    }, [isLoading]);

    return <div className="row">
        <div className="col-xl-12">
            <div className="dashboard-box margin-top-0">
                <div className="headline">
                    <h3>
                        {(location.state.masterId)
                            ?<>
                                <i className="icon-feather-user-check"></i>
                                {t('ConfirmedMaster')}
                            </>
                            :<>
                                <i className="icon-material-outline-supervisor-account"></i>
                                {candidates?.length} {t('Candidate.part1')}{candidates?.length > 1 && t('Candidate.part2')}
                            </>
                        }
                    </h3>
                </div>

                <div className="content">
                    <ul className="dashboard-box-list">
                        {
                            !isLoading &&
                            candidates?.map((c, i) => <Candidate key={i} {...c} />)
                        }
                    </ul>
                </div>
            </div>
        </div>
    </div>;
}

export default ManageCandidates;