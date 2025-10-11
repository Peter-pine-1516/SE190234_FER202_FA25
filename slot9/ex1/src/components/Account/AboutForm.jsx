import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const AboutForm = () => {
  return (
    <Form>
      <Row className="mb-3">
        {/* First Name */}
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              <i className="bi bi-person me-2"></i>
              First Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              isInvalid={true}
            />
            <Form.Control.Feedback type="invalid">
              First name is required.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* Last Name */}
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              <i className="bi bi-person me-2"></i>
              Last Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              isInvalid={true}
            />
            <Form.Control.Feedback type="invalid">
              Last name is required.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      {/* Email */}
      <Form.Group className="mb-3">
        <Form.Label>
          <i className="bi bi-envelope me-2"></i>
          Email <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          isInvalid={true}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid email.
        </Form.Control.Feedback>
      </Form.Group>

      {/* Phone */}
      <Form.Group className="mb-3">
        <Form.Label>
          <i className="bi bi-telephone me-2"></i>
          Phone <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="tel"
          placeholder="Enter phone number"
          isInvalid={true}
        />
        <Form.Control.Feedback type="invalid">
          Phone number is required.
        </Form.Control.Feedback>
      </Form.Group>

      {/* Age */}
      <Form.Group className="mb-3">
        <Form.Label>
          <i className="bi bi-calendar-event me-2"></i>
          Age <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter age"
          isInvalid={true}
        />
        <Form.Control.Feedback type="invalid">
          Age is required.
        </Form.Control.Feedback>
      </Form.Group>

      {/* Avatar */}
      <Form.Group className="mb-3">
        <Form.Label>
          <i className="bi bi-image me-2"></i>
          Avatar <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          isInvalid={true}
        />
        <Form.Control.Feedback type="invalid">
          Please select an avatar image.
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};

export default AboutForm;

