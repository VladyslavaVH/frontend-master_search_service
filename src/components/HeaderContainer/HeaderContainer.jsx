import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import SignInWindow from './SignInWindow/SignInWindow';
import $ from 'jquery';
import Mmenu from "mmenu-js";
import "mmenu-js/dist/mmenu.css";
import NotificationsWindow from "./NotificationsWindow/NotificationsWindow";
import MessagesWindow from "./MessagesWindow/MessagesWindow";
import UserWindow from "./UserWindow/UserWindow";
import { mmenuInit, close_user_dropdown } from './../../amimations/amimations';
import { useNavigate, useLocation } from "react-router-dom";
import { selectIsMaster, selectIsAdmin, selectIsAuth, selectCurrentUser } from "../../features/auth/authSlice";
import { useTranslation } from "react-i18next";
import Select from 'react-select';
import { DropdownIndicator, Option, SINGLE_SELECT_STYLES } from '../../amimations/selectDetails';
import { setLanguage, setDefaultLanguage, selectDefaultLanguage } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

let HeaderContainer = (props) => {
	const { t, i18n } = useTranslation();
	const dispatch = useDispatch();
	const user = useSelector(selectCurrentUser);
	const isMaster = useSelector(selectIsMaster);
	const isAdmin = useSelector(selectIsAdmin);
	let isAuth = useSelector(selectIsAuth);
	const defaultLanguage = useSelector(selectDefaultLanguage);
	
	const navigate = useNavigate();
    const location = useLocation();
    //const from = location.state?.from?.pathname || '/';

	const [languages] = useState([
        { value: 'en', label: 'English' },
        { value: 'uk', label: 'Українська' },
        { value: 'cs', label: 'Czech' },
    ]);

    const changeLanguage = selectedLanguage => {
        dispatch(setLanguage(selectedLanguage.value));
		dispatch(setDefaultLanguage(selectedLanguage));
        i18n.changeLanguage(selectedLanguage.value);
    }
	
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
						<NavLink to='/'>{/*reloadDocument */}
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
									{ t('Home') }
								</NavLink>
							</li>

							{/* {isAuth
								? <>{(!isMaster && !isAdmin) &&
									<li>
										<NavLink state={{ name: `${t('PostAJob')}`, page: `${t('PostAJob')}` }} className={({ isActive }) => { return isActive ? 'current' : '' }}
											to='/client-office/job-posting'>
											{ t('PostAJob') }
										</NavLink>
									</li>}
								</>
								: <li>
									<a onClick={() => setIsOpen(true)} className="popup-with-zoom-anim log-in-button">
									{ t('PostAJob') }
									</a>
								</li>} */}

							<li><a>{ t('About') }</a>
								<ul className="dropdown-nav">
									<li>
										<NavLink to='/contact/us'>{ t('ContactUs') }</NavLink>
									</li>
									<li>
										<NavLink to='/faqs'>FAQs</NavLink>
									</li>
								</ul>
							</li>

							{
								isAuth && isAdmin
									? <li>
										<NavLink state={{ name: t("AdminPanel"), page: t('Statistics') }}
										to='/admin-panel/statistics' className={({ isActive }) => { return isActive ? 'current' : '' }}>
											{t("AdminPanel")}
										</NavLink>
									</li>
									: null
							}

						</ul>
					</nav>
					<div className="clearfix"></div>
					{/* <!-- Main Navigation / End --> */}

				</div>

				<div className="right-side">
					{isAuth
						? <>
							{(!isMaster && !isAdmin) &&
						 	<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
								className="header-widget hide-on-mobile">
								<button onClick={() => navigate('/client-office/job-posting', { state: { name: `${t('PostAJob')}`, page: `${t('PostAJob')}` } })}
									className="button ripple-effect">
									{t('PostAJob')}
								</button>
							</div>}
						 </>
						: <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
							className="header-widget hide-on-mobile">
							<button onClick={() => setIsOpen(true)}
								className="button ripple-effect">
								{t('PostAJob')}
							</button>
						</div>
					}
					
					<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
					className="header-widget">
						<Select
							defaultValue={defaultLanguage}
							value={defaultLanguage}
							options={languages}
							onChange={changeLanguage}
							components={{
								DropdownIndicator,
								Option
							}}
							styles={SINGLE_SELECT_STYLES} 
						/>
					</div>

					{!isAuth &&
						<div className="header-widget">
							<button type="button" onClick={() => setIsOpen(true)} className="log-in-button"><i className="icon-feather-log-in"></i> <span>{t('LogInRegister')}</span></button>
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