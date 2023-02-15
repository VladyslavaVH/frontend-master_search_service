import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { SINGLE_SELECT_STYLES, DropdownIndicator, Option } from '../../../amimations/selectDetails';
import optionNationalities from './nationalities';

const NationalitySelect = ({ setNationality }) => {
    const { t } = useTranslation();
    const [nationalities, setOptionNationalities] = useState(optionNationalities);

    const handleChange = option => setNationality(option.value);

    return <Select
    options={nationalities}
    defaultValue={{ value: 'UA', label: 'Ukraine' }}
    components={{
        DropdownIndicator,
        Option
    }}
    onChange={handleChange}
    placeholder={t(`SelectANationality`)}
    styles={SINGLE_SELECT_STYLES} />;
};

export default NationalitySelect;
