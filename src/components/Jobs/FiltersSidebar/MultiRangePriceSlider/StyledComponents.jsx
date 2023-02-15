import ReactSlider from 'react-slider'
import styled from 'styled-components';

export const TOOLTIP_STYLES = { 
    left: '50%',
    marginTop: '-40px',
    transform: 'translateX(-50%)',
    position: 'absolute',
};

export const TOOLTIP_ARROW = {
    position: 'absolute',
    width: 0,
    height: 0,
    bottom: '-6px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderTop: '6px solid #333'
};

export const TOOLTIP_INNER_STYLES = {
    whiteSpace: 'nowrap',
    maxWidth: 'none',
    backgroundColor: '#333',
    padding: '4px 12px',
    lineHeight: '21px',
    color: '#fff',
    fontSize: '14px',
    borderRadius: '4px',
};

export const StyledSlider = styled(ReactSlider)`
    width: 100%;
    height: 20px;
`;

const StyledThumb = styled.div`
    background-color: #fff;
    position: absolute;
    top: -45%;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border: 2px solid #2a41e8;
    cursor: pointer;
    z-index: 20;
    border-radius: 50%;
    box-shadow: 0 0 0px 6px rgb(42 65 232 / 12%);
    cursor: pointer;
    &:hover {
        box-shadow: 0 0 0px 8px rgb(42 65 232 / 12%);
        transition: 0.2s;
    }
`;

export const Thumb = (props, state) => <StyledThumb {...props}></StyledThumb>;

const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${props => (props.index === 1 ? '#2a41e8' : '#e0e0e0')};
    height: 3px;
    border-radius: 4px;
    cursor: pointer;
`;

export const Track = (props, state) => <StyledTrack {...props} index={state.index} />;