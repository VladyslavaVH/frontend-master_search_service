import React, { useState } from 'react';
import { StyledSlider, Track, Thumb, TOOLTIP_STYLES, TOOLTIP_ARROW, TOOLTIP_INNER_STYLES } from './StyledComponents';

const MultiRangePriceSlider = ({ payment, setPayment, min, max }) => {
    const [tooltipValues, setTooltipValues] = useState({ min, max });
    return <>
        <div className="tooltip tooltip-main top" role="presentation" 
        style={TOOLTIP_STYLES}>
            <div className="tooltip-arrow"
            style={TOOLTIP_ARROW}></div>
            <div className="tooltip-inner"
            style={TOOLTIP_INNER_STYLES}
            >${tooltipValues.min} - ${tooltipValues.max}</div>
        </div>
         <StyledSlider 
        min={min}
        max={max}
        onAfterChange={(values, index) => setPayment({ minPayment: values[0], maxPayment: values[1] })}
        onChange={(values, index) => setTooltipValues({ min: values[0], max: values[1]})}
        defaultValue={[payment.minPayment, payment.maxPayment]} 
        renderTrack={Track} 
        renderThumb={Thumb} />
     </>;
}

export default MultiRangePriceSlider;
