import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { cities, formConfig } from '../data';

const CitySelect = () => {
  return (
    <Row className="mb-3">
      <Col md={6}>
        <Form.Group>
          <Form.Label>{formConfig.fields.from.label}</Form.Label>
          <Form.Select defaultValue={formConfig.fields.from.defaultValue}>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group>
          <Form.Label>{formConfig.fields.to.label}</Form.Label>
          <Form.Select defaultValue={formConfig.fields.to.defaultValue}>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default CitySelect;
