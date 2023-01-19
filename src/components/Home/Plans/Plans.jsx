import React from "react";
import BillingCycle from "./BillingCycle";
import Plan from "./Plan";

const Plans = (props) => {
    return <div className="section padding-top-60 padding-bottom-75">
        <div className="container">
            <div className="row">

                <div className="col-xl-12">

                    <div className="section-headline centered margin-top-0 margin-bottom-35">
                        <h3>Membership Plans</h3>
                    </div>

                    <div className="col-xl-12">

                        {/* <!-- BillingCycle  --> */}
                        <BillingCycle percent={10} />

                        <div className="pricing-plans-container">
                            {props.plans.map((p) => <Plan key={p.id} {...p} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default Plans;
