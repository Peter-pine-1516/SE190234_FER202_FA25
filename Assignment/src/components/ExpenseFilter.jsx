import React from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';

const ExpenseFilter = ({ categories, value, onChange, onReset, isDisabled }) => (
  <Card className="shadow-sm mb-4">
    <Card.Header as="h5">Filter</Card.Header>
    <Card.Body>
      <Row className="align-items-end">
        <Col sm={8}>
          <Form.Group controlId="filter-category" className="mb-3 mb-sm-0">
            <Form.Label>Category</Form.Label>
            <Form.Select value={value} onChange={(event) => onChange(event.target.value)} disabled={isDisabled}>
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Button variant="outline-secondary" className="w-100" onClick={onReset} disabled={isDisabled}>
            Reset
          </Button>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

export default ExpenseFilter;


