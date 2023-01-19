import React, { useEffect } from "react";
import $ from 'jquery';

let Popup = (props) => {
	const { id, children } = props;

	const popupSettings = {
		type: 'inline',
	
		fixedContentPos: false,
		fixedBgPos: true,
	
		overflowY: 'auto',
	
		closeBtnInside: true,
		closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
		preloader: false,

		callbacks: {
			open: function() {
			  // Will fire when this exact popup is opened
			  // this - is Magnific Popup object
			},
			close: function() {
			  console.log('close popup');
			}
		},
	
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	};

	useEffect(() => {
		let tabsNav = $('.popup-tabs-nav'),
			tabsNavList = tabsNav.children('li');

		tabsNav.each(function () {
			let $this = $(this);

			$this.next().children('.popup-tab-content').stop(true, true).hide().first().show();
			$this.children('li').first().addClass('active').stop(true, true).show();
		});

		tabsNavList.on('click', function (e) {
			let $this = $(this);

			$this.siblings().removeClass('active').end().addClass('active');

			$this.parent().next().children('.popup-tab-content').stop(true, true).hide()
				.siblings($this.find('a').attr('href')).fadeIn();

			e.preventDefault();
		});

		let hash = window.location.hash;
		let anchor = $('.tabs-nav a[href="' + hash + '"]');

		if (anchor.length === 0) {
			$(".popup-tabs-nav li:first").addClass("active").show(); //Activate first tab
			$(".popup-tab-content:first").show(); //Show first tab content
		} else {
			anchor.parent('li').click();
		}

		$('.register-tab').on('click', function (event) {
			event.preventDefault();
			$(".popup-tab-content").hide();
			$("#register.popup-tab-content").show();
			$("body").find('.popup-tabs-nav a[href="#register"]').parent("li").click();
		});

		$('.popup-with-zoom-anim').magnificPopup(popupSettings);

	}, []);

	return <div id={id} className="zoom-anim-dialog mfp-hide dialog-with-tabs">

		<div className={id}>
			{children}
		</div>
	</div>;
};

export default Popup;