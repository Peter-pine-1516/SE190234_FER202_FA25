import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import QuestionBank from './components/QuestionBank';


function App() {
  return (
    <div className="App">
      <h1>Excercise3</h1>
      <LoginForm />
      <h1>Excercise4</h1>
      <SignUpForm />
      <h1>Excercise6</h1>
      <QuestionBank />

    </div>
  );
}

export default App;