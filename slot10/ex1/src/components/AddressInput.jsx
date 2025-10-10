import React from 'react';
import { Form } from 'react-bootstrap';
import { formConfig } from '../data';

const AddressInput = () => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{formConfig.fields.address.label}</Form.Label>
      <Form.Control 
        as="textarea" 
        rows={formConfig.fields.address.rows} 
        placeholder={formConfig.fields.address.placeholder} 
      />
      <Form.Text className="text-muted">
        {formConfig.fields.address.helpText}
      </Form.Text>
    </Form.Group>
  );
};

export default AddressInput;
