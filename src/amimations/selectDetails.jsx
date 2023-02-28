import { components } from "react-select";
import React from 'react';

export const LocationDropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <i style={{ fontSize: '20px' }} className="icon-material-outline-location-on"></i>
        </components.DropdownIndicator>
    );
};

export const FooterDropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <i style={{ fontSize: '20px',
                transform: (props.isFocused && props.selectProps.menuIsOpen) ? 'rotate(180deg)' : 'rotate(0deg)', 
                color: (props.isFocused && props.selectProps.menuIsOpen) ? '#fff' : '#808080', 
                transition: '0.4s' 
            }} className="icon-material-outline-arrow-drop-down"></i>
        </components.DropdownIndicator>
    );
};

export const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <i style={{ fontSize: '20px',
                transform: (props.isFocused && props.selectProps.menuIsOpen) ? 'rotate(180deg)' : 'rotate(0deg)', 
                transition: '0.4s' 
            }} className="icon-material-outline-arrow-drop-down"></i>
        </components.DropdownIndicator>
    );
};

export const Option = ({ isSelected, children, ...rest }) => {
    return (
        <components.Option {...rest} isSelected={isSelected}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {children}
                <i style={{ color: '#2a41e8', transform: isSelected ? 'scale(1)' : 'scale(0)', transition: '0.3s' }} className="icon-feather-check"></i>
            </div>
        </components.Option>
    );
};

export const ValueContainer = ({ children, ...props }) => {
    return (
        <components.ValueContainer {...props}>
            <components.Placeholder {...props} isFocused={props.isFocused}>
                {props.selectProps.placeholder}
            </components.Placeholder>
            {React.Children.map(children, child =>
                child && child.type !== components.Placeholder ? child : null
                //child && child.key !== 'placeholder' ? child : null
            )}
        </components.ValueContainer>
    );
};

export const FOOTER_LANG_SELECT_STYLES = {
    container: (baseStyles, state) => ({
        ...baseStyles,
        minWidth: '110px',
        width: 'max-content',
        height: '44px',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        borderRadius: '4px',
        border: 'none',
        boxShadow: 'none',
    }),
    control: (baseStyles, state) => ({
        ...baseStyles,
        maxHeight: '44px',
        minWidth: '110px',
        cursor: 'pointer',
        backgroundColor: (state.isFocused && state.menuIsOpen) ? '#2a41e8' : '#444',
        border: 'none',
        borderRadius: '4px',
        border: 'none',
        boxShadow: 'none',
        ':hover': {
            backgroundColor: '#2a41e8',
            color: '#fff',
        },
        '&:hover .css-1wloack-indicatorContainer': {
            color: '#fff'
        }
    }),
    valueContainer: (baseStyles, state) => ({
        ...baseStyles,
        maxHeight: '44px',
        minWidth: '110px',
        padding: 0,
        cursor: 'pointer',
        backgroundColor: 'transparent',
        borderRadius: '4px',
        border: 'none',
    }),
    singleValue: (baseStyles, state) => ({
        ...baseStyles,
        color: '#fff',
        width: 'max-content',
        border: 'none',
        marginLeft: '18px',
    }),
    input: (baseStyles, state) => ({
        ...baseStyles,
        maxHeight: '44px',
        padding: 0,
        margin: 0,
        opacity: 0,
        '::after': {
            opacity: 0,
        },
        cursor: 'pointer',
        backgroundColor: 'transparent',
        borderRadius: '4px',
        border: 'none',
    }),
    indicatorSeparator: (baseStyles, state) => ({
        display: 'none',
    }),
    indicatorsContainer: (baseStyles, state) => ({
        padding: '0',
        marginRight: '18px',
        ':hover': {
            color: '#fff'
        }
    }),
    dropdownIndicator: (baseStyles, state) => ({
        ...baseStyles,
        padding: 0,
        //color: (state.isFocused && state.menuIsOpen) ? '#fff' : '#808080',
    }),
    menu: (baseStyles, state) => ({
        ...baseStyles,
        minWidth: '160px',
        position: 'absolute',
        left: 'auto',
        right: 0,
        top: 'calc(100% + 15px)',
        transition: '0.4s',
        display: 'block',
        //zIndex: 1000,
        float: 'left',
        textAlign: 'left',
        padding: '10px',
        margin: '-4px 0 0 0',
        backgroundColor: '#fff',
        borderRadius: '4px',
        border: 'none',
        boxShadow: '0 1px 4px 0px rgb(0 0 0 / 12%)',
        '::before': {
            position: 'absolute',
            content: '"<i class="icon-material-outline-arrow-drop-up"></i>"',
            top: '-5px',
            right: '20px',
            boxSizing: 'border-box',

        }

    }),
    option: (baseStyles, state) => ({
        ...baseStyles,
        cursor: 'pointer',
        userSelect: 'none',
        display: 'block',
        padding: '7px 10px',
        clear: 'both',
        fontWeight: 'normal',
        lineHeight: '21px',
        borderRadius: '4px',
        outline: 'none !important',
        transition: '0.3s',
        boxSizing: 'border-box',
        color: '#808080',
        backgroundColor: 'transparent',
        ':hover': {
            backgroundColor: 'rgba(42,65,232,0.07)',
            color: '#2a41e8'
        },
    }),
};

export const SINGLE_SELECT_STYLES = {
    container: (baseStyles, state) => ({
        ...baseStyles,
        maxHeight: '48px',
        cursor: 'pointer',
        border: 'none',
        boxShadow: '0 1px 4px 0px rgb(0 0 0 / 12%)',
        float: 'none',
        display: 'flex',
        marginLeft: 0,
        boxSizing: 'border-box',
        width: '100%',
        cursor: 'pointer',
        border: 'none',

    }),
    control: (baseStyles, state) => ({
        ...baseStyles,
        maxHeight: '48px',
        border: 'none',
        width: '100%',
        cursor: 'pointer',
        border: 'none',
        boxShadow: 'none',
        //zIndex: 1010,
    }),
    valueContainer: (baseStyles, state) => ({
        ...baseStyles,
        maxHeight: '48px',
        minWidth: '110px',
        padding: 0,
        cursor: 'pointer',
        backgroundColor: 'transparent',
        borderRadius: '4px',
        border: 'none',
    }),
    singleValue: (baseStyles, state) => ({
        ...baseStyles,
        color: '#808080',
        width: 'max-content',
        border: 'none',
        marginLeft: '18px',
    }),
    input: (baseStyles, state) => ({
        ...baseStyles,
        maxHeight: '48px',
        padding: 0,
        margin: 0,
        opacity: 0,
        '::after': {
            opacity: 0,
        },
        cursor: 'pointer',
        backgroundColor: 'transparent',
        borderRadius: '4px',
        border: 'none',
    }),
    indicatorSeparator: (baseStyles, state) => ({
        display: 'none',
    }),
    indicatorsContainer: (baseStyles, state) => ({
        ...baseStyles,
        marginRight: 20,
    }),
    dropdownIndicator: (baseStyles, state) => ({
        ...baseStyles,
        padding: 0,
        margin: 0,
        color: '#808080',
    }),
    menu: (baseStyles, state) => ({
        ...baseStyles,
        margin: '-4px 0 0 0',
        overflow: 'hidden',
        pointerEvents: 'all',
        visibility: 'visible',
        minWidth: '100%',
        boxSizing: 'border-box',
        fontSize: 16,
        display: 'block',
        transition: '0.4s',
        position: 'absolute',
        top: '100%',
        left: 0,
        zIndex: 100,
        float: 'left',
        padding: '10px 5px',
        textAlign: 'left',
	    borderBottomLeftRadius: '4px',
	    borderBottomRightRadius: '4px',
        boxShadow: '0 2px 3.5px 0px rgb(0 0 0 / 12%)',
        backgroundColor: '#fff',
        
    }),
    menuList: (base) => ({
        ...base,
        maxHeight: '265px', 
        paddingRight: '5px',
        paddingLeft: '5px',
        "::-webkit-scrollbar": {
          width: "5px",
          height: "0px",
        },
        "::-webkit-scrollbar-track": {
          background: "rgba(0,0,0,0.0)",
          borderRadius: "12px",
        },
        "::-webkit-scrollbar-thumb": {
            borderRadius: "12px",
            background: "#d8d8d8"
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#c8c8c8"
        }
      }),
    option: (baseStyles, state) => ({
        ...baseStyles,
        cursor: 'pointer',
        userSelect: 'none',
        display: 'block',
        padding: '7px 10px',
        clear: 'both',
        fontWeight: 'normal',
        lineHeight: '21px',
        borderRadius: '4px',
        outline: 'none !important',
        transition: '0.3s',
        color: '#808080',
        backgroundColor: 'transparent',
        ':hover': {
            backgroundColor: 'rgba(42,65,232,0.07)',
            color: '#2a41e8',
        }
    }),
};

export const CATEGORY_SELECT_STYLES = {
    indicatorSeparator: (baseStyles, state) => ({
        display: 'none',
    }),
    multiValue: (baseStyles, state) => ({
        display: "none"
    }),
    container: (baseStyles, state) => ({
        ...baseStyles,
        maxHeight: '48px',
        cursor: 'pointer',
        border: 'none',
        boxShadow: '0 1px 4px 0px rgb(0 0 0 / 12%)',
        float: 'none',
        display: 'flex',
        marginLeft: 0,
        boxSizing: 'border-box',
        width: '100%',
        cursor: 'pointer',
        border: 'none',

    }),
    control: (baseStyles, state) => ({
        ...baseStyles,
        maxHeight: '48px',
        border: 'none',
        width: '100%',
        cursor: 'pointer',
        border: 'none',
        boxShadow: 'none',
        //zIndex: 1010,
    }),
    valueContainer: (baseStyles, state) => ({
        ...baseStyles,
        maxHeight: '48px',
        width: 'max-content',
        //marginLeft: 20,
        padding: 0,
        border: 'none',
        overflow: 'visible',//?
    }),
    placeholder: (baseStyles, state) => ({
        ...baseStyles,
        position: 'absolute',
        left: 20,
        //zIndex: 1011,
        overflow: 'hidden',
        width: '100%',
        lineHeight: '48px',
        textAlign: 'left',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        maxWidth: '90%',
        float: 'left',
        height: '48px',
        display: 
        state.isFocused || state.isSelected || state.selectProps.inputValue || state.value
        ? 'block'
        : 'block',
        color: '#808080',
        fontWeight: 500,
        fontFamily: '"Nunito", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif',
        textTransform: 'none',
        cursor: 'pointer',
    }),
    singleValue: (baseStyles, state) => ({
        ...baseStyles,
        fontFamily: '"Nunito", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif',
        textTransform: 'none',
        color: '#666',
        lineHeight: '27px',
        fontSize: 16,
        textAlign: 'left',
    }),
    input: (baseStyles, state) => ({
        ...baseStyles,
        padding: 0,
        margin: 0,
        maxHeight: '48px',
        opacity: 0,
        border: 'none',
    }),
    indicatorsContainer: (baseStyles, state) => ({
        ...baseStyles,
        marginRight: 20,

    }),
    dropdownIndicator: (baseStyles, state) => ({
        ...baseStyles,
        padding: 0,
        margin: 0,
        color: '#808080',
    }),
    menu: (baseStyles, state) => ({
        ...baseStyles,
        margin: '-4px 0 0 0',
        overflow: 'hidden',
        pointerEvents: 'all',
        visibility: 'visible',
        minWidth: '100%',
        boxSizing: 'border-box',
        fontSize: 16,
        display: 'block',
        transition: '0.4s',
        position: 'absolute',
        top: '100%',
        left: 0,
        zIndex: 30,
        float: 'left',
        padding: '10px 5px',
        textAlign: 'left',
	    borderBottomLeftRadius: '4px',
	    borderBottomRightRadius: '4px',
        boxShadow: '0 2px 3.5px 0px rgb(0 0 0 / 12%)',
        backgroundColor: '#fff',
        
    }),
    menuList: (base) => ({
        ...base,
        maxHeight: '265px', 
        paddingRight: '5px',
        paddingLeft: '5px',
        "::-webkit-scrollbar": {
          width: "5px",
          height: "0px",
        },
        "::-webkit-scrollbar-track": {
          background: "rgba(0,0,0,0.0)",
          borderRadius: "12px",
        },
        "::-webkit-scrollbar-thumb": {
            borderRadius: "12px",
            background: "#d8d8d8"
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#c8c8c8"
        }
      }),
    option: (baseStyles, state) => ({
        ...baseStyles,
        cursor: 'pointer',
        userSelect: 'none',
        display: 'block',
        padding: '7px 10px',
        clear: 'both',
        fontWeight: 'normal',
        lineHeight: '21px',
        borderRadius: '4px',
        outline: 'none !important',
        transition: '0.3s',
        color: '#808080',
        backgroundColor: 'transparent',
        ':hover': {
            backgroundColor: 'rgba(42,65,232,0.07)',
            color: '#2a41e8',
        }
    }),
};

export const LOCATION_AUTOCOMPLETE_STYLES = {
    indicatorSeparator: (baseStyles, state) => ({
        display: 'none',
    }),
    multiValue: (baseStyles, state) => ({
        display: "none"
    }),
    container: (baseStyles, state) => ({
        ...baseStyles,
        maxHeight: '48px',
        cursor: 'text',
        border: 'none',
        boxShadow: '0 1px 4px 0px rgb(0 0 0 / 12%)',
        float: 'none',
        display: 'flex',
        marginLeft: 0,
        boxSizing: 'border-box',
        width: '100%',
        cursor: 'pointer',
        border: 'none',

    }),
    control: (baseStyles, state) => ({
        ...baseStyles,
        maxHeight: '48px',
        border: 'none',
        width: '100%',
        cursor: 'text',
        border: 'none',
        boxShadow: 'none',
        //zIndex: 1010,
    }),
    valueContainer: (baseStyles, state) => ({
        ...baseStyles,
        maxHeight: '48px',
        width: 'max-content',
        //marginLeft: 20,
        padding: 0,
        border: 'none',
        overflow: 'visible',//?
        cursor: 'text',
    }),
    placeholder: (baseStyles, state) => ({
        ...baseStyles,
        position: 'absolute',
        left: 20,
        //zIndex: 1011,
        overflow: 'hidden',
        width: '100%',
        lineHeight: '48px',
        textAlign: 'left',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        maxWidth: '90%',
        float: 'left',
        height: '48px',
        display: 
        state.isFocused || state.isSelected || state.selectProps.inputValue || state.value
        ? 'block'
        : 'block',
        color: '#808080',
        fontWeight: 500,
        fontFamily: '"Nunito", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif',
        textTransform: 'none',
        cursor: 'text',
    }),
    singleValue: (baseStyles, state) => ({
        ...baseStyles,
        fontFamily: '"Nunito", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif',
        textTransform: 'none',
        color: '#666',
        lineHeight: '27px',
        fontSize: 16,
        textAlign: 'left',
    }),
    input: (baseStyles, state) => ({
        ...baseStyles,
        padding: 0,
        margin: 0,
        maxHeight: '48px',
        //opacity: 0,
        border:  state.isFocused ? 'none !important' : 'none !important',
        boxShadow: state.isFocused ? 'none !important' : 'none !important',
        ':focus': {
            border:  'none !important',
            boxShadow: 'none !important',
        },
        fontFamily: '"Nunito", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif',
        textTransform: 'none',
        color: '#666',
        lineHeight: '27px',
        fontSize: 16,
        textAlign: 'left',
        maxHeight: '48px',
        width: '100%',
        marginLeft: '20px',
        padding: 0,
        border: 'none',
        cursor: 'text',

    }),
    indicatorsContainer: (baseStyles, state) => ({
        ...baseStyles,
        marginRight: 20,
    }),
    dropdownIndicator: (baseStyles, state) => ({
        ...baseStyles,
        padding: 0,
        margin: 0,
        color: '#808080',
    }),
    menu: (baseStyles, state) => ({
        ...baseStyles,
        margin: '-4px 0 0 0',
        overflow: 'hidden',
        pointerEvents: 'all',
        visibility: 'visible',
        minWidth: '100%',
        boxSizing: 'border-box',
        fontSize: 16,
        display: 'block',
        transition: '0.4s',
        position: 'absolute',
        top: '100%',
        left: 0,
        //zIndex: 1000,
        float: 'left',
        padding: '10px 5px',
        textAlign: 'left',
        borderBottomLeftRadius: '4px',
	    borderBottomRightRadius: '4px',
        boxShadow: '0 2px 3.5px 0px rgb(0 0 0 / 12%)',
        backgroundColor: '#fff',
        cursor: 'default',
    }),
    menuList: (base) => ({
        ...base,
        maxHeight: '265px', 
        paddingRight: '5px',
        paddingLeft: '5px',
        "::-webkit-scrollbar": {
          width: "5px",
          height: "0px",
        },
        "::-webkit-scrollbar-track": {
          background: "rgba(0,0,0,0.0)",
          borderRadius: "12px",
        },
        "::-webkit-scrollbar-thumb": {
            borderRadius: "12px",
            background: "#d8d8d8"
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#c8c8c8"
        },
        cursor: 'default',
      }),
    option: (baseStyles, state) => ({
        ...baseStyles,
        cursor: 'pointer',
        userSelect: 'none',
        display: 'block',
        padding: '7px 10px',
        clear: 'both',
        fontWeight: 'normal',
        lineHeight: '21px',
        borderRadius: '4px',
        outline: 'none !important',
        transition: '0.3s',
        color: '#808080',
        backgroundColor: 'transparent',
        ':hover': {
            backgroundColor: 'rgba(42,65,232,0.07)',
            color: '#2a41e8',
        }
    }),
    noOptionsMessage: (baseStyles, state) => ({
        ...baseStyles,
        cursor: 'default',
        userSelect: 'none',
        display: 'block',
        padding: '7px 10px',
        clear: 'both',
        fontWeight: 'normal',
        lineHeight: '21px',
        borderRadius: '4px',
        outline: 'none !important',
        transition: '0.3s',
        color: '#808080',
        backgroundColor: 'transparent',
    }),
};