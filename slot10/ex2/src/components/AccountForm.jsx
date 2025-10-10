import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

// Component AccountForm - Form thông tin tài khoản
// Sử dụng Form, Form.Group, Form.Label, Form.Control, InputGroup của React Bootstrap
const AccountForm = ({ data, onChange, showPassword, togglePassword, errors = {} }) => {
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
          🔒
        </span>
        Account Information
      </h4>
      
      <Form.Group className="mb-3">
        <Form.Label style={{ 
          display: 'flex', 
          alignItems: 'center',
          fontWeight: '500',
          marginBottom: '8px'
        }}>
          <span style={{ marginRight: '8px', fontSize: '0.9rem' }}>👤</span>
          Username <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your username"
          value={data.username || ''}
          onChange={(e) => onChange('username', e.target.value)}
          isInvalid={!!errors.username}
          style={{ padding: '8px 12px', borderRadius: '4px' }}
        />
        {errors.username && (
          <Form.Control.Feedback type="invalid">
            {errors.username}
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
          <span style={{ marginRight: '8px', fontSize: '0.9rem' }}>🔒</span>
          Password <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
        </Form.Label>
        <InputGroup>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={data.password || ''}
            onChange={(e) => onChange('password', e.target.value)}
            isInvalid={!!errors.password}
            style={{ padding: '8px 12px', borderRadius: '4px' }}
          />
          <InputGroup.Text 
            style={{ cursor: 'pointer' }}
            onClick={togglePassword}
          >
            {showPassword ? '🙈' : '👁️'}
          </InputGroup.Text>
        </InputGroup>
        {errors.password && (
          <Form.Control.Feedback type="invalid">
            {errors.password}
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
          <span style={{ marginRight: '8px', fontSize: '0.9rem' }}>🔒</span>
          Confirm Password <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
        </Form.Label>
        <InputGroup>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            value={data.confirmPassword || ''}
            onChange={(e) => onChange('confirmPassword', e.target.value)}
            isInvalid={!!errors.confirmPassword}
            style={{ padding: '8px 12px', borderRadius: '4px' }}
          />
          <InputGroup.Text 
            style={{ cursor: 'pointer' }}
            onClick={togglePassword}
          >
            {showPassword ? '🙈' : '👁️'}
          </InputGroup.Text>
        </InputGroup>
        {errors.confirmPassword && (
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
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
          <span style={{ marginRight: '8px', fontSize: '0.9rem' }}>❓</span>
          Secret Question <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
        </Form.Label>
        <Form.Select
          value={data.secretQuestion || ''}
          onChange={(e) => onChange('secretQuestion', e.target.value)}
          isInvalid={!!errors.secretQuestion}
          style={{ padding: '8px 12px', borderRadius: '4px' }}
        >
          <option value="">Select a secret question</option>
          <option value="What is your first pet's name?">What is your first pet's name?</option>
          <option value="What city were you born in?">What city were you born in?</option>
          <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
          <option value="What was your first car?">What was your first car?</option>
          <option value="What is your favorite color?">What is your favorite color?</option>
        </Form.Select>
        {errors.secretQuestion && (
          <Form.Control.Feedback type="invalid">
            {errors.secretQuestion}
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
          <span style={{ marginRight: '8px', fontSize: '0.9rem' }}>🔑</span>
          Answer <span style={{ color: 'red', marginLeft: '3px' }}>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your answer"
          value={data.answer || ''}
          onChange={(e) => onChange('answer', e.target.value)}
          isInvalid={!!errors.answer}
          style={{ padding: '8px 12px', borderRadius: '4px' }}
        />
        {errors.answer && (
          <Form.Control.Feedback type="invalid">
            {errors.answer}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    </div>
  );
};

export default AccountForm;