import React from 'react';
import { useGetMasterCategoriesQuery } from '../../../../features/masters/mastersApiSlice';
import { useTranslation } from 'react-i18next';

const Categories = ({ masterId }) => {
    const { t } = useTranslation();
    const { data: categories, isLoading } = useGetMasterCategoriesQuery(masterId);
    return <div className="sidebar-widget">
        <h3>{t("Categories")}</h3>
        <div className="task-tags">
            {
                !isLoading &&
                categories?.map(c => <span key={c.categoryFK}>{c.category}</span>)
            }
        </div>
    </div>;
}

export default Categories;
