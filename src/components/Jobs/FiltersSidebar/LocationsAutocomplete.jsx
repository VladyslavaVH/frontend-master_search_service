import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncSelect from 'react-select/async';
import { LocationDropdownIndicator, LOCATION_AUTOCOMPLETE_STYLES } from '../../../animations/selectDetails';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from 'use-places-autocomplete';

const LocationsAutocomplete = ({ setCenter }) => {
    const { t } = useTranslation();
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
        clearCache
    } = usePlacesAutocomplete();
    const [locationPlaceholder, setLocationPlaceholder] = useState('Location');

    const handleInputChange = newTextValue => setValue(newTextValue);

    const handleSelect = async ({ value: place_id, label: address }) => {
        setLocationPlaceholder(address);
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address });
        const { lat, lng } = getLatLng(results[0]);

        console.log(`lat: ${lat} lng: ${lng}`);
        setCenter({ lat, lng });
    }

    const handleLoadOptions = async () => {
        return data.map(({ place_id, description }) => {
            return { value: place_id, label: description };
        });
    }

    return <AsyncSelect
        cacheOptions={true}
        loadOptions={handleLoadOptions}
        loadingMessage={() => `${t('Loading')}...`}
        value={value}
        onInputChange={handleInputChange}
        placeholder={locationPlaceholder === 'Location' ? t('Location') : locationPlaceholder}
        onChange={handleSelect}
        onFocus={() => setLocationPlaceholder('')}
        onBlur={() => {locationPlaceholder.length === 0 && setLocationPlaceholder( t('Location') )}}
        isDisabled={!ready}
        isLoading={!ready}
        onSelectResetsInput={false}
        onBlurResetsInput={false}
        inputId="location-input"
        components={{ DropdownIndicator: LocationDropdownIndicator }}
        isSearchable={true}
        isClearable={true}
        styles={LOCATION_AUTOCOMPLETE_STYLES}
        noOptionsMessage={() => "no locations"}
    />;
}

export default LocationsAutocomplete;
