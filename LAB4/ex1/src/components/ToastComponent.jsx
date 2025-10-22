import React from 'react';
import { Toast } from 'react-bootstrap';

function ToastComponent({ 
  show, 
  onClose, 
  title = 'Success', 
  message = 'Operation completed successfully!',
  variant = 'success',
  delay = 2000,
  autohide = true
}) {
  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
      <Toast
        show={show}
        onClose={onClose}
        delay={delay}
        autohide={autohide}
      >
        <Toast.Header>
          <strong className={`me-auto text-${variant}`}>{title}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </div>
  );
}

export default ToastComponent;