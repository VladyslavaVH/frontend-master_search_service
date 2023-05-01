import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import $ from 'jquery';
import Home from "./components/Home/Home";
import HeaderContainer from "./components/HeaderContainer/HeaderContainer";
import Page404 from "./components/Page404";
import MasterOffice from "./components/Office/MasterOffice/MasterOffice";
import Messages from './components/Office/Messages/Messages';
import PricingPlans from './components/Office/MasterOffice/PricingPlans';
import Statistics from './components/Office/MasterOffice/Statistics';
import Jobs from './components/Jobs/Jobs';
import ContactUs from './components/ContactUs/ContactUs';
import FAQs from './components/FAQs/FAQs';
import ClientOffice from './components/Office/ClientOffice/ClientOffice';
import JobPosting from './components/Office/ClientOffice/JobPosting/JobPosting';
import Checkout from "./components/Checkout/Checkout";
import ManageJobs from './components/Office/ClientOffice/ManageJobs/ManageJobs';
import Settings from './components/Office/Settings/Settings';
import EditJob from './components/Office/ClientOffice/EditJob';
import SingleJob from './components/Jobs/SingleJob/SingleJob';
import Masters from "./components/Masters/Masters";
import MasterProfile from "./components/Masters/MasterProfile/MasterProfile";
import Chat from "./components/Office/Messages/Chat/Chat";
import ManageCandidates from "./components/Office/ClientOffice/ManageCandidates/ManageCandidates";
import OrderConfirmation from "./components/OrderConfirmation";
import Invoice from "./components/Invoice/Invoice";
import { wrapperHeight, fullPageScrollbar, stickyHeader } from "./amimations/amimations";
import AdminPanel from "./components/Office/AdminPanel/AdminPanel";
import MasterDocuments from './components/Office/AdminPanel/MasterDocuments';
import SiteStatistics from './components/Office/AdminPanel/SiteStatistics';
import DocVerification from './components/Office/AdminPanel/DocVerification';
import EditFAQs from './components/Office/AdminPanel/EditFAQs';
import AddCategory from './components/Office/AdminPanel/AddCategory';
import RequireAuth from "./features/auth/RequireAuth";
import PersistLogin from "./features/auth/PersistLogin";
import Unauthorized from "./components/Unauthorized";
import { setPersist } from "./features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Loader } from '@googlemaps/js-api-loader';
import EmailConfirmation from "./components/Confirmation/EmailConfirmation";

const ROLE = {
  ADMIN: process.env.REACT_APP_ADMIN_ROLE,
  CLIENT: process.env.REACT_APP_CLIENT_ROLE,
  MASTER: process.env.REACT_APP_MASTER_ROLE
}

const API_KEY = process.env.REACT_APP_KEY; 
require('slick-carousel');

function App() {
  //const socket = useRef();
  const dispatch = useDispatch();
  // Showing Button
  const pxShow = 600; // height on which the button will show
  const scrollSpeed = 500; // how slow / fast you want the button to scroll to top.

  const [isMapApiLoaded, setIsMapApiLoaded] = useState(false);

  useEffect(() => {
      if (isMapApiLoaded || window.google) return;
      const loader = new Loader({
          apiKey: API_KEY,
          version: 'beta',
          libraries: [ 'marker', 'places', 'geometry'],
          //types: ['(cities)'],
		      //componentRestrictions: {country: "us"}
          language: 'en'
      })
      loader.load().then(() => {
        setIsMapApiLoaded(true);
        console.log('google libs loaded')
      })
  }, [isMapApiLoaded])

  const backToTop = () => {
    $('body').append('<div id="backtotop"><a href="#"></a></div>');
  };

  const windowScroll = () => {
    $(window).on('scroll', function () {
        if ($(window).scrollTop() >= pxShow) {
            $("#backtotop").addClass('visible');
        } else {
            $("#backtotop").removeClass('visible');
        }
    });
  };

  const backtotopOnClick = () => {
    $('#backtotop a').on('click', function() {
        $('html, body').animate({scrollTop:0}, scrollSpeed);
        return false;
    });
  };

  useEffect(() => {
    dispatch(setPersist(localStorage.getItem('persist') || false));

    stickyHeader();    
    backToTop();
    windowScroll();
    backtotopOnClick();
    // Auto Resizing Message Input Field
    /* global jQuery */
    $.each($('textarea[data-autoresize]'), function() {
      let offset = this.offsetHeight - this.clientHeight;

      let resizeTextarea = function(el) {
          $(el).css('height', 'auto').css('height', el.scrollHeight + offset);
      };
      $(this).on('keyup input', function() { resizeTextarea(this); }).removeAttr('data-autoresize');
    });

    $(window).on('load resize', function() {
      let transparentHeaderHeight = $('.transparent-header').outerHeight();
      $('.transparent-header-spacer').css({
        height: transparentHeaderHeight,
      });
      wrapperHeight();
      fullPageScrollbar();
    });
    wrapperHeight();
    fullPageScrollbar();
  }, []);

  return (
      <div className="App" style={{ overflowX: 'hidden' }}>
        <div id="wrapper" style={{ 
          transitionProperty: 'transform',
          transitionDuration: '0.3s',
          transitionTimingFunction: 'ease',
         }}>
          <HeaderContainer />
          <div className="clearfix"></div>
          <Routes>
            <Route element={<PersistLogin />}>
              {/*public routes*/}
              <Route path="/masters" element={<Masters />} />    
              <Route path="*" element={<Page404 />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/contact/us" element={<ContactUs isMapApiLoaded={isMapApiLoaded} />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/" element={<Home isMapApiLoaded={isMapApiLoaded} />} />
              <Route path="/confirmation/:token/:id/:email" element={<EmailConfirmation />} />
        
              {/*protected routes*/}              
              <Route element={<RequireAuth allowedRole={ROLE.ADMIN} />}>
                <Route path="/admin-panel" element={<AdminPanel />} >
                  <Route path="statistics" element={<SiteStatistics />} />
                  <Route path="doc-verification" element={<DocVerification />} />
                  <Route path="doc-verification/master-profile" element={<MasterDocuments />} />
                  <Route path="faqs-editing" element={<EditFAQs />} />
                  <Route path="add-category" element={<AddCategory />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Route>
  
              <Route element={<RequireAuth allowedRole={ROLE.CLIENT} />}>
                <Route path="/client-office" element={<ClientOffice />} >
                  <Route path="master-profile" element={<MasterProfile isMapApiLoaded={isMapApiLoaded} />} />
                  <Route path="job-posting" element={<JobPosting isMapApiLoaded={isMapApiLoaded} />} />
                  <Route path="manage-jobs/edit/job" element={<EditJob />} />
                  <Route path="manage-jobs/job" element={<SingleJob isMapApiLoaded={isMapApiLoaded} />} />
      
                  <Route path="messages" element={<Messages />} >
                    <Route path="" element={<Chat />} />
                    <Route path="user" element={<Chat />} />
                    <Route path="user/:id" element={<Chat />} />
                    <Route path="user/:firstName/:lastName" element={<Chat />} />
                  </Route>
      
                  <Route path="manage-jobs" element={<ManageJobs isMapApiLoaded={isMapApiLoaded} />} />
                  <Route path="manage-jobs/manage-candidates" element={<ManageCandidates isMapApiLoaded={isMapApiLoaded} />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Route>
              
              <Route element={<RequireAuth allowedRole={ROLE.MASTER} />}>              
                <Route path="/master-office" element={<MasterOffice />} >
                  <Route path="job/:title/:id" element={<SingleJob />} />
                  <Route path="job/:title" element={<SingleJob />} />
      
                  <Route path="messages" element={<Messages />} >
                    <Route path="" element={<Chat />} />
                    <Route path="user" element={<Chat />} />
                    <Route path="user/:id" element={<Chat />} />
                    <Route path="user/:firstName/:lastName" element={<Chat />} />
                  </Route>
                  
                  <Route path="pricing-plans" element={<PricingPlans />} />
                  <Route path="statistics" element={<Statistics />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
                
                <Route path="/jobs/:category" 
                  element={<Jobs isMapApiLoaded={isMapApiLoaded} />} />

                <Route path="/jobs" 
                  element={<Jobs isMapApiLoaded={isMapApiLoaded} />} />

                <Route path="/jobs/job/:title" element={<SingleJob />} />
              
            </Route>
            </Route>

            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/invoice" element={<Invoice />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
