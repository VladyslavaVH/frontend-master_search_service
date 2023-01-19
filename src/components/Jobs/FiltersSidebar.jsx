import React, { useEffect } from "react";
import SimpleBar from "simplebar-react";
import $ from 'jquery';
import 'bootstrap-select';

const SCROLLBAR_STYLES = {
    
};

const FiltersSidebar = (props) => {
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

        $('.selectpicker').selectpicker();
    }, []);

    return <div className="full-page-sidebar hidden-sidebar">
    <div className="full-page-sidebar-inner">{/*data-simplebar*/}

        <div className="sidebar-container">

            <div className="sidebar-widget">
                <h3>Location</h3>
                <div className="input-with-icon">
                    <div id="autocomplete-container">
                        <input id="autocomplete-input" type="text" placeholder="Location" />
                    </div>
                    <i className="icon-material-outline-location-on"></i>
                </div>
            </div>
            
            {/* <!-- Category --> */}
            <div className="sidebar-widget">
                <h3>Category</h3>
                {/*className="selectpicker default"*/}
                {/* <select className="" multiple data-selected-text-format="count" data-size="7" title="All Categories" > */}
                <select title="All Categories" >
                    <option>Admin Support</option>
                    <option>Customer Service</option>
                    <option>Data Analytics</option>
                    <option>Design & Creative</option>
                    <option>Legal</option>
                    <option>Software Developing</option>
                    <option>IT & Networking</option>
                    <option>Writing</option>
                    <option>Translation</option>
                    <option>Sales & Marketing</option>
                </select>
            </div>
            
            {/* <!-- Salary --> */}
            <div className="sidebar-widget">
                <h3>Salary</h3>
                <div className="margin-top-55"></div>

                {/* <!-- Range Slider --> */}
                {/* <input onChange={() => console.log('change')}
                className="range-slider" type="text" value="" data-slider-currency="$" data-slider-min="1500" data-slider-max="15000" data-slider-step="100" data-slider-value="[1500,15000]"/> */}

                <input type="range" />
            </div>

        </div>
        {/* <!-- Sidebar Container / End --> */}

        {/* <!-- Search Button --> */}
        <div className="sidebar-search-button-container">
            <button className="button ripple-effect">Search</button>
        </div>
        {/* <!-- Search Button / End--> */}

    </div>
</div>;
};

export default FiltersSidebar;