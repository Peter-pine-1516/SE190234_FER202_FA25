import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import LoginForm2 from './components/LoginForm2';
import SearchItem from './components/SearchItem';
import SearchAccount from './components/SearchAccount';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <div className="App">
      <CounterComponent />
      <LightSwitch />
      <LoginForm />
      <LoginForm2 />
      <SearchItem />
      <SearchAccount />
      <RegisterForm />
    </div>
  );
}

export default App;