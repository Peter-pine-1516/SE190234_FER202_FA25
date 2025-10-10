import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileWizard from './pages/ProfileWizard';

// Component App chính - sử dụng ProfileWizard từ pages
const App = () => {
  return (
    <div className="App">
      <ProfileWizard />
    </div>
  );
};

export default App;