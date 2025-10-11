import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const AddressForm = () => {
  return (
    <Form>
      {/* Street */}
      <Form.Group className="mb-3">
        <Form.Label>
          <i className="bi bi-signpost me-2"></i>
          Street <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter street address"
          isInvalid={true}
        />
        <Form.Control.Feedback type="invalid">
          Street address is required.
        </Form.Control.Feedback>
      </Form.Group>

      <Row className="mb-3">
        {/* City */}
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              <i className="bi bi-building me-2"></i>
              City <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              isInvalid={true}
            />
            <Form.Control.Feedback type="invalid">
              City is required.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* Zip Code */}
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              <i className="bi bi-mailbox me-2"></i>
              Zip Code <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter zip code"
              isInvalid={true}
            />
            <Form.Control.Feedback type="invalid">
              Zip code is required.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      {/* Country */}
      <Form.Group className="mb-3">
        <Form.Label>
          <i className="bi bi-flag me-2"></i>
          Country <span className="text-danger">*</span>
        </Form.Label>
        <Form.Select isInvalid={true}>
          <option value="">Select a country</option>
          <option value="VN">Vietnam</option>
          <option value="US">United States</option>
          <option value="UK">United Kingdom</option>
          <option value="JP">Japan</option>
          <option value="KR">South Korea</option>
          <option value="CN">China</option>
          <option value="TH">Thailand</option>
          <option value="SG">Singapore</option>
          <option value="MY">Malaysia</option>
          <option value="AU">Australia</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Please select a country.
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};

export default AddressForm;

