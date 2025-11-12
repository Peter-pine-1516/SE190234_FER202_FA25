import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ExpenseDeleteModal = ({ show, expense, onCancel, onConfirm, isSubmitting }) => (
  <Modal show={show} onHide={onCancel} centered>
    <Modal.Header closeButton>
      <Modal.Title>Delete Expense</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Are you sure you want to delete <strong>{expense ? expense.name : ''}</strong>?
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
        Cancel
      </Button>
      <Button variant="danger" onClick={onConfirm} disabled={isSubmitting}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ExpenseDeleteModal;


