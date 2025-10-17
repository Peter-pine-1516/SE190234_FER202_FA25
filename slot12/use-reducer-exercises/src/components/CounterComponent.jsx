//CounterComponent.jsx is a functional component that uses the useReducer hook to manage a counter state.
import React, { useReducer } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// 1. Khởi tạo trạng thái ban đầu
const initialState = { count: 0 };
// 2. Định nghĩa hàm reducer
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
        return { count: state.count + 1 };
        case 'decrement':
          return { count: state.count - 1 };
        case 'reset':
          return initialState;
        default:
          return state;
      }
    }
    
    function CounterComponent() {
      // 3. Sử dụng useReducer để quản lý trạng thái
      const [state, dispatch] = useReducer(reducer, initialState);
    
    //action handlers
    const increment = () => dispatch({ type: 'increment' });
    const decrement = () => dispatch({ type: 'decrement' });
    const reset = () => dispatch({ type: 'reset' });
       
    return (
        <Container className="mt-4">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card className="p-4">
                        <Card.Header className="text-center">
                            <h2>Bộ Đếm Đa Năng</h2>
                        </Card.Header>
                        <Card.Body className="text-center">
                            <h4 className="mb-4">Giá trị hiện tại: {state.count}</h4>
                            
                            <div className="d-grid gap-2">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={increment}
                                    className="mb-2"
                                >
                                    Tăng (+1)
                                </Button>
                                <Button
                                    variant="warning"
                                    size="lg"
                                    onClick={decrement}
                                    className="mb-2"
                                >
                                    Giảm (-1)
                                </Button>
                                <Button
                                    variant="danger"
                                    size="lg"
                                    onClick={reset}
                                >
                                    Reset
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
    }
    export default CounterComponent;
    
    