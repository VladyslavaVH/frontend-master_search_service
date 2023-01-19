import React from "react";
import { NavLink } from "react-router-dom";

let PricingPlans = (props) => {
    return <div className="container">
	<div className="row">

		<div className="col-xl-12">

			{/* <!-- Billing Cycle  --> */}
			<div className="billing-cycle-radios margin-bottom-70">
				<div className="radio billed-monthly-radio">
					<input id="radio-5" name="radio-payment-type" type="radio" checked onChange={() => console.log('changed')} />
					<label htmlFor="radio-5"><span className="radio-label"></span> Billed Monthly</label>
				</div>

				<div className="radio billed-yearly-radio">
					<input id="radio-6" name="radio-payment-type" type="radio" onChange={() => console.log('changed')} />
					<label htmlFor="radio-6"><span className="radio-label"></span> Billed Yearly <span className="small-label">Save 10%</span></label>
				</div>
			</div>

			{/* <!-- Pricing Plans Container --> */}
			<div className="pricing-plans-container">

				{/* <!-- Plan --> */}
				<div className="pricing-plan">
					<h3>Basic Plan</h3>
					<p className="margin-top-10">One time fee for one listing or task highlighted in search results.</p>
					<div className="pricing-plan-label billed-monthly-label"><strong>$19</strong>/ monthly</div>
					<div className="pricing-plan-label billed-yearly-label"><strong>$205</strong>/ yearly</div>
					<div className="pricing-plan-features">
						<strong>Features of Basic Plan</strong>
						<ul>
							<li>1 Listing</li>
							<li>30 Days Visibility</li>
							<li>Highlighted in Search Results</li>
						</ul>
					</div>
					{/* <a href="pages-checkout-page.html" className="button full-width margin-top-20">Buy Now</a> */}
					<NavLink state={{name: 'Checkout', page: 'Checkout'}} className="button full-width margin-top-20"
					to='/master-office/checkout'>Buy Now</NavLink>
				</div>

				{/* <!-- Plan --> */}
				<div className="pricing-plan recommended">
					<div className="recommended-badge">Recommended</div>
					<h3>Standard Plan</h3>
					<p className="margin-top-10">One time fee for one listing or task highlighted in search results.</p>
					<div className="pricing-plan-label billed-monthly-label"><strong>$49</strong>/ monthly</div>
					<div className="pricing-plan-label billed-yearly-label"><strong>$529</strong>/ yearly</div>
					<div className="pricing-plan-features">
						<strong>Features of Standard Plan</strong>
						<ul>
							<li>5 Listings</li>
							<li>60 Days Visibility</li>
							<li>Highlighted in Search Results</li>
						</ul>
					</div>
					{/* <a href="pages-checkout-page.html" className="button full-width margin-top-20">Buy Now</a> */}
					<NavLink state={{name: 'Checkout', page: 'Checkout'}} className="button full-width margin-top-20"
					to='/master-office/checkout'>Buy Now</NavLink>
				</div>

				{/* <!-- Plan --> */}
				<div className="pricing-plan">
					<h3>Extended Plan</h3>
					<p className="margin-top-10">One time fee for one listing or task highlighted in search results.</p>
					<div className="pricing-plan-label billed-monthly-label"><strong>$99</strong>/ monthly</div>
					<div className="pricing-plan-label billed-yearly-label"><strong>$1069</strong>/ yearly</div>
					<div className="pricing-plan-features">
						<strong>Features of Extended Plan</strong>
						<ul>
							<li>Unlimited Listings Listing</li>
							<li>90 Days Visibility</li>
							<li>Highlighted in Search Results</li>
						</ul>
					</div>
					{/* <a href="pages-checkout-page.html" className="button full-width margin-top-20">Buy Now</a> */}
					<NavLink state={{name: 'Checkout', page: 'Checkout'}} className="button full-width margin-top-20"
					to='/master-office/checkout'>Buy Now</NavLink>
				</div>
			</div>

		</div>

	</div>
</div>;
};

export default PricingPlans;