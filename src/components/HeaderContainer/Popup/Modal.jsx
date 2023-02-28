import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';

export default function Modal({ open, onClose, tabs, children }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!open) return null;

  const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    color: '#666',
    maxWidth: '540px',
    width: '50%',
    padding: 0,
    zIndex: 2001,
    boxShadow: '0 0 25px rgb(0 0 0 / 25%)',
  };

  const OVERLAY_STYLES = {
    top: 0,
    left: 0,    
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 2000,
    overflow: 'hidden',
    position: 'fixed',
    backgroundColor: '#111',
    opacity: 0.85,
    // -webkit-transition: opacity 0.3s ease-out;
    // -moz-transition: opacity 0.3s ease-out;
    // -o-transition: opacity 0.3s ease-out;
    transition: 'opacity 0.3s ease-out',

  };

  const BTN_CLOSE = {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2002,
    padding: '0 30px',
    margin: 'auto 0',
    height: '62px',
    borderLeft: '1px solid #e0e0e0',
    transition: 'all 0.3s, font-weight 0s'
  };

  const onSignInClick = e => {
    if (e.target.getAttribute('data-signin')) {
      setActiveTab(parseInt(e.target.getAttribute('data-signin')));      
    }
  }

  return ReactDOM.createPortal (
    <>
        <div style={OVERLAY_STYLES} onClick={onClose}></div>
        <div style={MODAL_STYLES}>
            {tabs &&
            <ul className="popup-tabs-nav">
                {tabs?.map((tab, i) => <li className={i === activeTab ? 'active' : ''} key={i}
                onClick={() => setActiveTab(i)}><a>{tab}</a></li>)}
            </ul>}
            {onClose && <button onClick={onClose} style={{...BTN_CLOSE, borderLeft: tabs ? '1px solid #e0e0e0' : '1px solid transparent' }} 
            title="Close" type="button"><i className='icon-line-awesome-close'></i></button>}
            <div onClick={onSignInClick}>{children[activeTab] || children}</div>
        </div>
    </>,
    document.getElementById('portal')
  )
}
