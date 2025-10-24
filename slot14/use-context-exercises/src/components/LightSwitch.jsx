import React, { useReducer } from 'react';

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
    
    // Styles
    const containerStyle = {
        padding: '20px',
        margin: '20px auto',
        maxWidth: '400px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#fff',
        color: '#333',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };

    const buttonStyle = {
        margin: '8px',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '14px',
        transition: 'background-color 0.2s'
    };

    const statusStyle = {
        padding: '10px',
        margin: '15px 0',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px',
        border: '1px solid #e9ecef'
    };
    
    return (
        <div style={containerStyle}>
            <h3 style={{ margin: '0 0 20px 0', textAlign: 'center', fontSize: '18px' }}>
                Light Control Panel
            </h3>
            
            <div style={statusStyle}>
                <div style={{ fontSize: '16px', fontWeight: '500' }}>
                    Status: {state.isLightOn ? 'ON' : 'OFF'}
                </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                    style={{
                        ...buttonStyle,
                        backgroundColor: state.isLightOn ? '#28a745' : '#6c757d',
                        color: '#fff'
                    }}
                    onClick={turnOnLight}
                >
                    Turn On
                </button>
                
                <button
                    style={{
                        ...buttonStyle,
                        backgroundColor: !state.isLightOn ? '#dc3545' : '#6c757d',
                        color: '#fff'
                    }}
                    onClick={turnOffLight}
                >
                    Turn Off
                </button>
                
                <button
                    style={{
                        ...buttonStyle,
                        backgroundColor: '#007bff',
                        color: '#fff'
                    }}
                    onClick={toggleLight}
                >
                    Toggle
                </button>
            </div>
        </div>
    );
}

export default LightSwitch;
