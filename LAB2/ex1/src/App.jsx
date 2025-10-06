import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import Navbar from './component/NavBar';
import Carousel from './component/Carousel';
import MenuCard from './component/MenuCard';
import BookingForm from './component/BookingForm';


function App() {
  return (
    <>
      <Navbar />
      <Carousel />
      <MenuCard />
      <BookingForm />
      
    </>
  );
}

export default App;