import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { formConfig } from '../data';

const FormHeader = () => {
  return (
    <Card.Header className={`${formConfig.card.headerClass} d-flex justify-content-between align-items-center`}>
      <h5 className="mb-0">{formConfig.card.title}</h5>
      <Button variant="outline-dark" size="sm">
        ×
      </Button>
    </Card.Header>
  );
};

export default FormHeader;
