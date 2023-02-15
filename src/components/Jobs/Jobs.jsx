import React, { useEffect, useState } from "react";
import { useGetAllJobsListQuery } from "../../features/jobs/jobsApiSlice";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import OfficeFooter from "../Office/OfficeFooter";
import FiltersSidebar from "./FiltersSidebar/FiltersSidebar";

import JobListItem from "./JobListItem";
import Map from "./Map";
import Pagination from "./Pagination";
import { useTranslation } from 'react-i18next';

let Jobs = ({ isMapApiLoaded }) => {
	// const [center, setCenter] = useState({ 
	// 	lat: 46.399904,   
	// 	lng: 30.732074,
	// });
	const { t } = useTranslation();
	const location = useLocation();
	const { categoryId, title: category, pos, masterCategories } = location?.state || {};
	const [center, setCenter] = useState(pos);
    const [bounds, setBounds] = useState(null);
	const [mapZoom] = useState(13);
	const [page, setPage] = useState(1);
	const [categories, setCategories] = useState(categoryId ? [categoryId] : []);
	//const [categories, setCategories] = useState(masterCategories ? masterCategories : categoryId ? [categoryId] : []);
	const [payment, setPayment] = useState({ minPayment: 100, maxPayment: 1000 });
	const { data, isLoading } = 
		useGetAllJobsListQuery(bounds ? { page, bounds, categories, payment, title: category } : skipToken);
	const { jobs, total, lastPage } = data || {};

	useEffect(() => {
		if(!isLoading && data) {
			setPage(data.page);
		}
	}, [isLoading]);
	
	useEffect(() => {
		window.scrollTo(0, 0);

		if (!pos) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
					const pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					};
			
					setCenter(pos);
					},
					() => {
					alert('Error: Geolocation failed');
					}
				);
			} else {
				// Browser doesn't support Geolocation
				alert(`Browser doesn't support Geolocation`);
			}
		}
	}, []);

    return <div className="full-page-container with-map" style={{ maxHeight: '95vh'}}>

	<FiltersSidebar payment={payment} setPayment={setPayment} setCategories={setCategories} defaultCategory={categories[0]} setCenter={setCenter} isMapApiLoaded={isMapApiLoaded} />	

	<div style={{ maxHeight: '95vh' }} className="full-page-content-container">{/*data-simplebar*/}
		<div className="full-page-content-inner">

			<h3 className="page-title">{t('SearchResults')}</h3>

			<div className="listings-container compact-list-layout margin-top-35 margin-bottom-25">

				{!isLoading &&
					jobs?.map(j => <JobListItem
						key={j.id}
						{...j}
						isHomePage={false} />)
				}{/*single-job-html href on click*/}

			</div>

			<div className="clearfix"></div>
			<Pagination total={total} setPage={setPage} currentPage={page} lastPage={lastPage} />
			<div className="clearfix"></div>

			<OfficeFooter />

		</div>
	</div>

	<div style={{ maxHeight: '95vh' }} className="full-page-map-container">
		
		<div className="filter-button-container">
			<button className="enable-filters-button">
				<i className="enable-filters-button-icon"></i>
				<span className="show-text">{t('ShowFilters')}</span>
				<span className="hide-text">{t('HideFilters')}</span>
			</button>
			<div className="filter-button-tooltip">{t('ClickToExpandSidebarWithFilters')}</div>
		</div>
		
		{
			(center && !isLoading) &&
			<Map
				jobs={jobs}
				mapZoom={mapZoom}
				setBounds={setBounds}
				bounds={bounds}
				center={center}
				isMapApiLoaded={isMapApiLoaded} />
		}
	</div>
</div>;
};

export default Jobs;