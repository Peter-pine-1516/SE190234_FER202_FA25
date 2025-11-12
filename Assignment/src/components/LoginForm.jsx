import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './css/LoginForm.css';

const initialState = { username: '', password: '' };

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useAuth();

  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (values) => {
    const nextErrors = {};
    if (!values.username.trim()) {
      nextErrors.username = 'Username is required.';
    }
    if (!values.password.trim()) {
      nextErrors.password = 'Password is required.';
    } else if (values.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }
    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (error) clearError();
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitted) {
      setFormErrors(validate({ ...formData, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    const nextErrors = validate(formData);
    setFormErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const result = await login({
      username: formData.username.trim(),
      password: formData.password,
    });

    if (result?.success) {
      setFormData(initialState);
      setSubmitted(false);
      navigate('/home');
    }
  };

  const handleReset = () => {
    setFormData(initialState);
    setFormErrors({});
    setSubmitted(false);
    if (error) clearError();
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center mb-0">Login</h3>
            </Card.Header>
            <Card.Body>
              {error && (
                <Alert variant="danger" onClose={clearError} dismissible>
                  {error}
                </Alert>
              )}
              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label className="text-start d-block">Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                    isInvalid={!!formErrors.username}
                    disabled={loading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label className="text-start d-block">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!formErrors.password}
                    disabled={loading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="login-buttons-container">
                  <Button variant="primary" type="submit" className="login-button" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner animation="border" role="status" size="sm" className="me-2" />
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    type="button"
                    className="login-button"
                    onClick={handleReset}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
