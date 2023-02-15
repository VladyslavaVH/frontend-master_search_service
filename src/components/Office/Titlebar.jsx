import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { selectIsAdmin, selectIsMaster, selectCurrentUser } from './../../features/auth/authSlice';
import { useSelector } from 'react-redux';

let Titlebar = (props) => {
	const { t } = useTranslation();
	const { jobTitle } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const isAdmin = useSelector(selectIsAdmin);
	const isMaster = useSelector(selectIsMaster);
	const user = useSelector(selectCurrentUser);
	const [panel, setPanel] = useState(false);

	useEffect(() => {
		setPanel(location.pathname.includes('admin'));
	}, [location.pathname]);

	return <div className="dashboard-headline">
		<h3>{props.name}</h3>
		<span className={jobTitle ? 'margin-top-7' : ''}>{jobTitle ? t('For') : props?.span} {jobTitle && <a href="">{jobTitle}</a>}</span>

		<nav id="breadcrumbs" className="dark">
			<ul style={{ cursor: 'pointer' }}>
				{!panel
				?<>
					<li onClick={() => navigate('/')}><a>{t('Home')}</a></li>
					<li onClick={() => {
						if (isMaster) {
							navigate(`/master-office/statistics`, { state: {
								name: `${t('Howdy')}, ${user.firstName}!`, page: t('Statistics'), span: `${t('Greetings')}`
							} });
						} else {
							navigate(`/client-office/manage-jobs`, { state: {
								name: `${t('ManageJobs')}`, page: `${t('ManageJobs')}`
							} });
						}
					}}>{t('Office')}</li>
				</>
				: <li onClick={() => {
					if (isAdmin) {
						navigate(`/admin-panel/statistics`, { state: {
							name: t("AdminPanel"), page: t('Statistics')
						} });
					}
				}}>{t('AdminPanel')}</li>}
				<li>{props.page}</li>
			</ul>
		</nav>
	</div>
}

export default Titlebar;
