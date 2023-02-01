import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import PlacesAutocomplete from "react-places-autocomplete";
import { useTranslation } from "react-i18next";

const SearchBar = ({isMapApiLoaded}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [where, setWhere] = useState('');
    const [job, setJob] = useState('');

    function initAutocomplete() {
        // var options = {
        //  types: ['(cities)'],
        //  // componentRestrictions: {country: "us"}
        // };

        // var input = document.getElementById('autocomplete-input');
        // var autocomplete = new google.maps.places.Autocomplete(input, options);
    }

    useEffect(() => {


        //    // Autocomplete adjustment for homepage
        //    if ($('.intro-banner-search-form')[0]) {
        //        setTimeout(function(){ 
        //            $(".pac-container").prependTo(".intro-search-field.with-autocomplete");
        //        }, 300);
        //   }
    }, []);

    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    });

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const ll = await getLatLng(results[0]);
        console.log(ll);

        setAddress(value);
        setCoordinates(ll);
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
                            <label htmlFor="autocomplete-input" className="field-title ripple-effect">Where?</label>
                            <div className="input-with-icon">
                                <input id="autocomplete-input" type="text"
                                    {...getInputProps({
                                        placeholder: 'Place',
                                        // className: 'location-search-input',
                                    })} />
                                <i className="icon-material-outline-location-on"></i>
                            </div>

                            <ul className="autocomplete-dropdown-container">
                                {loading && <li style={{ backgroundColor: '#ffffff', cursor: 'pointer', textAlign: 'center'}}>Loading...</li>}
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
                    <input id="intro-keywords" type="text" placeholder={t('JobTitle')} onChange={(e) => setJob(e.target.value)} />
                    <ul id="intro-keywords-dropdown" className="autocomplete-dropdown-container"></ul>
                </div>

                {/* <!-- Button --> */}
                <div className="intro-search-button">
                    <button className="button ripple-effect" 
                    onClick={() => { navigate(`/jobs?${job ? `title=${job}&` : ''}`, 
                    { state: {
                        title: job
                     } }) }}>{t('Search')}</button>
                </div>
            </div>
        </div>
    </div>;
}

export default SearchBar;
