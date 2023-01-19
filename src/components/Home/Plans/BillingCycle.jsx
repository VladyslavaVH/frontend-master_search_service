import React, { useEffect } from "react";
import $ from 'jquery';

const BillingCycle = (props) => {
    const { percent } = props;

    useEffect(() => {
        $('.billing-cycle-radios').on("click", function() {
            if($('.billed-yearly-radio input').is(':checked')) { $('.pricing-plans-container').addClass('billed-yearly'); }
            if($('.billed-monthly-radio input').is(':checked')) { $('.pricing-plans-container').removeClass('billed-yearly'); }
        });
    }, []);

    return <div className="billing-cycle-radios margin-bottom-70">
        <div className="radio billed-monthly-radio">
            <input id="radio-5" name="radio-payment-type" type="radio" checked onChange={() => {}} />
            <label htmlFor="radio-5"><span className="radio-label"></span> Billed Monthly</label>
        </div>

        <div className="radio billed-yearly-radio">
            <input id="radio-6" name="radio-payment-type" type="radio" onChange={() => {}} />
            <label htmlFor="radio-6"><span className="radio-label"></span> Billed Yearly <span className="small-label">Save {percent}%</span></label>
        </div>
    </div>;
}

export default BillingCycle;
