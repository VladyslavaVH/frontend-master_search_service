import React, { useEffect, useState } from "react";
import { useGetAllJobsListQuery } from "../../features/jobs/jobsApiSlice";
import { useLocation } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import OfficeFooter from "../Office/OfficeFooter";
import FiltersSidebar from "./FiltersSidebar/FiltersSidebar";
import JobListItem from "./JobListItem";
import Map from "./Map";
import Pagination from "./Pagination";
import { useTranslation } from 'react-i18next';
import { fireCategoriesTr } from '../../utils/firebase.config';
import { selectCurrentLanguage } from "../../features/auth/authSlice";
import { useSelector } from 'react-redux';
import NotificationDialog from "../HeaderContainer/Popup/NotificationDialog";
import PermissionRequest from "./PermissionRequest";

let Jobs = ({ isMapApiLoaded }) => {
	const { t } = useTranslation();
	const lang = useSelector(selectCurrentLanguage);
	const [trCategoriesArr, setTrCategoriesArr] = useState(null);
	const location = useLocation();
	const { categoryId, title: category, pos, masterCategories, masterPos, defaultCenter } = location?.state || {};
	const [center, setCenter] = useState(pos);
	const [masterCoordinates, setMasterCoordinates] = useState(null);
    const [bounds, setBounds] = useState(null);
	const [mapZoom] = useState(11);
	const [page, setPage] = useState(1);
	const [categories, setCategories] = useState(categoryId ? [categoryId] : []);
	//const [categories, setCategories] = useState(masterCategories ? masterCategories : categoryId ? [categoryId] : []);
	const [payment, setPayment] = useState({ minPayment: 100, maxPayment: 1000 });
	const { data, isLoading } = 
		useGetAllJobsListQuery(bounds ? { page, bounds, categories, payment, title: category } : skipToken);
	const { jobs, total, lastPage } = data || {};

	const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationText, setNotificationText] = useState('');
    const [start, setStartPermissionRequest] = useState(false);
    const [activeTab, setActiveTab] = useState(undefined);
	
	useEffect(() => {
		if(!isLoading && data) {
			setPage(data.page);
			fireCategoriesTr(setTrCategoriesArr); 
		}
	}, [isLoading]);

	useEffect(() => {
		window.scrollTo(0, 0);
		
		if (!pos) {
			setCenter(masterPos);
			if (!defaultCenter) {
				setMasterCoordinates(masterPos)
			}
		}
	}, [pos, masterPos]);

    return <div className="full-page-container with-map" style={{ maxHeight: '95vh'}}>

	<FiltersSidebar  payment={payment} setPayment={setPayment} setCategories={setCategories} defaultCategory={categories[0]} setCenter={setCenter} isMapApiLoaded={isMapApiLoaded} />	

	<div style={{ maxHeight: '95vh' }} className="full-page-content-container">{/*data-simplebar*/}
		<div className="full-page-content-inner">

			<h3 className="page-title">{t('SearchResults')}</h3>

			<div className="listings-container compact-list-layout margin-top-35 margin-bottom-25">

				{!isLoading &&
					jobs?.map(j => {
						let index = trCategoriesArr?.input?.indexOf(j.category);
						return <JobListItem
							key={j.id}
							{...j}
							setActiveTab={setActiveTab}
							activeTab={activeTab}
							category={trCategoriesArr?.translated ? trCategoriesArr.translated[index][lang] : j.category}
							isHomePage={false} />
					})
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
			(center && !isLoading && isMapApiLoaded) &&
			<Map
			lang={lang}
				trCategoriesArr={trCategoriesArr}
				jobs={jobs}
				mapZoom={mapZoom}
				setBounds={setBounds}
				bounds={bounds}
				center={center}
				isMapApiLoaded={isMapApiLoaded}
				startRequest={() => setStartPermissionRequest(true)}
				defaultCenter={defaultCenter}
				masterCoordinates={masterCoordinates}
				setMasterCoordinates={setMasterCoordinates}
				activeTab={activeTab}
				setActiveTab={setActiveTab} />
			}
	</div>

	<NotificationDialog open={isNotificationOpen} onClose={() => setIsNotificationOpen(false)}>
		{t(notificationText)}
	</NotificationDialog>
	
	<PermissionRequest start={start} finish={() => setStartPermissionRequest(false)} action={(GEO) => setCenter(GEO)} />
</div>;
};

export default Jobs;