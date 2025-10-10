import React from 'react';
import { Form } from 'react-bootstrap';

// Component AddressForm - Form thông tin địa chỉ
// Sử dụng Form, Form.Group, Form.Label, Form.Control, Form.Select của React Bootstrap
const AddressForm = ({ data, onChange, errors = {} }) => {
  return (
    <div>
      <h4 style={{ 
        display: 'flex', 
        alignItems: 'center',
        marginBottom: '20px',
        fontWeight: 'bold'
      }}>
        <span style={{ 
          marginRight: '10px',
          color: '#007bff',
          fontSize: '1.1rem'
        }}>
          📍
        </span>
        Address Information
      </h4>
      
      <Form.Group className="mb-3">
        <Form.Label style={{ 
          display: 'flex', 
          alignItems: 'center',
          fontWeight: '500',
          marginBottom: '8px'
        }}>
          <span style={{ marginRight: '8px', fontSize: '0.9rem' }}>📍</span>
          Street <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your street address"
          value={data.street || ''}
          onChange={(e) => onChange('street', e.target.value)}
          isInvalid={!!errors.street}
          style={{ padding: '8px 12px', borderRadius: '4px' }}
        />
        {errors.street && (
          <Form.Control.Feedback type="invalid">
            {errors.street}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={{ 
          display: 'flex', 
          alignItems: 'center',
          fontWeight: '500',
          marginBottom: '8px'
        }}>
          <span style={{ marginRight: '8px', fontSize: '0.9rem' }}>🏢</span>
          City <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your city"
          value={data.city || ''}
          onChange={(e) => onChange('city', e.target.value)}
          isInvalid={!!errors.city}
          style={{ padding: '8px 12px', borderRadius: '4px' }}
        />
        {errors.city && (
          <Form.Control.Feedback type="invalid">
            {errors.city}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={{ 
          display: 'flex', 
          alignItems: 'center',
          fontWeight: '500',
          marginBottom: '8px'
        }}>
          <span style={{ marginRight: '8px', fontSize: '0.9rem' }}>📍</span>
          State <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your state/province"
          value={data.state || ''}
          onChange={(e) => onChange('state', e.target.value)}
          isInvalid={!!errors.state}
          style={{ padding: '8px 12px', borderRadius: '4px' }}
        />
        {errors.state && (
          <Form.Control.Feedback type="invalid">
            {errors.state}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={{ 
          display: 'flex', 
          alignItems: 'center',
          fontWeight: '500',
          marginBottom: '8px'
        }}>
          <span style={{ marginRight: '8px', fontSize: '0.9rem' }}>🏠</span>
          Zip Code <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your zip/postal code"
          value={data.zipCode || ''}
          onChange={(e) => onChange('zipCode', e.target.value)}
          isInvalid={!!errors.zipCode}
          style={{ padding: '8px 12px', borderRadius: '4px' }}
        />
        {errors.zipCode && (
          <Form.Control.Feedback type="invalid">
            {errors.zipCode}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={{ 
          display: 'flex', 
          alignItems: 'center',
          fontWeight: '500',
          marginBottom: '8px'
        }}>
          <span style={{ marginRight: '8px', fontSize: '0.9rem' }}>🏳️</span>
          Country <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
        </Form.Label>
        <Form.Select
          value={data.country || ''}
          onChange={(e) => onChange('country', e.target.value)}
          isInvalid={!!errors.country}
          style={{ padding: '8px 12px', borderRadius: '4px' }}
        >
          <option value="">Select a country</option>
          <option value="Vietnam">Vietnam</option>
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Australia">Australia</option>
          <option value="Japan">Japan</option>
          <option value="South Korea">South Korea</option>
          <option value="China">China</option>
          <option value="Thailand">Thailand</option>
          <option value="Singapore">Singapore</option>
        </Form.Select>
        {errors.country && (
          <Form.Control.Feedback type="invalid">
            {errors.country}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    </div>
  );
};

export default AddressForm;