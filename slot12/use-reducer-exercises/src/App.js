import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import QuestionBank from './components/QuestionBank';

function App() {
  return (
    <div className="App">
      <CounterComponent />
      <LightSwitch />
      <LoginForm />
      <SignUpForm />
      <QuestionBank />
    </div>
  );
}

export default App;