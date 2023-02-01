import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useGetAllJobsListQuery } from "../../features/jobs/jobsApiSlice";
import $ from 'jquery';
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import OfficeFooter from "../Office/OfficeFooter";
import SimpleBar from 'simplebar-react';
import FiltersSidebar from "./FiltersSidebar";
import { GoogleMapProvider } from '@ubilabs/google-maps-react-hooks';
import { MarkerClusterer } from "@googlemaps/markerclusterer";

import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import JobListItem from "./JobListItem";
import locations from '../../data/test_locations';
import Map from "./Map";

let Jobs = (props) => {
	const { category } = useParams();
	const location = useLocation();
	const { data: jobs, isLoading } = 
	useGetAllJobsListQuery(location.state?.title, category);
	
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_KEY,
	});
	
	const [center, setCenter] = useState({ lat: 37.754929, lng: -122.429416 });

	useEffect(() => {
		window.scrollTo(0, 0);
		
		if (navigator.geolocation) {
			    navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setCenter({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    });
		}
	}, []);

    return <div className="full-page-container with-map" style={{ maxHeight: '100vh' }}>

	<FiltersSidebar />
	

	<div className="full-page-content-container">{/*data-simplebar*/}
		<div className="full-page-content-inner">

			<h3 className="page-title">Search Results</h3>

			<div className="listings-container compact-list-layout margin-top-35 margin-bottom-25">

				{!isLoading &&
					jobs?.map(j => <JobListItem
						key={j.id}
						{...j}
						isHomePage={false} />)
				}{/*single-job-html href on click*/}

			</div>

			{/* <!-- Pagination --> */}
			<div className="clearfix"></div>
			<div className="pagination-container margin-top-20 margin-bottom-20">
				<nav className="pagination">
					<ul>
						<li className="pagination-arrow"><a href="#" className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-left"></i></a></li>
						<li><a href="#" className="ripple-effect">1</a></li>
						<li><a href="#" className="ripple-effect current-page">2</a></li>
						<li><a href="#" className="ripple-effect">3</a></li>
						<li><a href="#" className="ripple-effect">4</a></li>
						<li className="pagination-arrow"><a href="#" className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-right"></i></a></li>
					</ul>
				</nav>
			</div>
			<div className="clearfix"></div>
			{/* <!-- Pagination / End --> */}

			<OfficeFooter />

		</div>
	</div>

	<div className="full-page-map-container">
		
		<div className="filter-button-container">
			<button className="enable-filters-button">
				<i className="enable-filters-button-icon"></i>
				<span className="show-text">Show Filters</span>
				<span className="hide-text">Hide Filters</span>
			</button>
			<div className="filter-button-tooltip">Click to expand sidebar with filters!</div>
		</div>
		
		{/* <!-- Map --> */}
		{!isLoaded && <div>Loading...</div>}
		{/* <GoogleMap id="map" zoom={12} center={center}
		mapTypeId={'roadmap'} streetView={true}>
			{
				locations?.map(l =>
					<MarkerF position={{ lat: l.lat, lng: l.lng }} />)
			}
		</GoogleMap> */}
		<Map />
	</div>
</div>;
};

export default Jobs;