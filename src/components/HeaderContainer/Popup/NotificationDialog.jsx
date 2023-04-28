import React from 'react'
import ReactDOM from 'react-dom';

export default function NotificationDialog({ open = false, onClose, type = 'error', children}) {
  if (open) {
    document.getElementById('notification__portal').style.display = 'flex';
    if (type === 'notice' || type === 'success') {
      setTimeout(onClose, 3000);
    }

  } else {
    let displayNone = false;
    for (const n of document.getElementById('notification__portal').children) {
      if (n.style.display != 'none') {
        displayNone = true;
        break;
      }
    }

    if (displayNone) {
      document.getElementById('notification__portal').style.display = 'none';      
    }
  }

  //if (!open) return null;

  const POSITION_STYLES = {
    zIndex: 10000,
    opacity: open ? 1 : 0, 
    transition: 'all 0.5s ease 0s',
    pointerEvents: open ? 'all' : 'none',
    minWidth: '323px',
    display: open ? 'block' : 'none',
  };

  return ReactDOM.createPortal (
    <>
        <div className={`notification ${type} ${(type === 'notice' || type === 'success') ? '' : 'closeable'}`} style={POSITION_STYLES}>
				  <p>{children}</p>
				  <a className="close" onClick={() => onClose()}></a>
			  </div>
    </>,
    document.getElementById('notification__portal')
  )
}
