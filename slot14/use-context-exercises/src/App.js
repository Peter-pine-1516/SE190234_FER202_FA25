import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import LightSwitch from "./components/LightSwitch";
import CounterComponent from "./components/CounterComponent";
import LoginForm2 from "./components/LoginForm2";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div style={{ 
          minHeight: '100vh', 
          backgroundColor: '#f5f5f5',
          padding: '20px 0'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px'
          }}>
            <h1 style={{
              textAlign: 'center',
              marginBottom: '40px',
              color: '#333',
              fontSize: '28px',
              fontWeight: '300'
            }}>
              React Context & useReducer Examples
            </h1>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '30px',
              marginBottom: '40px'
            }}>
              <CounterComponent />
              <LightSwitch />
            </div>
            
            <LoginForm2 />
          </div>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;