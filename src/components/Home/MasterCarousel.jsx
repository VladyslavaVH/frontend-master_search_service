import React, { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
import MasterCard from "../Masters/MasterCard";
import { useSelector } from "react-redux";
import { selectIsAuth, selectIsMaster } from "../../features/auth/authSlice";
import { useGetHighestRatedMastersQuery } from "../../features/home/homeApiSlice";
import { useTranslation } from "react-i18next";

const MasterCarousel = ({ isMapApiLoaded, masters }) => {
  const { t } = useTranslation();

  const slickSettings = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1292,
        settings: {
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 993,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false
        }
      }
    ]
  };

  useEffect(() => {
    $('.default-slick-carousel')
      .not('.slick-initialized')
      .slick(slickSettings);
  }, []);

  return <div className="section gray padding-top-65 padding-bottom-70 full-width-carousel-fix">
    <div className="container">
      <div className="row">

        <div className="col-xl-12">
          <div className="section-headline margin-top-0 margin-bottom-25">
            <h3>{t('HighestRatedMasters')}</h3>
            {false && <NavLink to={`/masters`} className="headline-link">{t('BrowseAllMasters')}</NavLink>}
          </div>
        </div>

        <div className="col-xl-12">
          <div className="default-slick-carousel freelancers-container freelancers-grid-layout">
            {masters?.map((m) =>
              <MasterCard isMapApiLoaded={isMapApiLoaded} key={m.id} {...m} />)}
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default MasterCarousel;