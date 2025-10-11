import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const AccountForm = () => {
  return (
    <Form>
      {/* Username */}
      <Form.Group className="mb-3">
        <Form.Label>
          <i className="bi bi-person me-2"></i>
          Username <span className="text-danger">*</span>
        </Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <i className="bi bi-person-circle"></i>
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Enter username"
            isInvalid={true}
          />
          <Form.Control.Feedback type="invalid">
            Username is required.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      {/* Password */}
      <Form.Group className="mb-3">
        <Form.Label>
          <i className="bi bi-lock me-2"></i>
          Password <span className="text-danger">*</span>
        </Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <i className="bi bi-lock-fill"></i>
          </InputGroup.Text>
          <Form.Control
            type="password"
            placeholder="Enter password"
            isInvalid={true}
          />
          <Form.Control.Feedback type="invalid">
            Password is required.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      {/* Confirm Password */}
      <Form.Group className="mb-3">
        <Form.Label>
          <i className="bi bi-lock me-2"></i>
          Confirm Password <span className="text-danger">*</span>
        </Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <i className="bi bi-lock-fill"></i>
          </InputGroup.Text>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            isInvalid={true}
          />
          <Form.Control.Feedback type="invalid">
            Password confirmation is required.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      {/* Secret Question */}
      <Form.Group className="mb-3">
        <Form.Label>
          <i className="bi bi-question-circle me-2"></i>
          Secret Question <span className="text-danger">*</span>
        </Form.Label>
        <Form.Select isInvalid={true}>
          <option value="">Select a secret question</option>
          <option value="pet">What is your pet's name?</option>
          <option value="city">What city were you born in?</option>
          <option value="school">What is your first school's name?</option>
          <option value="teacher">What is your favorite teacher's name?</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Please select a secret question.
        </Form.Control.Feedback>
      </Form.Group>

      {/* Answer */}
      <Form.Group className="mb-3">
        <Form.Label>
          <i className="bi bi-chat-left-text me-2"></i>
          Answer <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your answer"
          isInvalid={true}
        />
        <Form.Control.Feedback type="invalid">
          Answer is required.
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};

export default AccountForm;

