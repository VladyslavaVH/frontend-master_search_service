import React, { useState, useEffect } from 'react';
import { useGetOptionCategoriesQuery } from '../../../features/details/detailsApiSlice';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { CATEGORY_SELECT_STYLES, DropdownIndicator, Option, ValueContainer } from '../../../amimations/selectDetails';

const CategoryMultiSelect = ({ defaultCategory, setCategories }) => {
    const { t } = useTranslation();
    const { data: optionCategories, isLoading } = useGetOptionCategoriesQuery();
    const [categories, setOptionCategories] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [optionPlaceholder, setOptionPlaceholder] = useState(t('SelectACategory'));

    useEffect(() => {
        if (!isLoading) {
            setOptionCategories(optionCategories.map(c => { return { value: c.id, label: c.category } }));
        }
    }, [isLoading]);

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
            setOptionPlaceholder(t('SelectACategory'));
        }
    }, [selectedOptions]);

    return <Select
        //defaultValue={{ value: 1, label: 'Plumbing' }}        
        components={{ DropdownIndicator, ValueContainer, Option }}
        isMulti
        onChange={handleChange}
        closeMenuOnSelect={false}
        placeholder={optionPlaceholder}
        isClearable={false}
        hideSelectedOptions={false}
        styles={CATEGORY_SELECT_STYLES}
        options={categories}
    />;
};

export default CategoryMultiSelect;
