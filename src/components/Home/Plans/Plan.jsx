import React from "react";
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Plan = (props) => {
    const { id, isRecommended, name, monthPrice, yearPrice, planParams, condition } = props;

    return <div className={`pricing-plan ${isRecommended && 'recommended'}`}>
        {isRecommended && <div className="recommended-badge">Recommended</div>}
        <h3>{name}</h3>
        <p className="margin-top-10">{condition}</p>
        <div className="pricing-plan-label billed-monthly-label"><strong>{monthPrice}</strong>/ monthly</div>
        <div className="pricing-plan-label billed-yearly-label"><strong>{yearPrice}</strong>/ yearly</div>
        <div className="pricing-plan-features">
            <strong>Features of {name}</strong>
            <ul>
                {planParams.map((p, i) => <li key={i+1}>{p}</li>)}
            </ul>
        </div>
        <NavLink state={{name: 'Checkout', page: 'Checkout'}} className="button full-width margin-top-20"
		to='/master-office/checkout'>Buy Now</NavLink>
    </div>;
};

export default Plan;