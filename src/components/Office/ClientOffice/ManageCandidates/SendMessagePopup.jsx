import React, { useEffect } from "react";
import $ from 'jquery';

const SendMessagePopup = (props) => {
    const { popupSettings } = props;

    useEffect(() => {
        $('.popup-with-zoom-anim').magnificPopup(popupSettings);

        $('.popup-tabs-nav').each(function () {
            var listCount = $(this).find("li").length;
            if (listCount < 2) {
                $(this).css({
                    'pointer-events': 'none'
                });
            }
        });
    }, []);

    return <div id="small-dialog" className="zoom-anim-dialog mfp-hide dialog-with-tabs">

        {/* <!--Tabs --> */}
        <div className="sign-in-form">

            <ul className="popup-tabs-nav">
                <li><a href="#tab">Send Message</a></li>
            </ul>

            <div className="popup-tabs-container">

                {/* <!-- Tab --> */}
                <div className="popup-tab-content" id="tab">

                    {/* <!-- Welcome Text --> */}
                    <div className="welcome-text">
                        <h3>Direct Message To Sindy</h3>
                    </div>

                    {/* <!-- Form --> */}
                    <form method="post" id="send-pm">
                        <textarea name="textarea" cols="10" placeholder="Message" className="with-border" required></textarea>
                    </form>

                    {/* <!-- Button --> */}
                    <button className="button full-width button-sliding-icon ripple-effect" type="submit" form="send-pm">Send <i className="icon-material-outline-arrow-right-alt"></i></button>

                </div>

            </div>
        </div>
    </div>;
}

export default SendMessagePopup;
