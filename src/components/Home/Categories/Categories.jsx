import React, { useState, useEffect } from "react";
import Category from "./Category";
import { useGetPopularCategoriesQuery } from "../../../features/home/homeApiSlice";
import { useTranslation } from 'react-i18next';

import { fireCategoriesTr, fireDescriptionsTr } from "../../../utils/firebase.config";
import { selectCurrentLanguage } from "../../../features/auth/authSlice";
import { useSelector } from "react-redux";
 
const Categories = (props) => {
    const { t } = useTranslation();
    const lang = useSelector(selectCurrentLanguage);
    const [trCategoriesArr, setTrCategoriesArr] = useState(null);
    const [descriptionsArr, setDescriptionsArr] = useState(null);
    const { 
        data: popularCategories,
        //data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPopularCategoriesQuery();

    useEffect(() => {
        if (!isLoading) {
            fireCategoriesTr(setTrCategoriesArr);
            fireDescriptionsTr(setDescriptionsArr);
        }
    }, [isLoading]);

    return <div className="section margin-top-65">
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="section-headline centered margin-bottom-15">
                        <h3>{t('PopularJobCategories')}</h3>
                    </div>

                    <div className="categories-container">
                        {
                            !isLoading && popularCategories?.map((c) => {
                                let index = trCategoriesArr?.input?.indexOf(c.name);

                                let desc = null;
                                if (descriptionsArr && (c.name in descriptionsArr)) {
                                    desc = descriptionsArr[c.name][lang];                                 
                                }

                                return <Category key={c.id} {...c} 
                                name={trCategoriesArr?.translated ? trCategoriesArr.translated[index][lang] : c.name} defaultName={c.name}
                                description={desc} />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default Categories;