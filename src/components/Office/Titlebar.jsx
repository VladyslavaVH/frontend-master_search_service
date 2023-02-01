import React, { useEffect, useState } from "react";
import { useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

let Titlebar = (props) => {
	const { t } = useTranslation();
	const { jobTitle } = useParams();
	const location = useLocation();
	const [panel, setPanel] = useState(false);

	useEffect(() => {
		setPanel(location.pathname.includes('admin'));
	}, [location.pathname]);

	return <div className="dashboard-headline">
		<h3>{props.name}</h3>
		<span className={jobTitle ? 'margin-top-7' : ''}>{jobTitle ? 'For' : props?.span} {jobTitle && <a href="">{jobTitle}</a>}</span>

		<nav id="breadcrumbs" className="dark">
			<ul>
				{!panel
				?<>
					<li><a>{t('Home')}</a></li>
					<li>{t('Office')}</li>
				</>
				: <li>{t('AdminPanel')}</li>}
				<li>{props.page}</li>
			</ul>
		</nav>
	</div>
}

export default Titlebar;
