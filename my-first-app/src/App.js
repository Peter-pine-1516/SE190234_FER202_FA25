import './App.css';
import ReactDOM from 'react-dom/client';

function App() {
    return (
      <div className="App-container">
        <h1>Chào Mừng Đến Với Thế Giới Của Anh</h1>
      </div>
    );
}
export default App;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);