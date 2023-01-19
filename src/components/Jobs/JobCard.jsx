import React from 'react';

const JobCard = (props) => {
    const { id, title, clientName, isClientVerified, category, location, minPayment, maxPayment, postedDate } = props;
    return <a href className="job-listing">
        <div className="job-listing-details">
            <div className="job-listing-description">
                <h4 className="job-listing-company">{clientName} {isClientVerified && <span className="verified-badge" title="Verified Employer" data-tippy-placement="top"></span>}</h4>
                <h3 className="job-listing-title">{title}</h3>
            </div>
        </div>

        <div className="job-listing-footer">
            <ul>
                <li><i className="icon-material-outline-location-on"></i> {location}</li>
                <li><i className="icon-material-outline-business-center"></i> {category}</li>
                <li><i className="icon-material-outline-account-balance-wallet"></i> ${minPayment}-${maxPayment}</li>
                <li><i className="icon-material-outline-access-time"></i> {postedDate}</li>
            </ul>
        </div>
    </a>;
}

export default JobCard;
