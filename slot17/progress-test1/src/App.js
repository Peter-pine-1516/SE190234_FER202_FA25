import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext';
import { PaymentProvider } from './contexts/PaymentContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    //1. Đặt AuthProvider ở cấp cao nhất trong ứng dụng để cung cấp Context cho toàn bộ ứng dụng
    <AuthProvider>
      {/*2. Đặt PaymentProvider bên trong AuthProvider để có thể sử dụng useAuth */}
      <PaymentProvider>
        <div className="App">
          {/*Sử dụng AppRoutes để quản lý các route trong ứng dụng */}
          <AppRoutes />
        </div>
      </PaymentProvider>
    </AuthProvider>
  );
}

export default App;
