import React, { useEffect } from 'react';
import { useGetRehiredJobCountQuery } from '../../../../features/masters/mastersApiSlice';
import Categories from './Categories';

const Sidebar = ({ jobsDoneCount, masterId }) => {
    const { data, isLoading } = useGetRehiredJobCountQuery(masterId);

    return <div className="col-xl-4 col-lg-4">
        <div className="sidebar-container">

            <div className="profile-overview">
                <div className="overview-item"><strong>{jobsDoneCount}</strong><span>Jobs Done</span></div>
                {!isLoading && <div className="overview-item"><strong>{data.rehired}</strong><span>Rehired</span></div>}
            </div>

            <Categories masterId={masterId} />
        </div>
    </div>;
}

export default Sidebar;
