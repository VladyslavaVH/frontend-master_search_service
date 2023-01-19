import React, { useEffect } from "react";
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
import Support from './components/Support/Support';
import FAQs from './components/FAQs/FAQs';
import ClientOffice from './components/Office/ClientOffice/ClientOffice';
import JobPosting from './components/Office/ClientOffice/JobPosting';
import Checkout from "./components/Checkout/Checkout";
import ManageJobs from './components/Office/ClientOffice/ManageJobs/ManageJobs';
import Settings from './components/Office/Settings/Settings';
import EditJob from './components/Office/ClientOffice/EditJob';
import SingleJob from './components/Jobs/SingleJob/SingleJob';
import Masters from "./components/Masters/Masters";
import MasterProfile from "./components/Masters/MasterProfile/MasterProfile";
import MessageContent from "./components/Office/Messages/MessageContent/MessageContent";
import ManageCandidates from "./components/Office/ClientOffice/ManageCandidates/ManageCandidates";
import OrderConfirmation from "./components/OrderConfirmation";
import Invoice from "./components/Invoice/Invoice";
import { wrapperHeight, fullPageScrollbar } from "./amimations/amimations";
import AdminPanel from "./components/Office/AdminPanel/AdminPanel";
import SiteStatistics from './components/Office/AdminPanel/SiteStatistics';
import DocVerification from './components/Office/AdminPanel/DocVerification';
import EditFAQs from './components/Office/AdminPanel/EditFAQs';
import AddCategory from './components/Office/AdminPanel/AddCategory';
import RequireAuth from "./features/auth/RequireAuth";
import PersistLogin from "./features/auth/PersistLogin";
import Unauthorized from "./components/Unauthorized";
import { setPersist } from "./features/auth/authSlice";
import { useDispatch } from "react-redux";

const ROLE = {
  ADMIN: process.env.REACT_APP_ADMIN_ROLE,
  CLIENT: process.env.REACT_APP_CLIENT_ROLE,
  MASTER: process.env.REACT_APP_MASTER_ROLE
}

const API_KEY = process.env.REACT_APP_KEY; 
//const API_KEY = import.meta.env.REACT_APP_KEY;
const MAP_API_JS = 'https://maps.googleapis.com/maps/api/js';
require('slick-carousel');
require('magnific-popup');


/*function loadAsyncScript(src) {
    return new Promise(resolve => {
      const script = document.createElement('script');
      Object.assign(script, {
        type: 'text/javascript',
        async: true,
        src
      });

      script.addEventListener('load', () => resolve(script));
      document.head.appendChild(script);
    });
}*/

function App() {
  const dispatch = useDispatch();
  // Showing Button
  const pxShow = 600; // height on which the button will show
  const scrollSpeed = 500; // how slow / fast you want the button to scroll to top.

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

  // const initMapScript = () => {
  //   if (window.google) {
  //     return Promise.resolve();
  //   }

  //   const src = `${MAP_API_JS}?key=${API_KEY}&libraries=places&v=weekly`;
  //   return loadAsyncScript(src);
  // }

  // function initAutocomplete() {
  //   let options = {
  //    types: ['(cities)'],
  //    componentRestrictions: {country: "us"}
  //   };

  //   let input = document.getElementById('autocomplete-input');
  //   let autocomplete = new window.google.maps.places.Autocomplete(input, options);
  // }

  useEffect(() => {
    dispatch(setPersist(localStorage.getItem('persist') || false));
    /*if (!window.google) {
      initMapScript().then(() => initAutocomplete());
    }

    // Autocomplete adjustment for homepage
    if ($('.intro-banner-search-form')[0]) {
        setTimeout(function(){ 
            $(".pac-container").prependTo(".intro-search-field.with-autocomplete");
        }, 300);
    }*/
    
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
      wrapperHeight();
      fullPageScrollbar();
    });
    wrapperHeight();
    fullPageScrollbar();
  }, []);

  const msgInfo = { id: 1, user: 'Cindy Forest', avatar: 'user-avatar-small-02.jpg', mainAvatar: 'user-avatar-small-01.jpg',
  messages: [
      { date: '28 June, 2019', messages: [
          { isTyping: false, isMe: true, message: `Thanks for choosing my offer. I will start working on your project tomorrow.` },
          { isTyping: false, isMe: false, message: `Great. If you need any further clarification let me know. 👍` },
          { isTyping: false, isMe: true, message: `Ok, I will. 😉` },
      ] },
      { date: 'Yesterday', messages: [
          { isTyping: false, isMe: true, message: `Hi Sindy, I just wanted to let you know that project is finished and I'm waiting for your approval.` },
          { isTyping: false, isMe: false, message: `Hi Tom! Hate to break it to you, but I'm actually on vacation 🌴 until Sunday so I can't check it now. 😎` },
          { isTyping: false, isMe: true, message: `Ok, no problem. But don't forget about last payment. 🙂` },
          { isTyping: true, isMe: false, message: ``}
      ] }
  ]
};

  return (
      <div className="App">
        <div id="wrapper">
          <HeaderContainer />
          <div className="clearfix"></div>
          <Routes>
            {/*public routes*/}
            <Route path="/" element={<Home />} />    

            <Route path="/jobs">
              <Route index element={<Jobs />} />
              <Route path=":title" element={<Jobs />} />
              <Route path=":category" element={<Jobs />} />
            </Route>

            <Route path="/masters" element={<Masters />} />    
            <Route path="*" element={<Page404 />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/support" element={<Support />} />
            <Route path="/faqs" element={<FAQs />} />

            <Route path="/jobs/:id" element={<Jobs />} />

            {/*protected routes*/}
            <Route element={<PersistLogin />}>
              
              <Route element={<RequireAuth allowedRole={ROLE.ADMIN} />}>
                <Route path="/admin-panel" element={<AdminPanel />} >
                  <Route path="statistics" element={<SiteStatistics />} />
                  <Route path="doc-verification" element={<DocVerification />} />
                  <Route path="faqs-editing" element={<EditFAQs />} />
                  <Route path="add-category" element={<AddCategory />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Route>
  
              <Route element={<RequireAuth allowedRole={ROLE.CLIENT} />}>
                <Route path="/client-office" element={<ClientOffice />} >
                  <Route path="master-profile" element={<MasterProfile />} />
                  <Route path="job-posting" element={<JobPosting />} />
                  <Route path="manage-jobs/edit/job/:title" element={<EditJob />} />
                  <Route path="manage-jobs/job/:title" element={<SingleJob />} />
      
                  <Route path="messages" element={<Messages />} >
                    <Route path="user/:id" element={<MessageContent msgInfo={msgInfo} />} />
                    <Route path="user/:firstname/:lastname" element={<MessageContent msgInfo={msgInfo} />} />
                  </Route>
      
                  <Route path="manage-jobs" element={<ManageJobs />} />
                  <Route path="manage-jobs/manage-candidates/:jobTitle" element={<ManageCandidates />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Route>
              
              <Route element={<RequireAuth allowedRole={ROLE.MASTER} />}>              
                <Route path="/master-office" element={<MasterOffice />} >
                  <Route path="job/:title/:id" element={<SingleJob />} />
      
                  <Route path="messages" element={<Messages />} >
                    <Route path="user/:id" element={<MessageContent msgInfo={msgInfo} />} />
                  </Route>
                  
                  <Route path="pricing-plans" element={<PricingPlans />} />
                  <Route path="statistics" element={<Statistics />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
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
