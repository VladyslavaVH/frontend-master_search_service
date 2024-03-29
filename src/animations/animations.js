import $ from 'jquery';

export function mmenuInit() {
    let wi = $(window).width();
    if(wi <= '1099') {

        $(".mmenu-init" ).remove();
        $("#navigation").clone().addClass("mmenu-init").insertBefore("#navigation").removeAttr('id').removeClass('style-1 style-2')
                        .find('ul, div').removeClass('style-1 style-2 mega-menu mega-menu-content mega-menu-section').removeAttr('id');
        $(".mmenu-init").find("ul").addClass("mm-listview");
        $(".mmenu-init").find(".mobile-styles .mm-listview").unwrap();


        $(".mmenu-init").mmenu({
             "counters": true
        }, {
         // configuration
         offCanvas: {
            pageNodetype: "#wrapper"
         }
        });

        let mmenuAPI = $(".mmenu-init").data( "mmenu" );
        let $icon = $(".mmenu-trigger .hamburger");

        $(".mmenu-trigger").on('click', function() {
            mmenuAPI.open();
        });

    }
    $(".mm-next").addClass("mm-fullsubopen");
};

export function stickyHeader() {

    $(window).on('scroll load', function() {

        if($(window).width() < '1099') { 
            $("#header-container").removeClass("cloned");
        }
        
        if($(window).width() > '1099') {

            // CSS adjustment
            $("#header-container").css({
                position: 'fixed',
            });
    
            let headerOffset = $("#header-container").height();

            if($(window).scrollTop() >= headerOffset){
                $("#header-container").addClass('cloned');
                $(".wrapper-with-transparent-header #header-container").addClass('cloned').removeClass("transparent-header unsticky");
            } else {
                $("#header-container").removeClass("cloned");
                $(".wrapper-with-transparent-header #header-container").addClass('transparent-header unsticky').removeClass("cloned");
            }

            // Sticky Logo
            let transparentLogo = $('#header-container #logo img').attr('data-transparent-logo');
            let stickyLogo = $('#header-container #logo img').attr('data-sticky-logo');

            if( $('.wrapper-with-transparent-header #header-container').hasClass('cloned')) {
                $("#header-container.cloned #logo img").attr("src", stickyLogo);
            } 

            if( $('.wrapper-with-transparent-header #header-container').hasClass('transparent-header')) {
                $("#header-container #logo img").attr("src", transparentLogo);
            } 

            $(window).on('load resize', function() {
                let headerOffset = $("#header-container").height();
                $("#wrapper").css({'padding-top': headerOffset});
            });
        }
    });
};

export function close_user_dropdown() {
    $('.header-notifications').removeClass("active");
};

export const inlineBG = () => {
    $(".single-page-header, .intro-banner").each(function() {
        let attrImageBG = $(this).attr('data-background-image');

        if(attrImageBG !== undefined) {
            $(this).append('<div class="background-image-container"></div>');
            $('.background-image-container').css('background-image', 'url('+attrImageBG+')');
        }
    });
};

export const starsOutput = (firstStar, secondStar, thirdStar, fourthStar, fifthStar) => {
    return ('' +
        '<span class="' + firstStar + '"></span>' +
        '<span class="' + secondStar + '"></span>' +
        '<span class="' + thirdStar + '"></span>' +
        '<span class="' + fourthStar + '"></span>' +
        '<span class="' + fifthStar + '"></span>');
}

export const starRating = () => {
    let ratingElem = '.star-rating';

    $(ratingElem).each(function () {

        let dataRating = $(this).attr('data-rating');

        let fiveStars = starsOutput('star', 'star', 'star', 'star', 'star');

        let fourHalfStars = starsOutput('star', 'star', 'star', 'star', 'star half');
        let fourStars = starsOutput('star', 'star', 'star', 'star', 'star empty');

        let threeHalfStars = starsOutput('star', 'star', 'star', 'star half', 'star empty');
        let threeStars = starsOutput('star', 'star', 'star', 'star empty', 'star empty');

        let twoHalfStars = starsOutput('star', 'star', 'star half', 'star empty', 'star empty');
        let twoStars = starsOutput('star', 'star', 'star empty', 'star empty', 'star empty');

        let oneHalfStar = starsOutput('star', 'star half', 'star empty', 'star empty', 'star empty');
        let oneStar = starsOutput('star', 'star empty', 'star empty', 'star empty', 'star empty');

        // Rules
        if (dataRating >= 4.75) {
            $(this).append(fiveStars);
        } else if (dataRating >= 4.25) {
            $(this).append(fourHalfStars);
        } else if (dataRating >= 3.75) {
            $(this).append(fourStars);
        } else if (dataRating >= 3.25) {
            $(this).append(threeHalfStars);
        } else if (dataRating >= 2.75) {
            $(this).append(threeStars);
        } else if (dataRating >= 2.25) {
            $(this).append(twoHalfStars);
        } else if (dataRating >= 1.75) {
            $(this).append(twoStars);
        } else if (dataRating >= 1.25) {
            $(this).append(oneHalfStar);
        } else if (dataRating < 1.25) {
            $(this).append(oneStar);
        }

    });
};

export function funFacts() {
    /*jslint bitwise: true */
    function hexToRgbA(hex){
        let c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.07)';
        }
    }

    $(".fun-fact").each(function() {
        let factColor = $(this).attr('data-fun-fact-color');

        if(factColor !== undefined) {
            $(this).find(".fun-fact-icon").css('background-color', hexToRgbA(factColor));
            $(this).find("i").css('color', factColor);
        }
    });

};

// Wrapper Height (window height - header height)
export function wrapperHeight() {
    let headerHeight = $("#header-container").outerHeight();
    let windowHeight = $(window).outerHeight() - headerHeight;
    $('.full-page-content-container, .dashboard-content-container, .dashboard-sidebar-inner, .dashboard-container, .full-page-container').css({ height: windowHeight });
    $('.dashboard-content-inner').css({ 'min-height': windowHeight });
}

// Enabling Scrollbar
export function fullPageScrollbar() {
    $(".full-page-sidebar-inner, .dashboard-sidebar-inner").each(function() {

        let headerHeight = $("#header-container").outerHeight();
        let windowHeight = $(window).outerHeight() - headerHeight;
        let sidebarContainerHeight = $(this).find(".sidebar-container, .dashboard-nav-container").outerHeight();

        // Enables scrollbar if sidebar is higher than wrapper
        if (sidebarContainerHeight > windowHeight) {
            $(this).css({ height: windowHeight });
    
        } else {
            $(this).find('.simplebar-track').hide();
        }
    });
}

export function avatarSwitcher() {
    let readURL = function(input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic').attr('src', e.target.result);
            };
    
            reader.readAsDataURL(input.files[0]);
        }
    };
   
    $(".file-upload").on('change', function(){
        readURL(this);
    });
    
    $(".upload-button").on('click', function() {
       $(".file-upload").click();
    });
}

export function responsiveDashboardNavTrigger () {
    $('.dashboard-responsive-nav-trigger').on('click', function(e){
        e.preventDefault();
        $(this).toggleClass('active');
    
        let dashboardNavContainer = $('body').find(".dashboard-nav");
    
        if( $(this).hasClass('active') ){
            $(dashboardNavContainer).addClass('active');
        } else {
            $(dashboardNavContainer).removeClass('active');
        }
    
        $('.dashboard-responsive-nav-trigger .hamburger').toggleClass('is-active');
    
    });
};

