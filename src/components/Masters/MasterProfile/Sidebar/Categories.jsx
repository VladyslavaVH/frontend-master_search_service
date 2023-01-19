import React from 'react';
import { useGetMasterCategoriesQuery } from '../../../../features/masters/mastersApiSlice';

const Categories = ({ masterId }) => {
    const { data: categories, isLoading } = useGetMasterCategoriesQuery(masterId);
    return <div className="sidebar-widget">
        <h3>Categories</h3>
        <div className="task-tags">
            {
                !isLoading &&
                categories?.map(c => <span key={c.categoryFK}>{c.category}</span>)
            }
        </div>
    </div>;
}

export default Categories;
