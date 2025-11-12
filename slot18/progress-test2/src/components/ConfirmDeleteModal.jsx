import React from "react";
import { Modal, Button } from "react-bootstrap";

export const ConfirmDeleteModal = ({ show, onHide, title, message, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          <i className="bi bi-x-circle me-1"></i>
          Close
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          <i className="bi bi-trash me-1"></i>
          Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};