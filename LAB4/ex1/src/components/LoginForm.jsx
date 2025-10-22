//LoginForm component is used to render a login form with username and password fields, including validation and error handling.
import { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import ModalComponent from './ModalComponent';
import ToastComponent from './ToastComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

// Định nghĩa các action types
const FORM_ACTIONS = {
  SET_USERNAME: 'SET_USERNAME',
  SET_PASSWORD: 'SET_PASSWORD',
  SET_ERRORS: 'SET_ERRORS',
  SET_MODAL: 'SET_MODAL',
  SET_TOAST: 'SET_TOAST',
  RESET_FORM: 'RESET_FORM'
};

// Reducer function để xử lý các action
const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_ACTIONS.SET_USERNAME:
      return { ...state, username: action.payload };
    case FORM_ACTIONS.SET_PASSWORD:
      return { ...state, password: action.payload };
    case FORM_ACTIONS.SET_ERRORS:
      return { ...state, errors: action.payload };
    case FORM_ACTIONS.SET_MODAL:
      return { ...state, showModal: action.payload };
    case FORM_ACTIONS.SET_TOAST:
      return { ...state, showToast: action.payload };
    case FORM_ACTIONS.RESET_FORM:
      return {
        username: '',
        password: '',
        errors: {},
        showModal: false,
        showToast: false
      };
    default:
      return state;
  }
};

function LoginForm({ onSubmit }) {
  // Khởi tạo state với useReducer
  const [state, dispatch] = useReducer(formReducer, {
    username: '',
    password: '',
    errors: {},
    showModal: false,
    showToast: false
  });

  //Xử lý thay đổi input
  const handleUsernameChange = (e) => {
    dispatch({ type: FORM_ACTIONS.SET_USERNAME, payload: e.target.value });
    if (e.target.value.trim() === '') {
      dispatch({ 
        type: FORM_ACTIONS.SET_ERRORS, 
        payload: { ...state.errors, username: 'Username is required' } 
      });
    } else {
      const { username, ...rest } = state.errors;
      dispatch({ type: FORM_ACTIONS.SET_ERRORS, payload: rest });
    }
  }
  //Xử lý thay đổi password
  const handlePasswordChange = (e) => {
    dispatch({ type: FORM_ACTIONS.SET_PASSWORD, payload: e.target.value });
    if (e.target.value.trim() === '') {
      dispatch({ 
        type: FORM_ACTIONS.SET_ERRORS, 
        payload: { ...state.errors, password: 'Password is required' } 
      });
    } else {
      const { password, ...rest } = state.errors;
      dispatch({ type: FORM_ACTIONS.SET_ERRORS, payload: rest });
    }
  }
  //Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    const newErrors = {};
    if (state.username.trim() === '') {
      newErrors.username = 'Username is required';
    }
    if (state.password.trim() === '') {
      newErrors.password = 'Password is required';
    }
    dispatch({ type: FORM_ACTIONS.SET_ERRORS, payload: newErrors });
    if (Object.keys(newErrors).length === 0) {
      //onSubmit({ username: state.username, password: state.password });
      dispatch({ type: FORM_ACTIONS.SET_TOAST, payload: true }); // Hiển thị toast trước
      dispatch({ type: FORM_ACTIONS.SET_MODAL, payload: true }); // Hiển thị modal sau
    }
  }
  //Đóng modal
  const handleCloseModal = () => {
    dispatch({ type: FORM_ACTIONS.RESET_FORM });
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Login</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={state.username}
                    onChange={handleUsernameChange}
                    isInvalid={!!state.errors.username}
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={state.password}
                    onChange={handlePasswordChange}
                    isInvalid={!!state.errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Toast thông báo đăng nhập thành công */}
      <ToastComponent
        show={state.showToast}
        onClose={() => dispatch({ type: FORM_ACTIONS.SET_TOAST, payload: false })}
        title="Login Success"
        message="Welcome back!"
        variant="success"
        delay={2000}
        autohide={true}
      />
      
      {/* Modal hiển thị khi đăng nhập thành công */}
      <ModalComponent
        show={state.showModal}
        onHide={handleCloseModal}
        title="Login Successful (useReducer)"
        content={`Welcome, ${state.username}!`}
        type="success"
      />
    </Container>
  );
}

export default LoginForm;
