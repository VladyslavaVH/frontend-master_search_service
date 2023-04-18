import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { selectIsAdmin, selectIsMaster, selectCurrentUser } from './../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

let Titlebar = (props) => {
	const { t } = useTranslation();
	const { jobTitle } = useParams();
	const [searchParams] = useSearchParams();
	const location = useLocation();
	const navigate = useNavigate();
	const isAdmin = useSelector(selectIsAdmin);
	const isMaster = useSelector(selectIsMaster);
	const user = useSelector(selectCurrentUser);
	const [panel, setPanel] = useState(false);
	const [namePage, setNamePage] = useState('');
	

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	useEffect(() => {
		setPanel(location.pathname.includes('admin'));
		let tmp = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);

		switch (tmp) {
			case 'job-posting':
				tmp = 'PostAJob'
				break;

			case 'manage-jobs':
				tmp = 'ManageJobs'
				break;

			case 'manage-candidates':
				tmp = 'ManageCandidates'
				break;

			case 'master-profile':
				tmp = searchParams.get('page');
				break;

			case 'doc-verification':
				tmp = 'VerificationOfDocuments';
				break;

			case 'faqs-editing':
				tmp = 'Editing';
				break;

			case 'add-category':
				tmp = 'AddingJobCategories';
				break;
		
			default:
				tmp = capitalizeFirstLetter(tmp);
				break;
		}
		setNamePage(tmp);

	}, [location.pathname]);

	return <div className="dashboard-headline">
		<h3>{(props.name === 'Howdy' || window.location.pathname.lastIndexOf('/') === 0)
				? `${t('Howdy')}, ${isAdmin ? t('Administrator') : user.firstName}!`
				: props?.name 
					? t(props.name)
					: t(namePage)
			}
		</h3>
		<span className={jobTitle ? 'margin-top-7' : ''}>
			{jobTitle 
				? <>{t('For')}&nbsp;</> 
				: window.location.pathname.lastIndexOf('/') === 0
					? t('Greetings')
					: t(props?.span)
			} 
			{jobTitle && <a href="">{jobTitle}</a>}
		</span>

		<nav id="breadcrumbs" className="dark">
			<ul style={{ cursor: 'pointer' }}>
				{!panel
				?<>
					<li onClick={() => navigate('/')}><a>{t('Home')}</a></li>
					<li onClick={() => {
						if (isMaster) {
							navigate(`/master-office`, { state: {
								name: 'Howdy', span: 'Greetings'
							} });
						} else {
							navigate(`/client-office`, { state: {
								name: 'Howdy', span: 'Greetings'
							} });
						}
					}}>{t('Office')}</li>
				</>
				: <li onClick={() => {
					if (isAdmin) {
						navigate(`/admin-panel/statistics`, { state: {
							name: 'AdminPanel', page: 'Statistics'
						} });
					}
				}}>{t('AdminPanel')}</li>}

				{(window.location.pathname.lastIndexOf('/') !== 0 && (props?.page?.length > 0 || namePage.length > 0)) &&
				<>
					{
						props.page
						? <li>
							{(props.page) === 'Editing'
								? `FAQs ${t(props.page)}`
								: t(props.page)
							}
						</li>
						: <li>
							{(namePage) === 'Editing'
								? `FAQs ${t(namePage)}`
								: t(namePage)
							}
						</li>
					}
				</>}

				{/* <li>{props.page}</li> */}
			</ul>
		</nav>
	</div>
}

export default Titlebar;
