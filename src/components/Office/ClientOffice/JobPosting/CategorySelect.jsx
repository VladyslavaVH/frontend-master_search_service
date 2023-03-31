import React, { useState, useEffect } from 'react';
import { useGetOptionCategoriesQuery } from '../../../../features/details/detailsApiSlice';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { SINGLE_SELECT_STYLES, DropdownIndicator, Option } from '../../../../amimations/selectDetails';
import { selectCurrentLanguage } from '../../../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { fireCategoriesTr } from '../../../../utils/firebase.config';

const CategorySelect = ({ setCategoryFK }) => {
    const { t } = useTranslation();
    const lang = useSelector(selectCurrentLanguage);
    const [trCategoriesArr, setTrCategoriesArr] = useState(null);
    const { data: optionCategories, isLoading } = useGetOptionCategoriesQuery();
    const [categories, setOptionCategories] = useState([]);

    useEffect(() => {
        if (!isLoading) {
            fireCategoriesTr(setTrCategoriesArr);
            //setOptionCategories(optionCategories.map(c => { return { value: c.id, label: c.category } }));
        }
    }, [isLoading]);

    useEffect(() => {
        if (trCategoriesArr) {
            let tmp = optionCategories.map(c => {
                let index = trCategoriesArr?.input?.indexOf(c.category);

                return { value: c.id, label: (trCategoriesArr?.translated && trCategoriesArr.translated[index]) ? trCategoriesArr.translated[index][lang] : c.category }
            });

            setOptionCategories(tmp);
        }
    }, [trCategoriesArr, lang]);

    const handleChange = option => setCategoryFK(option.value);

    return <Select
    options={categories}
    //defaultValue={defaultValue}
    components={{
        DropdownIndicator,
        Option
    }}
    onChange={handleChange}
    placeholder={t(`SelectACategory`)}
    styles={SINGLE_SELECT_STYLES} />;
};

export default CategorySelect;
