import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
