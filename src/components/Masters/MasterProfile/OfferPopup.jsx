import React, { useEffect } from "react";
import $ from 'jquery';

const OfferPopup = (props) => {
    const { popupSettings } = props;
    
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
        $('#snackbar-user-status label').on('click', function() { 
            Snackbar.show({
                text: 'Your status has been changed!',
                pos: 'bottom-center',
                showAction: false,
                actionText: "Dismiss",
                duration: 3000,
                textColor: '#fff',
                backgroundColor: '#383838'
            }); 
        }); 
        
        // Snackbar for "place a bid" button
        $('#snackbar-place-bid').on('click',function() { 
            Snackbar.show({
                text: 'Your bid has been placed!',
            }); 
        }); 
        
        
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
                <li><a href="#tab">Make an Offer</a></li>
            </ul>

            <div className="popup-tabs-container">

                <div className="popup-tab-content" id="tab">

                    <div className="welcome-text">
                        <h3>Discuss your project with David</h3>
                    </div>

                    <form method="post">

                        <div className="input-with-icon-left">
                            <i className="icon-material-outline-account-circle"></i>
                            <input type="text" className="input-text with-border" name="name" id="name" placeholder="First and Last Name" />
                        </div>

                        <div className="input-with-icon-left">
                            <i className="icon-material-baseline-mail-outline"></i>
                            <input type="text" className="input-text with-border" name="emailaddress" id="emailaddress" placeholder="Email Address" />
                        </div>

                        <textarea name="textarea" cols="10" placeholder="Message" className="with-border"></textarea>

                        <div className="uploadButton margin-top-25">
                            <input className="uploadButton-input" type="file" accept="image/*, application/pdf" id="upload" multiple />
                            <label className="uploadButton-button ripple-effect" htmlFor="upload">Add Attachments</label>
                            <span className="uploadButton-file-name">Allowed file types: zip, pdf, png, jpg <br /> Max. files size: 50 MB.</span>
                        </div>

                    </form>

                    <button className="button margin-top-35 full-width button-sliding-icon ripple-effect" type="submit">Make an Offer <i className="icon-material-outline-arrow-right-alt"></i></button>

                </div>
                <div className="popup-tab-content" id="loginn">

                    <div className="welcome-text">
                        <h3>Discuss Your Project With Tom</h3>
                    </div>

                    <form method="post" id="make-an-offer-form">

                        <div className="input-with-icon-left">
                            <i className="icon-material-outline-account-circle"></i>
                            <input type="text" className="input-text with-border" name="name2" id="name2" placeholder="First and Last Name" required />
                        </div>

                        <div className="input-with-icon-left">
                            <i className="icon-material-baseline-mail-outline"></i>
                            <input type="text" className="input-text with-border" name="emailaddress2" id="emailaddress2" placeholder="Email Address" required />
                        </div>

                        <textarea name="textarea" cols="10" placeholder="Message" className="with-border"></textarea>

                        <div className="uploadButton margin-top-25">
                            <input className="uploadButton-input" type="file" accept="image/*, application/pdf" id="upload-cv" multiple />
                            <label className="uploadButton-button" htmlFor="upload-cv">Add Attachments</label>
                            <span className="uploadButton-file-name">Allowed file types: zip, pdf, png, jpg <br /> Max. files size: 50 MB.</span>
                        </div>

                    </form>

                    <button className="button full-width button-sliding-icon ripple-effect" type="submit" form="make-an-offer-form">Make an Offer <i className="icon-material-outline-arrow-right-alt"></i></button>

                </div>

            </div>
        </div>
    </div>;
}

export default OfferPopup;
