import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import PlacesAutocomplete from "react-places-autocomplete";
import { useTranslation } from "react-i18next";
import NotificationDialog from "../../HeaderContainer/Popup/NotificationDialog";

const SearchBar = ({isMapApiLoaded}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');
    const [job, setJob] = useState('');

    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    });

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latlng = await getLatLng(results[0]);

        setAddress(value);
        setCoordinates(latlng);
    };

    const onSearchBtnClick = () => {
        if (address?.length > 0 && coordinates.lat && coordinates.lng) {
            navigate(`/jobs/${job}`, { 
                state: {
                    title: job,
                    pos: {...coordinates}
                }
            });
        } else {
            setText('EmptyAddress');
            setIsOpen(true);
        }
        
    };

    return <div className="row">
        <div className="col-md-12">
            <div className="intro-banner-search-form margin-top-95">

                {/* <!-- Search Field --> */}

                {/* <div className="intro-search-field with-autocomplete">
                    <label htmlFor="autocomplete-input" className="field-title ripple-effect">{t('Where')}</label>
                    <div className="input-with-icon">
                        <input id="autocomplete-input" type="text" placeholder={t('Place')} />
                        <i className="icon-material-outline-location-on"></i>
                    </div>
                </div>  */}

                {isMapApiLoaded && <PlacesAutocomplete
                    value={address}
                    onChange={setAddress}
                    onSelect={handleSelect}>
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div className="intro-search-field with-autocomplete">
                            <label htmlFor="autocomplete-input" className="field-title ripple-effect">{t("Where")}</label>
                            <div className="input-with-icon">
                                <input id="autocomplete-input" type="text"
                                    {...getInputProps({
                                        placeholder: t('Place'),
                                        // className: 'location-search-input',
                                    })} />
                                <i className="icon-material-outline-location-on"></i>
                            </div>

                            <ul className="autocomplete-dropdown-container">
                                {loading && <li style={{ backgroundColor: '#ffffff', cursor: 'pointer', textAlign: 'center'}}>{t('Loading')}...</li>}
                                {suggestions.map((suggestion, i) => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <li key={i}
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>)}
                </PlacesAutocomplete>}

                {/* <!-- Search Field --> */}
                <div className="intro-search-field">
                    <label htmlFor="intro-keywords" className="field-title ripple-effect">{t('WhatJobYouWant')}</label>
                    <input id="intro-keywords" type="text" placeholder={t('Category')} onChange={(e) => setJob(e.target.value)} autoComplete="off" />
                    <ul id="intro-keywords-dropdown" className="autocomplete-dropdown-container"></ul>
                </div>

                {/* <!-- Button --> */}
                <div className="intro-search-button">
                    <button className="button ripple-effect" 
                    onClick={onSearchBtnClick}>{t('Search')}</button>
                </div>
            </div>
        </div>

        <NotificationDialog type="warning" open={isOpen} onClose={() => setIsOpen(false)}>
            {t(text)}
        </NotificationDialog>
    </div>;
}

export default SearchBar;
