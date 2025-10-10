import React from 'react';
import { Form } from 'react-bootstrap';

// Component AboutForm - Form thông tin cá nhân
// Sử dụng Form, Form.Group, Form.Label, Form.Control của React Bootstrap
const AboutForm = ({ data, onChange, errors = {} }) => {
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
          👤
        </span>
        About Information
      </h4>
      
      <Form.Group className="mb-3">
        <Form.Label style={{ 
          display: 'flex', 
          alignItems: 'center',
          fontWeight: '500',
          marginBottom: '8px'
        }}>
          <span style={{ marginRight: '8px', fontSize: '0.9rem' }}>👤</span>
          First Name <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your first name"
          value={data.firstName || ''}
          onChange={(e) => onChange('firstName', e.target.value)}
          isInvalid={!!errors.firstName}
          style={{ padding: '8px 12px', borderRadius: '4px' }}
        />
        {errors.firstName && (
          <Form.Control.Feedback type="invalid">
            {errors.firstName}
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
          <span style={{ marginRight: '8px', fontSize: '0.9rem' }}>👤</span>
          Last Name <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your last name"
          value={data.lastName || ''}
          onChange={(e) => onChange('lastName', e.target.value)}
          isInvalid={!!errors.lastName}
          style={{ padding: '8px 12px', borderRadius: '4px' }}
        />
        {errors.lastName && (
          <Form.Control.Feedback type="invalid">
            {errors.lastName}
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
          <span style={{ marginRight: '8px', fontSize: '0.9rem' }}>✉️</span>
          Email <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
        </Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          value={data.email || ''}
          onChange={(e) => onChange('email', e.target.value)}
          isInvalid={!!errors.email}
          style={{ padding: '8px 12px', borderRadius: '4px' }}
        />
        {errors.email && (
          <Form.Control.Feedback type="invalid">
            {errors.email}
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
          <span style={{ marginRight: '8px', fontSize: '0.9rem' }}>📞</span>
          Phone <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
        </Form.Label>
        <Form.Control
          type="tel"
          placeholder="Enter your phone number"
          value={data.phone || ''}
          onChange={(e) => onChange('phone', e.target.value)}
          isInvalid={!!errors.phone}
          style={{ padding: '8px 12px', borderRadius: '4px' }}
        />
        {errors.phone && (
          <Form.Control.Feedback type="invalid">
            {errors.phone}
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
          <span style={{ marginRight: '8px', fontSize: '0.9rem' }}>👤</span>
          Age <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
        </Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter your age"
          value={data.age || ''}
          onChange={(e) => onChange('age', e.target.value)}
          isInvalid={!!errors.age}
          style={{ padding: '8px 12px', borderRadius: '4px' }}
        />
        {errors.age && (
          <Form.Control.Feedback type="invalid">
            {errors.age}
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
          <span style={{ marginRight: '8px', fontSize: '0.9rem' }}>👤</span>
          Avatar
        </Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={(e) => onChange('avatar', e.target.files[0])}
          style={{ padding: '8px 12px', borderRadius: '4px' }}
        />
      </Form.Group>
    </div>
  );
};

export default AboutForm;