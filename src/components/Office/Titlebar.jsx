import React, { useEffect, useState } from "react";
import { useParams, useLocation } from 'react-router-dom';

let Titlebar = (props) => {
	const { jobTitle } = useParams();
	const location = useLocation();
	const [panel, setPanel] = useState(false);

	useEffect(() => {
		setPanel(location.pathname.includes('admin'));
	}, []);

	return <div className="dashboard-headline">
		<h3>{props.name}</h3>
		<span className={jobTitle ? 'margin-top-7' : ''}>{jobTitle ? 'For' : props?.span} {jobTitle && <a href="">{jobTitle}</a>}</span>

		<nav id="breadcrumbs" className="dark">
			<ul>
				{!panel
				?<>
					<li><a>Home</a></li>
					<li>Office</li>
				</>
				: <li>Panel</li>}
				<li>{props.page}</li>
			</ul>
		</nav>
	</div>
}

export default Titlebar;
