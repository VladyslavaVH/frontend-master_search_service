import React, { useState, useEffect } from 'react';
import { useGetOptionCategoriesQuery } from '../../../features/details/detailsApiSlice';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { CATEGORY_SELECT_STYLES, DropdownIndicator, Option, ValueContainer } from '../../../amimations/selectDetails';
import { selectCurrentLanguage } from '../../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { fireCategoriesTr } from '../../../utils/firebase.config';

const CategoryMultiSelect = ({ defaultCategory, setCategories }) => {
    const { t } = useTranslation();
    const lang = useSelector(selectCurrentLanguage);
    const [trCategoriesArr, setTrCategoriesArr] = useState(null);
    const { data: optionCategories, isLoading } = useGetOptionCategoriesQuery();
    const [categories, setOptionCategories] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [optionPlaceholder, setOptionPlaceholder] = useState('SelectACategory');

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
                return { value: c.id, label: trCategoriesArr?.translated ? trCategoriesArr.translated[index][lang] : c.category }
            });

            setOptionCategories(tmp);
        }
    }, [trCategoriesArr, lang]);

    const handleChange = options => setSelectedOptions(options);

    useEffect(() => {
        if (selectedOptions.length > 0) {
            let tmpString = `${selectedOptions.length} ${t('itemsSelected')}`;
            setOptionPlaceholder(tmpString);

            let tmpArray = [];
            for (const option of selectedOptions) {
                tmpArray.push(option.value);
            }

            setCategories(tmpArray);

        } else {
            setOptionPlaceholder('SelectACategory');
        }
    }, [selectedOptions]);

    return <Select
        //defaultValue={{ value: 1, label: 'Plumbing' }}        
        components={{ DropdownIndicator, ValueContainer, Option }}
        isMulti
        onChange={handleChange}
        closeMenuOnSelect={false}
        placeholder={optionPlaceholder === 'SelectACategory' ? t('SelectACategory') : optionPlaceholder}
        isClearable={false}
        hideSelectedOptions={false}
        styles={CATEGORY_SELECT_STYLES}
        options={categories}
    />;
};

export default CategoryMultiSelect;
