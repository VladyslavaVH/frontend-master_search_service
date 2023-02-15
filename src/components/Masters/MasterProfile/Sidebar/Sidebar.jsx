import React, { useEffect } from 'react';
import { useGetRehiredJobCountQuery } from '../../../../features/masters/mastersApiSlice';
import Categories from './Categories';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ jobsDoneCount, masterId }) => {
    const { t } = useTranslation();
    const { data, isLoading } = useGetRehiredJobCountQuery(masterId);

    return <div className="col-xl-4 col-lg-4">
        <div className="sidebar-container">

            <div className="profile-overview">
                <div className="overview-item"><strong>{jobsDoneCount}</strong><span>{t("JobsDone")}</span></div>
                {!isLoading && <div className="overview-item"><strong>{data.rehired}</strong><span>{t("Rehired")}</span></div>}
            </div>

            <Categories masterId={masterId} />
        </div>
    </div>;
}

export default Sidebar;
