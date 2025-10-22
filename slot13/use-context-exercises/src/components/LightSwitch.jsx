//LightSwitch component using useReducer to toggle light on and off
import React, { useReducer } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Định nghĩa các action types
const LIGHT_ACTIONS = {
    TURN_ON: 'TURN_ON',
    TURN_OFF: 'TURN_OFF',
    TOGGLE: 'TOGGLE'
};

// Reducer function để xử lý các action
const lightReducer = (state, action) => {
    switch (action.type) {
        case LIGHT_ACTIONS.TURN_ON:
            return { isLightOn: true };
        case LIGHT_ACTIONS.TURN_OFF:
            return { isLightOn: false };
        case LIGHT_ACTIONS.TOGGLE:
            return { isLightOn: !state.isLightOn };
        default:
            return state;
    }
};

function LightSwitch() {
    // Khởi tạo state với useReducer
    const [state, dispatch] = useReducer(lightReducer, { isLightOn: false });
    
    // Các hàm để dispatch action
    const turnOnLight = () => dispatch({ type: LIGHT_ACTIONS.TURN_ON });
    const turnOffLight = () => dispatch({ type: LIGHT_ACTIONS.TURN_OFF });
    const toggleLight = () => dispatch({ type: LIGHT_ACTIONS.TOGGLE });
    
    return (
        <Container className="mt-4">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card className="p-4">
                        <Card.Header className="text-center">
                            <h2>Công Tắc Đèn (useReducer)</h2>
                        </Card.Header>
                        <Card.Body className="text-center">
                            <h4 className="mb-4">
                                Đèn hiện đang: {state.isLightOn ? 'Bật' : 'Tắt'}
                            </h4>
                            <div className="d-grid gap-2">
                                <Button
                                    variant="success"
                                    size="lg"
                                    onClick={turnOnLight}
                                    className="mb-2"
                                >
                                    Bật Đèn
                                </Button>
                                <Button
                                    variant="danger"
                                    size="lg"
                                    onClick={turnOffLight}
                                    className="mb-2"
                                >
                                    Tắt Đèn
                                </Button>
                                <Button
                                    variant={state.isLightOn ? "warning" : "info"}
                                    size="lg"
                                    onClick={toggleLight}
                                >
                                    Chuyển Đổi
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
export default LightSwitch;
