import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FooterPage from './pages/FooterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AccountPage from './pages/AccountPage.jsx';

function App() {
    return (
        <Router>
            <div className="d-flex flex-column min-vh-100">
                <div className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/account" element={<AccountPage />} />
                        <Route path="/build-account" element={<AccountPage />} />
                    </Routes>
                </div>
                <FooterPage />
            </div>
        </Router>
    );
}

export default App;
