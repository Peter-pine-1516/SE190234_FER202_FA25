import React from 'react';
import { Form } from 'react-bootstrap';
import { formConfig } from '../data';

const TravelRadio = () => {
  return (
    <Form.Group className="mb-4">
      <Form.Label>{formConfig.fields.travelType.label}</Form.Label>
      <div>
        {formConfig.fields.travelType.options.map(option => (
          <Form.Check
            key={option.value}
            type="radio"
            label={option.label}
            name="travelType"
            id={option.id}
            inline
          />
        ))}
      </div>
    </Form.Group>
  );
};

export default TravelRadio;
