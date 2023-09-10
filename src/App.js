import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import CarouselSlider from './components/CarouselSlider';
function App() {
  return (
    <>
      <HomePage/>
      <CarouselSlider/>

    </>
  );
}

export default App;
