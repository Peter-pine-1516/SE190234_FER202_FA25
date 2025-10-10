import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { formConfig } from '../data';

const NameInput = () => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{formConfig.fields.fullName.label}</Form.Label>
      <InputGroup>
        <InputGroup.Text>{formConfig.fields.fullName.icon}</InputGroup.Text>
        <Form.Control 
          type="text" 
          placeholder={formConfig.fields.fullName.placeholder} 
        />
        <InputGroup.Text>{formConfig.fields.fullName.appendText}</InputGroup.Text>
      </InputGroup>
      <Form.Text className="text-muted">
        {formConfig.fields.fullName.helpText}
      </Form.Text>
    </Form.Group>
  );
};

export default NameInput;
