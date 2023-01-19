import React, { useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import { connect, useSelector, useDispatch } from "react-redux";
import { compose } from "redux";
import SignInWindow from './SignInWindow/SignInWindow';
import $ from 'jquery';
import NotificationsWindow from "./NotificationsWindow/NotificationsWindow";
import MessagesWindow from "./MessagesWindow/MessagesWindow";
import UserWindow from "./UserWindow/UserWindow";
import { close_user_dropdown } from './../../amimations/amimations';
import { useNavigate, useLocation } from "react-router-dom";
import { selectIsMaster, selectIsAdmin, selectIsAuth } from "../../features/auth/authSlice";

let HeaderContainer = (props) => {
	const isMaster = useSelector(selectIsMaster);
	const isAdmin = useSelector(selectIsAdmin);
	let isAuth = useSelector(selectIsAuth);

	const { unreadMessages, unreadNotifications, 
		   } = props;
	
	const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
	
    const [ isOpen, setIsOpen ] = useState(false);
	
	useEffect(() => {
		$(".header-notifications").each(function () {
			let userMenu = $(this);
			let userMenuTrigger = $(this).find('.header-notifications-trigger a');

			$(userMenuTrigger).on('click', function (event) {
				event.preventDefault();
				close_user_dropdown();
				userMenu.addClass('active');
			});
		});

		$("body").on('mouseup', function (e) {
			let statusSwitch = e.target.classList[0];
			if (statusSwitch != 'user-online' && statusSwitch != 'user-invisible') {
				close_user_dropdown();
			}
		});

		// Close with ESC
		$(document).on('keyup', function (e) {
			if (e.key === 'Escape') {
				close_user_dropdown();
			}
		});
	}, []);

	return <header id="header-container" className="fullwidth">
		<div id="header">
			<div className="container">
				<div className="left-side">

					{/* <!-- Logo --> */}
					<div id="logo">
						<NavLink to='/' reloadDocument>
							<img src="" alt="" />
							<h1>HELP 2 FIX</h1>
						</NavLink>
					</div>

					{/* <!-- Main Navigation --> */}
					<nav id="navigation">
						<ul id="responsive">

							<li>
								<NavLink to='/' end
									className={({ isActive }) => { return isActive ? 'current' : '' }}>
									Home
								</NavLink>
							</li>

							{isAuth
								? <>{(!isMaster && !isAdmin) &&
									<li>
										<NavLink state={{ name: 'Post a Job', page: 'Post a Job' }} className={({ isActive }) => { return isActive ? 'current' : '' }}
											to='/client-office/job-posting'>
											Post a Job
										</NavLink>
									</li>}
								</>
								: <li>
									<a onClick={() => setIsOpen(true)} className="popup-with-zoom-anim log-in-button">
										Post a Job
									</a>
								</li>}

							<li><a>About</a>
								<ul className="dropdown-nav">
									<li>
										<NavLink to='/support'>Support</NavLink>
									</li>
									<li>
										<NavLink to='/faqs'>FAQs</NavLink>
									</li>
								</ul>
							</li>

							{isAuth
								? <>
									{isAdmin
										? <li>
											<NavLink state={{ name: 'Admin panel', page: 'Statistics' }}
												to='/admin-panel/statistics' className={({ isActive }) => { return isActive ? 'current' : '' }}>
												Admin panel
											</NavLink>
										</li>

										: <>
											{isMaster
												? <li>
													<NavLink state={{ name: 'Howdy, Tom!', page: 'Statistics', span: 'We are glad to see you again!' }}
														to='/master-office/statistics' className={({ isActive }) => { return isActive ? 'current' : '' }}>
														Office
													</NavLink>
												</li>
												: <li>
													<NavLink state={{ name: 'Manage Jobs', page: 'Manage Jobs' }} className={({ isActive }) => { return isActive ? 'current' : '' }}
														to='/client-office/manage-jobs'>
														Office
													</NavLink>
												</li>}
										</>}
								</>
								: <li>
									<a onClick={() => setIsOpen(true)} className="popup-with-zoom-anim log-in-button">
										Office
									</a>
								</li>}

						</ul>
					</nav>
					<div className="clearfix"></div>
					{/* <!-- Main Navigation / End --> */}

				</div>

				<div className="right-side">
					{!isAuth &&
						<div className="header-widget">
							{/* <a href="#sign-in-dialog" className="popup-with-zoom-anim log-in-button"><i className="icon-feather-log-in"></i> <span>Log In / Register</span></a>
							<Popup id={'sign-in-dialog'} children={<SignInWindow />} /> */}
							<button type="button" onClick={() => setIsOpen(true)} className="log-in-button"><i className="icon-feather-log-in"></i> <span>Log In / Register</span></button>
							<SignInWindow open={isOpen} onClose={() => setIsOpen(false)} />
						</div>}

					{(isAuth && !isAdmin) &&
						<div className="header-widget hide-on-mobile">
							<NotificationsWindow />

							<MessagesWindow />
						</div>}

					{(isAuth && !isAdmin) &&
						<div className="header-widget">
							<UserWindow />
						</div>}

					{/* <!-- Mobile Navigation Button --> */}
					<span className="mmenu-trigger">
						<button className="hamburger hamburger--collapse" type="button">
							<span className="hamburger-box">
								<span className="hamburger-inner"></span>
							</span>
						</button>
					</span>

				</div>
			</div>
		</div>
	</header>;
};

export default HeaderContainer;