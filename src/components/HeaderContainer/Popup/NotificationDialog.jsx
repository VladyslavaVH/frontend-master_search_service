import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import $ from 'jquery';

export default function NotificationDialog({ open = false, onClose, type = 'error', children}) {
  useEffect(() => {
    // $("a.close").removeAttr("href").on('click', function(){
    //   function slideFade(elem) {
    //     let fadeOut = { opacity: 0, transition: 'opacity 0.5s' };
    //     elem.css(fadeOut).slideUp();     
    //   }
    //   slideFade($(this).parent());
    // });
  }, []);

  //if (!open) return null;

  const POSITION_STYLES = {
    position: 'fixed',
    top: '15vh',
    right: 0,
    zIndex: 10000,
    opacity: open ? 1 : 0, 
    transition: 'opacity 0.5s',
    pointerEvents: open ? 'all' : 'none',
    maxWidth: '40%',
    display: 'block',
  };

  return ReactDOM.createPortal (
    <>
        <div className={`notification ${type} closeable`} style={POSITION_STYLES}>
				  <p>{children}</p>
				  <a className="close" onClick={() => onClose()}></a>
			  </div>
    </>,
    document.getElementById('notification__portal')
  )
}
