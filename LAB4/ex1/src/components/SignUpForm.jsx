import React, { useReducer, useMemo } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal, Toast } from 'react-bootstrap';

// Định nghĩa các action types
const FORM_ACTIONS = {
  SET_FIELD: 'SET_FIELD',
  SET_ERRORS: 'SET_ERRORS',
  SET_MODAL: 'SET_MODAL',
  SET_TOAST: 'SET_TOAST',
  RESET_FORM: 'RESET_FORM'
};

// Reducer function để xử lý các action
const signUpReducer = (state, action) => {
  switch (action.type) {
    case FORM_ACTIONS.SET_FIELD:
      return { ...state, form: { ...state.form, [action.payload.field]: action.payload.value } };
    case FORM_ACTIONS.SET_ERRORS:
      return { ...state, errors: action.payload };
    case FORM_ACTIONS.SET_MODAL:
      return { ...state, showModal: action.payload };
    case FORM_ACTIONS.SET_TOAST:
      return { ...state, showToast: action.payload };
    case FORM_ACTIONS.RESET_FORM:
      return {
        form: { username: '', email: '', password: '', confirm: '' },
        errors: {},
        showModal: false,
        showToast: false
      };
    default:
      return state;
  }
};

// Regex helpers
const isEmail = (v) => /\S+@\S+\.[A-Za-z]{2,}/.test(v);
const isUsername = (v) => /^[A-Za-z0-9._]{3,}$/.test(v.trim());
const isStrongPassword = (v) =>
  /[A-Z]/.test(v) &&        // có chữ hoa
  /[a-z]/.test(v) &&        // có chữ thường
  /\d/.test(v) &&           // có số
  /[^A-Za-z0-9]/.test(v) && // có ký tự đặc biệt
  v.length >= 8;            // độ dài


function SignUpForm() {
  // Khởi tạo state với useReducer
  const [state, dispatch] = useReducer(signUpReducer, {
    form: {
      username: '',
      email: '',
      password: '',
      confirm: '',
    },
    errors: {},
    showModal: false,
    showToast: false
  });

  // Validate từng trường
  const validate = (field, value) => {
    switch (field) {
      case 'username':
        if (!value.trim()) return 'Username is required';
        if (!isUsername(value)) return '≥ 3 chars, letters/numbers/._ only, no spaces';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!isEmail(value)) return 'Invalid email format';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (!isStrongPassword(value)) return '≥8 chars, upper, lower, number, special';
        return '';
      case 'confirm':
        if (!value) return 'Please confirm password';
        if (value !== state.form.password) return 'Passwords do not match';
        return '';
      default:
        return '';
    }
  };

  // Memo hóa lỗi cho toàn bộ form
  const formErrors = useMemo(() => {
    const e = {};
    Object.keys(state.form).forEach((field) => {
      const err = validate(field, state.form[field]);
      if (err) e[field] = err;
    });
    return e;
  }, [state.form]);

  // Form hợp lệ khi không có lỗi
  const isValid = Object.keys(formErrors).length === 0;

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: FORM_ACTIONS.SET_FIELD, payload: { field: name, value } });
    dispatch({ 
      type: FORM_ACTIONS.SET_ERRORS, 
      payload: { ...state.errors, [name]: validate(name, value) } 
    });
  };

  // Xử lý submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Kiểm tra lại toàn bộ lỗi
    const newErrors = {};
    Object.keys(state.form).forEach((field) => {
      const err = validate(field, state.form[field]);
      if (err) newErrors[field] = err;
    });
    dispatch({ type: FORM_ACTIONS.SET_ERRORS, payload: newErrors });
    if (Object.keys(newErrors).length === 0) {
      dispatch({ type: FORM_ACTIONS.SET_TOAST, payload: true });
      dispatch({ type: FORM_ACTIONS.SET_MODAL, payload: true });
    }
  };

  // Xử lý reset form
  const handleCancel = () => {
    dispatch({ type: FORM_ACTIONS.RESET_FORM });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={7}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Sign Up Form</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={state.form.username}
                    onChange={handleChange}
                    isInvalid={!!state.errors.username}
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={state.form.email}
                    onChange={handleChange}
                    isInvalid={!!state.errors.email}
                    placeholder="Enter email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={state.form.password}
                    onChange={handleChange}
                    isInvalid={!!state.errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="confirm" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirm"
                    value={state.form.confirm}
                    onChange={handleChange}
                    isInvalid={!!state.errors.confirm}
                    placeholder="Confirm password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.confirm}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit" disabled={!isValid} className="w-100">
                    Submit
                  </Button>
                  <Button variant="outline-secondary" type="button" onClick={handleCancel} className="w-100">
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
</Col>
      </Row>
      {/* Toast thông báo submit thành công */}
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
        <Toast
          show={state.showToast}
          onClose={() => dispatch({ type: FORM_ACTIONS.SET_TOAST, payload: false })}
          delay={2000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto text-success">Success</strong>
          </Toast.Header>
          <Toast.Body>Submitted successfully!</Toast.Body>
        </Toast>
      </div>
      {/* Modal hiển thị thông tin đã submit */}
      <Modal show={state.showModal} onHide={handleCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up Info (useReducer)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <p><strong>Username:</strong> {state.form.username}</p>
              <p><strong>Email:</strong> {state.form.email}</p>
              <p><strong>Password:</strong> {state.form.password}</p>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default SignUpForm;