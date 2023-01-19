import React from "react";

const IntroHeadline = (props) => {
    const siteName = process.env.REACT_APP_SITE_NAME;
    
    return <div className="row">
        <div className="col-md-12">
            <div className="banner-headline">
                <h3>
                    <strong>Hire experts or be hired for any job, any time.</strong>
                    <br />
                    <span>Thousands of small businesses use <strong className="color">{siteName}</strong> to turn their ideas into reality.</span>
                </h3>
            </div>
        </div>
    </div>;
};

export default IntroHeadline;
