import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

export default function Modal({ open, onClose, tabs, children }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const modalWindow = useRef(null);
  const [modalHeight, setModalHeight] = useState(0);

  useLayoutEffect(() => {
    setModalHeight(modalWindow?.current?.offsetHeight);
  });

  if (!open) return null;
  else {
    window.scrollTo(0,0);
  }

  const MODAL_STYLES = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    color: '#666',
    maxWidth: '540px',
    width: '50%',
    minWidth: '394px',
    padding: 0,
    marginRight: '10px',
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
    margin: 'auto 0',
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
        <div ref={modalWindow} style={{
          ...MODAL_STYLES,
          top: modalHeight > window.innerHeight 
               ? document.body.clientWidth >= 480 ? '60%' : '61%'
               : document.body.clientWidth >= 480 ? '50%' : '41.3%',
        }}>
            {tabs &&
            <ul className="popup-tabs-nav">
                {tabs?.map((tab, i) => <li className={i === activeTab ? 'active' : ''} key={i}
                onClick={() => setActiveTab(i)}><a>{t(tab)}</a></li>)}
            </ul>}
            {onClose && <button onClick={onClose} style={{
              ...BTN_CLOSE, 
              borderLeft: tabs ? '1px solid #e0e0e0' : '1px solid transparent',
              height: document.body.clientWidth >= 480 ? '60px' : '50px',
              width: document.body.clientWidth >= 480 ? '60px' : '50px',
            }} 
            title="Close" type="button"><i style={{fontSize: 24}} className='icon-line-awesome-close'></i></button>}
            <div onClick={onSignInClick}>
              {children[activeTab] || children}
            </div>
        </div>
    </>,
    document.getElementById('portal')
  )
}
