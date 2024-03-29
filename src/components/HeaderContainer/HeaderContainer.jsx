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
import { mmenuInit, close_user_dropdown } from './../../animations/animations';
import { useNavigate, useLocation } from "react-router-dom";
import { selectIsMaster, selectIsAdmin, selectIsAuth, selectCurrentUser } from "../../features/auth/authSlice";
import { useTranslation } from "react-i18next";
import Select from 'react-select';
import { DropdownIndicator, Option, SINGLE_SELECT_STYLES } from '../../animations/selectDetails';
import { setLanguage, setDefaultLanguage, selectDefaultLanguage } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import MobileHeader from './Popup/MobileHeader';

let HeaderContainer = (props) => {
	const [isMobNavOpen, setIsMobNavOpen] = useState(false);
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

							<li>
								<NavLink to='/faqs' end
									className={({ isActive }) => { return isActive ? 'current' : '' }}>FAQs</NavLink>
							</li>

							<li>
								<NavLink to='/contact/us' end
									className={({ isActive }) => { return isActive ? 'current' : '' }}>{ t('ContactUs') }</NavLink>
							</li>
						</ul>
					</nav>
					<div className="clearfix"></div>
					{/* <!-- Main Navigation / End --> */}

				</div>

				<div className="right-side">
					{(isAuth && !isMaster && !isAdmin) && 
					<div id="post-btn" className="header-widget hide-on-mobile">
						<div className="header-notifications" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
							{isAuth
								? <>
									{(!isMaster && !isAdmin) &&
								 	<button onClick={() => navigate('/client-office/job-posting', { state: { name: 'PostAJob', page: 'PostAJob' } })}
										className="button ripple-effect">
										{t('PostAJob')}
									</button>}
								 </>
								: <button onClick={() => setIsOpen(true)}
									className="button ripple-effect">
									{t('PostAJob')}
								</button>
							}
						</div>
					</div>}
					
					<div id="lang-select" className="header-widget hide-on-mobile">
						<div className="header-notifications" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
						</div >
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

					{isAuth &&
						<div className="header-widget">
							<UserWindow />
						</div>}

					{/* <!-- Mobile Navigation Button --> */}
					<span className="mmenu-trigger" onClick={() => setIsMobNavOpen(true)}>
						<button className="hamburger hamburger--collapse" type="button">
							<span className="hamburger-box">
								<span className="hamburger-inner"></span>
							</span>
						</button>
					</span>

					<MobileHeader open={isMobNavOpen} onClose={() => setIsMobNavOpen(false)} />

				</div>
			</div>
		</div>
	</header>;
};

export default HeaderContainer;