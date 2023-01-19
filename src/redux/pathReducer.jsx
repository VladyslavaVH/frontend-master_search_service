import '../api/api';

let initialState = {
    imgPath: '/images/',
    flagPath: '/images/flags/',
    userPlaceholder: 'user-avatar-placeholder.png',
    jobPlaceholder: 'job-logo-placeholder.png',
    backgroundImage: 'home-background.jpg',
    slickSettings: {
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
    },
    popupSettings: {
      type: 'inline',
  
      fixedContentPos: false,
      fixedBgPos: true,
  
      overflowY: 'auto',
  
      closeBtnInside: true,
      closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
      preloader: false,
  
      midClick: true,
      removalDelay: 300,
      mainClass: 'my-mfp-zoom-in'
    },
};

const pathReducer = (state = initialState, action) => {
    switch (action.type) {
        case 1:
            return {
                ...state,
                ...action.data
            };
    
        default:
            return state;
    }
};

export default pathReducer;