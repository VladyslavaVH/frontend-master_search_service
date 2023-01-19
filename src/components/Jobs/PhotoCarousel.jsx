import React, { useEffect } from "react";
import $ from 'jquery';

const PhotoCarousel = (props) => {
    const { photos } = props;
    //const imgPath = process.env.REACT_APP_IMG_PATH;
    
    /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
    const jobPhotosPath = process.env.REACT_APP_JOB_PHOTOS_PATH;
    const photoPath = process.env.REACT_APP_PHOTO_PATH;

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

    return <div className="section margin-bottom-25 full-width-carousel-fix">
        <div className="container">
            <div className="single-page-section row">

                <h3 className="margin-bottom-25">Job Photos</h3>

                <div className="col-xl-12">
                    <div className="default-slick-carousel freelancers-container freelancers-grid-layout">
                        {photos?.map(p => 
                        <img key={p.id} className="freelancer" src={`${jobPhotosPath}${p.photo}`}
                        style={{ width: '70px', height: '100px' }} />)}
                    </div>
                </div>
              </div>
            
        </div>
    </div>;
};

export default PhotoCarousel;
