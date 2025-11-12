import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext';
import { ExpenseProvider } from './contexts/ExpenseContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      {/* Đặt ExpenseProvider bên trong AuthProvider để có thể truy cập thông tin người dùng */}
      <ExpenseProvider>
        <div className="App">
          <AppRoutes />
        </div>
      </ExpenseProvider>
    </AuthProvider>
  );
}

export default App;
