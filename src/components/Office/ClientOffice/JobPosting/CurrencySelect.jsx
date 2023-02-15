import React, { useState, useEffect } from 'react';
import { useGetOptionCurrenciesQuery } from '../../../../features/details/detailsApiSlice';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { SINGLE_SELECT_STYLES, DropdownIndicator, Option } from '../../../../amimations/selectDetails';

const CurrencySelect = ({ setCurrencyFK }) => {
    const { t } = useTranslation();
    const { data: optionCurrencies, isLoading } = useGetOptionCurrenciesQuery();
    const [currencies, setOptionCurrencies] = useState([]);

    useEffect(() => {
        if (!isLoading) {
            setOptionCurrencies(optionCurrencies.map(c => { return { value: c.id, label: c.currency } }));
        }
    }, [isLoading]);

    const handleChange = option => setCurrencyFK(option.value);

    return <Select
    options={currencies}
    defaultValue={{ value: 1, label: 'USD' }}
    components={{
        DropdownIndicator,
        Option
    }}
    onChange={handleChange}
    placeholder={t(`SelectACurrency`)}
    styles={SINGLE_SELECT_STYLES} />;
};

export default CurrencySelect;
