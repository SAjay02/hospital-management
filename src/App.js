import {useState} from 'react'
import Login from './components/Login';
function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
    <Login/>
      
    </>
  );
}

export default App;
