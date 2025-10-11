import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import NavBar from '../components/NavBar/NavBar';
import { validateContactForm, isFormValid } from '../utils/validation';

const ContactPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Validation errors state
  const [errors, setErrors] = useState({});

  // Success message state
  const [showSuccess, setShowSuccess] = useState(false);

  // Touched fields (to show errors only after user interacts)
  const [touched, setTouched] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Handle input blur (mark field as touched)
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });

    // Validate single field on blur
    const fieldErrors = validateContactForm({ ...formData, [name]: formData[name] });
    if (fieldErrors[name]) {
      setErrors({
        ...errors,
        [name]: fieldErrors[name]
      });
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const validationErrors = validateContactForm(formData);

    if (isFormValid(validationErrors)) {
      // Form is valid - show success message
      setShowSuccess(true);
      setErrors({});
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setShowSuccess(false);
        setTouched({});
      }, 3000);

      // In real app, you would send data to server here
      console.log('Form submitted:', formData);
    } else {
      // Form has errors
      setErrors(validationErrors);
      setTouched({
        name: true,
        email: true,
        subject: true,
        message: true
      });
      setShowSuccess(false);
    }
  };

  return (
    <div>
      <NavBar />
      <Container className="py-5">
        <Row>
          <Col lg={8} className="mx-auto">
            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h2 className="mb-0">
                  <i className="bi bi-envelope me-2"></i>
                  Contact Us
                </h2>
              </Card.Header>
              <Card.Body className="p-4">
                <p className="lead mb-4">
                  Have questions or feedback? We'd love to hear from you!
                </p>

                {/* Success Message */}
                {showSuccess && (
                  <Alert variant="success" dismissible onClose={() => setShowSuccess(false)}>
                    <i className="bi bi-check-circle-fill me-2"></i>
                    <strong>Success!</strong> Your message has been sent successfully. We'll get back to you soon!
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  {/* Name */}
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <i className="bi bi-person me-2"></i>
                      Your Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.name && errors.name}
                      isValid={touched.name && !errors.name && formData.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Email */}
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <i className="bi bi-envelope me-2"></i>
                      Email Address <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.email && errors.email}
                      isValid={touched.email && !errors.email && formData.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Subject */}
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <i className="bi bi-chat-left-text me-2"></i>
                      Subject <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      placeholder="Enter subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.subject && errors.subject}
                      isValid={touched.subject && !errors.subject && formData.subject}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.subject}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Message */}
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <i className="bi bi-pencil-square me-2"></i>
                      Message <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      placeholder="Enter your message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.message && errors.message}
                      isValid={touched.message && !errors.message && formData.message}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.message}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      {formData.message.length}/500 characters
                    </Form.Text>
                  </Form.Group>

                  {/* Submit Button */}
                  <div className="d-grid">
                    <Button variant="primary" size="lg" type="submit">
                      <i className="bi bi-send me-2"></i>
                      Send Message
                    </Button>
                  </div>
                </Form>

                <hr className="my-4" />

                <h5 className="mb-3">Other Ways to Reach Us</h5>
                <p>
                  <i className="bi bi-telephone-fill me-2"></i>
                  Phone: +84 123 456 789
                </p>
                <p>
                  <i className="bi bi-geo-alt-fill me-2"></i>
                  Address: 123 Movie Street, Entertainment District, Ho Chi Minh City
                </p>
                <p>
                  <i className="bi bi-clock-fill me-2"></i>
                  Business Hours: Monday - Friday, 9:00 AM - 6:00 PM
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactPage;

