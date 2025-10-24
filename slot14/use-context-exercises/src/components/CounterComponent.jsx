import React, { useReducer } from 'react';

// Khởi tạo trạng thái ban đầu
const initialState = { count: 0 };

// Định nghĩa hàm reducer
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
  // Sử dụng useReducer để quản lý trạng thái
  const [state, dispatch] = useReducer(reducer, initialState);


  // Action handlers
  const increment = () => dispatch({ type: 'increment' });
  const decrement = () => dispatch({ type: 'decrement' });
  const reset = () => dispatch({ type: 'reset' });

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

  const counterDisplayStyle = {
    textAlign: 'center',
    padding: '20px',
    margin: '15px 0',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '2px solid #e9ecef',
    fontSize: '24px',
    fontWeight: 'bold'
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

  const buttonRowStyle = {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  };

  return (
    <div style={containerStyle}>
      <h3 style={{ margin: '0 0 20px 0', textAlign: 'center', fontSize: '18px' }}>
        Counter Application
      </h3>
      
      <div style={counterDisplayStyle}>
        {state.count}
      </div>
      
      <div style={buttonRowStyle}>
        <button
          style={{
            ...buttonStyle,
            backgroundColor: '#007bff',
            color: '#fff'
          }}
          onClick={increment}
        >
          +1
        </button>
        
        <button
          style={{
            ...buttonStyle,
            backgroundColor: '#dc3545',
            color: '#fff'
          }}
          onClick={decrement}
        >
          -1
        </button>
        
        <button
          style={{
            ...buttonStyle,
            backgroundColor: '#6c757d',
            color: '#fff'
          }}
          onClick={reset}
        >
          Reset
        </button>
      </div>

    </div>
  );
}

export default CounterComponent;
