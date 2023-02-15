import React, { useState, useEffect } from "react";
import $ from 'jquery';
import { useTranslation } from 'react-i18next';
import LocationsAutocomplete from "./LocationsAutocomplete";
import CategoryMultiSelect from "./CategoryMultiSelect";
import MultiRangePriceSlider from "./MultiRangePriceSlider/MultiRangePriceSlider";

const FiltersSidebar = ({ payment, setPayment, setCategories, defaultCategory, setCenter, isMapApiLoaded }) => {
    const { t } = useTranslation();

    useEffect(() => {
        // Sliding Sidebar 
		$('.enable-filters-button').on('click', function () {
			$('.full-page-sidebar').toggleClass("enabled-sidebar");
			$(this).toggleClass("active");
			$('.filter-button-tooltip').removeClass('tooltip-visible');
		});

		/*  Enable Filters Button Tooltip */
		$(window).on('load', function () {
			$('.filter-button-tooltip').css({
				left: $('.enable-filters-button').outerWidth() + 48
			}).addClass('tooltip-visible');
		});
    }, []);

    return <div className="full-page-sidebar hidden-sidebar">
    <div className="full-page-sidebar-inner">{/*data-simplebar*/}

        <div className="sidebar-container">

            <div className="sidebar-widget">
                <h3>{t('Location')}</h3>
                <LocationsAutocomplete setCenter={setCenter} isMapApiLoaded={isMapApiLoaded} />
            </div>
            
            <div className="sidebar-widget">
                <h3>{t('Category')}</h3>
                <CategoryMultiSelect defaultCategory={defaultCategory} setCategories={setCategories} />
            </div>
            
            <div className="sidebar-widget">
                <h3>{t('Payment')}</h3>
                <div className="margin-top-55"></div>

                <MultiRangePriceSlider payment={payment} setPayment={setPayment} min={100} max={1000} />
            </div>

        </div>
        {/* <!-- Sidebar Container / End --> */}

        {/* <div className="sidebar-search-button-container">
            <button className="button ripple-effect">Search</button>
        </div> */}

    </div>
</div>;
};

export default FiltersSidebar;