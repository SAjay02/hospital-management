import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Billing from './Billing';
import { Button } from 'react-bootstrap';

// const datas = (index) =>{
//   name : index.product
//   quantity : index.quantity
// }


function Dropdown() {
/* *********************************************************************************
const [items, setItems] = useState([]);
const [selectedProduct, setSelectedProduct] = useState('');
const [userData, setUserData] = useState(''); // State variable to store user-entered data

  useEffect(() => {
    axios.get('http://localhost:8000/api/items')
    .then((response) =>  setItems(response.data))
      .catch((error) => console.error(error));
  }, []);


  const handleProductSelect = (event) => {
    const selectedProduct = event.target.value;
    setSelectedProduct(selectedProduct);
  }
  

const handleInputChange = (event) => {
  const inputValue = event.target.value;
  setUserData(inputValue); // Update the state variable with the user-entered data
};

  return (
    <div>
      <div>
        <label>Select an item:</label>
        <select onChange={handleProductSelect} value={selectedProduct}>
          <option value="">Select a product</option>
          {items.map((item) => (
            <option key={item._id} value={item.name}>
              {item.name} - {item.quantity}
            </option>
          ))}
        </select>          
        
        <input
          type="text"
          value={userData}
          onChange={handleInputChange}
          placeholder="Type something..."
        />
      </div>
      {selectedProduct && (
        <div>
          <label>Selected Product:</label>
          <p>{selectedProduct}</p>
          <label>Quantity:</label>
          <p>{userData}</p>
        </div>
      )}
    </div>
  );
};
**************************************************************************** */
const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [ selectedData, setSelectedData] = useState([]); // Updated state structure

  useEffect(() => {
    axios.get('http://localhost:8000/api/items')
      .then((response) => setItems(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleAddProductsClick = (event) => {
    event.preventDefault();

    // Check if both item and quantity are provided
    if (selectedItem && quantity) {
      setSelectedData((prevSelectedData) => {
        // datas.push(selectedData)
        // Use the previous state to avoid overwriting existing data
        return [
          ...prevSelectedData,
          {
            product: selectedItem,
            quantity: parseInt(quantity, 10),
          },
        ];
      });
    }

    // Clear the selected item and quantity after processing
    setSelectedItem('');
    setQuantity('');
  };

  const handleItemSelect = (event) => {
    const selectedItem = event.target.value;
    setSelectedItem(selectedItem);
  };

  const handleQuantityChange = (event) => {
    const quantityValue = event.target.value;
    setQuantity(quantityValue);
  };

 
  
  return (
    <div>
      <div>
        <label>Select an item: </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <select onChange={handleItemSelect} value={selectedItem}>
          <option value="">--Select a product--</option>
          {items.map((item) => (
            <option key={item._id} value={item.name}>
              {item.name} - {item.quantity}
            </option>
          ))}
        </select>
        <br />
      </div>
      {selectedItem && (
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            placeholder="Enter quantity"
          />
        </div>
      )}
      <br />
      <Button variant="success"onClick={handleAddProductsClick}>Add Products</Button>
      <hr />
      <div>
        <label>Selected Data:</label>
        {selectedData.length > 0 ? (
          <ul>
            {selectedData.map((item, index) => (
              <li key={index}>
                Product: {item.product} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p>No selected data.</p>
        )}
      </div>

    </div>
    
  );
 
}



export default Dropdown;
// export {submitBill}