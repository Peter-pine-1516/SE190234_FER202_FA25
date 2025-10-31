import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import MovieManager from './pages/MovieManager';
import Header from './components/Header';

// Component chính hiển thị nội dung dựa trên authentication
function AppContent() {
  const { isAuthenticated } = useAuth();
  const [showMovieList, setShowMovieList] = useState(false);

  // Reset showMovieList khi đăng xuất
  useEffect(() => {
    if (!isAuthenticated) {
      setShowMovieList(false);
    }
  }, [isAuthenticated]);

  // Callback khi đăng nhập thành công
  const handleLoginSuccess = (user) => {
    setShowMovieList(true);
  };

  // Nếu chưa đăng nhập hoặc chưa show movie list, hiển thị login
  if (!isAuthenticated || !showMovieList) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  // Nếu đã đăng nhập, hiển thị movie manager
  return (
    <>
      <Header />
      <MovieManager />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </div>
  );
}

export default App;
