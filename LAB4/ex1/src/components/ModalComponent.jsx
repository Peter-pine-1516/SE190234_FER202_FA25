import React from 'react';
import { Modal, Button, Card } from 'react-bootstrap';

function ModalComponent({ 
  show, 
  onHide, 
  title, 
  content, 
  userInfo, 
  type = 'success' 
}) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {type === 'userInfo' && userInfo ? (
          <Card>
            <Card.Body>
              <p><strong>Username:</strong> {userInfo.username}</p>
              {userInfo.email && <p><strong>Email:</strong> {userInfo.email}</p>}
              {userInfo.password && <p><strong>Password:</strong> {userInfo.password}</p>}
            </Card.Body>
          </Card>
        ) : (
          <p>{content}</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;