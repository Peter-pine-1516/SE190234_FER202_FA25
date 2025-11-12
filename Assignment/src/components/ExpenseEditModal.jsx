import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const initialValues = {
  name: '',
  amount: '',
  category: '',
  date: '',
};

const ExpenseEditModal = ({ show, expense, onHide, onSave, isSubmitting }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (show && expense) {
      setValues({
        name: expense.name || '',
        amount: String(expense.amount ?? ''),
        category: expense.category || '',
        date: expense.date || '',
      });
      setErrors({});
    }
  }, [show, expense]);

  const validate = (formValues) => {
    const nextErrors = {};
    if (!formValues.name.trim()) {
      nextErrors.name = 'Name is required.';
    }
    const parsedAmount = Number(formValues.amount);
    if (!formValues.amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      nextErrors.amount = 'Amount must be greater than 0.';
    }
    if (!formValues.category.trim()) {
      nextErrors.category = 'Category is required.';
    }
    if (!formValues.date) {
      nextErrors.date = 'Date is required.';
    }
    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !expense) return;

    const payload = {
      id: expense.id,
      name: values.name.trim(),
      amount: Number(values.amount),
      category: values.category.trim(),
      date: values.date,
    };

    const success = await onSave(payload);
    if (success) {
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="edit-name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="edit-amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={values.amount}
              onChange={handleChange}
              min="0"
              step="1000"
              isInvalid={!!errors.amount}
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="edit-category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={values.category}
              onChange={handleChange}
              isInvalid={!!errors.category}
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-0" controlId="edit-date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={values.date}
              onChange={handleChange}
              isInvalid={!!errors.date}
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Save changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ExpenseEditModal;


