import React, { useEffect } from "react";
import $ from 'jquery';

const CommentPopup = (props) => {
    const popupSettings = {
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
      };
    
    useEffect(() => {
        $('.popup-with-zoom-anim').magnificPopup(popupSettings);

        $('.popup-tabs-nav').each(function() {
            var listCount = $(this).find("li").length;
            if ( listCount < 2 ) {
                $(this).css({
                    'pointer-events': 'none'
                });
            }
        });
        
        /*
        // Snackbar for copy to clipboard button
        $('.copy-url-button').on('click', function() { 
            Snackbar.show({
                text: 'Copied to clipboard!',
            }); 
        }); 
        */
    }, []);

    return <div id="small-dialog" className="zoom-anim-dialog mfp-hide dialog-with-tabs">

        <div className="sign-in-form">

            <ul className="popup-tabs-nav">
                <li className="active"><a href="#tab">Apply for a Job</a></li>
            </ul>

            <div className="popup-tabs-container">
                <div className="popup-tab-content" id="loginn">

                    {/* <div className="welcome-text">
                        <h3>Offer</h3>
                    </div> */}

                    <form method="post" id="make-an-offer-form">                    
                        <div className="submit-field">
                            <h5>Proposed Payment</h5>
                            <div className="input-with-icon">
                                <input className="with-border" type="text" placeholder="100" />
                                <i className="currency">USD</i>
                            </div>
                        </div>
                    

                        <div className="submit-field">
                            <h5>Suggested Lead Time</h5>
                            <textarea cols="10" rows="2" placeholder="I will manage for ..." className="with-border"></textarea>
                        </div>
                    </form>

                    <button className="button full-width button-sliding-icon ripple-effect" type="submit" form="make-an-offer-form">Apply for a Job <i className="icon-material-outline-arrow-right-alt"></i></button>

                </div>

            </div>
        </div>
    </div>;
}

export default CommentPopup;
