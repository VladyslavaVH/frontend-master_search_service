import React, { useState, useEffect } from 'react';
import { useGetMasterCategoriesQuery } from '../../../../features/masters/mastersApiSlice';
import { useTranslation } from 'react-i18next';
import { selectCurrentLanguage } from '../../../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { fireCategoriesTr } from '../../../../utils/firebase.config';

const Categories = ({ masterId }) => {
    const { t } = useTranslation();
    const lang = useSelector(selectCurrentLanguage);
    const [trCategoriesArr, setTrCategoriesArr] = useState(null);
    const [translatedCategories, setTranslatedCategories] = useState(null);
    const { data: categories, isLoading } = useGetMasterCategoriesQuery(masterId);

    useEffect(() => {
        if (!isLoading) {
            fireCategoriesTr(setTrCategoriesArr); 
        }
    }, [isLoading]);

    useEffect(() => {
        if (trCategoriesArr) {
            let tmp = [];
            for (const c of categories) {
                let index = trCategoriesArr?.input?.indexOf(c.category);
                tmp.push({ categoryFK: c.categoryFK, category: trCategoriesArr?.translated ? trCategoriesArr.translated[index][lang] : c.category })
            }

            setTranslatedCategories(tmp);
        }
    }, [trCategoriesArr, lang]);

    return <div className="sidebar-widget">
        <h3>{t("Categories")}</h3>
        <div className="task-tags">
            {
                !isLoading &&
                translatedCategories?.map(c => <span key={c.categoryFK}>{c.category}</span>)
            }
        </div>
    </div>;
}

export default Categories;
