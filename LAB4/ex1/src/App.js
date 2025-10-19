import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import QuestionBank from './components/QuestionBank';

function App() {
  return (
    <div className="App">
      <LoginForm />
      <SignUpForm />
      <QuestionBank />
    </div>
  );
}

export default App;