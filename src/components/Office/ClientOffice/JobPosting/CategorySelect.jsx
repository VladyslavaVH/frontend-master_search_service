import React, { useState, useEffect } from 'react';
import { useGetOptionCategoriesQuery } from '../../../../features/details/detailsApiSlice';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { SINGLE_SELECT_STYLES, DropdownIndicator, Option } from '../../../../amimations/selectDetails';

const CategorySelect = ({ setCategoryFK }) => {
    const { t } = useTranslation();
    const { data: optionCategories, isLoading } = useGetOptionCategoriesQuery();
    const [categories, setOptionCategories] = useState([]);

    useEffect(() => {
        if (!isLoading) {
            setOptionCategories(optionCategories.map(c => { return { value: c.id, label: c.category } }));
        }
    }, [isLoading]);

    const handleChange = option => setCategoryFK(option.value);

    return <Select
    options={categories}
    defaultValue={{ value: 1, label: 'Plumbing' }}
    components={{
        DropdownIndicator,
        Option
    }}
    onChange={handleChange}
    placeholder={t(`SelectACategory`)}
    styles={SINGLE_SELECT_STYLES} />;
};

export default CategorySelect;
