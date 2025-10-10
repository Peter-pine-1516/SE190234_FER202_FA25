import React from 'react';
import { Button } from 'react-bootstrap';
import { formConfig } from '../data';

const SubmitButton = () => {
  return (
    <div className="d-grid">
      <Button 
        variant={formConfig.button.variant} 
        size={formConfig.button.size}
      >
        {formConfig.button.text}
      </Button>
    </div>
  );
};

export default SubmitButton;
