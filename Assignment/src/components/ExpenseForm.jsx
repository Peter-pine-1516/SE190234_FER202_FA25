import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const initialValues = {
  name: '',
  amount: '',
  category: '',
  date: '',
};

const ExpenseForm = ({ onSubmit, isSubmitting, categorySuggestions = [] }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

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
    if (Object.keys(nextErrors).length > 0) return;

    const payload = {
      name: values.name.trim(),
      amount: Number(values.amount),
      category: values.category.trim(),
      date: values.date,
    };

    const success = await onSubmit(payload);
    if (success) {
      setValues(initialValues);
    }
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return (
    <Card className="shadow-sm">
      <Card.Header as="h5">Add Expense</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="expense-name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="e.g. Groceries"
              value={values.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="expense-amount">
            <Form.Label>Amount (VND)</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              placeholder="e.g. 150000"
              value={values.amount}
              onChange={handleChange}
              min="0"
              step="1000"
              isInvalid={!!errors.amount}
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="expense-category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              placeholder="e.g. Food"
              value={values.category}
              onChange={handleChange}
              list="expense-category-suggestions"
              isInvalid={!!errors.category}
              disabled={isSubmitting}
            />
            <datalist id="expense-category-suggestions">
              {categorySuggestions.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
            <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="expense-date">
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

          <div className="d-flex gap-2">
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              Add expense
            </Button>
            <Button type="button" variant="outline-secondary" onClick={handleReset} disabled={isSubmitting}>
              Clear
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ExpenseForm;


