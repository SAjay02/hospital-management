import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import CarouselSlider from './components/CarouselSlider';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import Recent from './components/Recent';
import Current from './components/Current';
import Upcoming from './components/Upcoming';
import AddProducts from './components/AddProducts';
import Contact from './components/Contact';
import Billing from './components/Billing';
import Home from './components/Home';
function App() {
  return (
    <>
      <HomePage/>
      {/* <CarouselSlider/> */}
      <Routes>
        <Route Component={CarouselSlider} path='/home'></Route>
        <Route Component={CarouselSlider} path='/'></Route>
        <Route Component={About} path='/'></Route>
        <Route Component={Recent} path='/'></Route>
        <Route Component={Current} path='/'></Route>
        <Route Component={Upcoming} path='/'></Route>
        <Route Component={AddProducts} path='/'></Route>
        <Route Component={Billing} path='/'></Route>
        <Route Component={Contact} path='/'></Route>
      </Routes>
    </>
  );
}
export default App;
