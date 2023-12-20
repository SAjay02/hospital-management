import {React, useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from './Dropdown';
import axios from 'axios'
// const product = require('../Server/mod/els/productModels')
// import {availableProducts} from '../Server/app.js'
// const product = require('../Server/app.js')
const Billing = () => {

  const [name, setName] = useState('');
  const [total_price, setTotal_price] = useState('');
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedItems, setSelectedItems] = useState({});

/* ------------------ DROPDOWN ------------------*/
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [ selectedData, setSelectedData] = useState({
    items : [],
  });

  const handleName = (e) =>{
    setName(e.target.value)
  }
  const handleEmail = (e) =>{
    setEmail(e.target.value)
  }
  const handleNumber = (e) =>{
    setPhoneNumber(e.target.value)
  }
  useEffect(() => {
    axios.get('http://localhost:8000/api/items')
      .then((response) => setItems(response.data))
      .catch((error) => console.error(error));
  }, []);

  
  const handleAddProductsClick = (event) => {
    event.preventDefault();
  
    // Check if both item, quantity, and selling price are provided
    if (selectedItem && quantity) {
      setSelectedData((prevSelectedData) => {
        // Find the selected item
        const selectedItemData = items.find((item) => item.name === selectedItem);
        const totalPrice = calculateTotalPrice(selectedItemData, quantity);

        // Use the previous state to avoid overwriting existing data
        return {
          ...prevSelectedData,
          items: [
            ...prevSelectedData.items,
            {
              item: selectedItem,
              quantity: parseInt(quantity, 10),
              sellingPrice: selectedItemData ? cleanAndParseSellingPrice(selectedItemData.selling) : 0,
              totalPrice: totalPrice,

            },
          ],
        };
      });
    }
  
    // Clear the selected item and quantity after processing
    setSelectedItem('');
    setQuantity('');
  };

  const calculateTotalPrice = (selectedItemData, quantity) => {
    const sellingPrice = selectedItemData ? cleanAndParseSellingPrice(selectedItemData.selling) : 0;
    return sellingPrice * parseInt(quantity, 10);
  };
  const cleanAndParseSellingPrice = (sellingPriceString) => {
    const cleanedPrice = sellingPriceString.replace(/[^\d.]/g, ''); // Remove non-numeric characters
    return parseFloat(cleanedPrice) || 0; // Parse to float, default to 0 if parsing fails
  };
  const handleItemSelect = (event) => {
    const selectedItem = event.target.value;
    setSelectedItem(selectedItem);
  };

  const handleQuantityChange = (event) => {
    const quantityValue = event.target.value;
    setQuantity(quantityValue);
  };
/* ------------------ DROPDOWN ------------------*/



  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);
  
    try {
      const selectedItemsArray = selectedData.items.map((selectedItem) => ({
        item: selectedItem.item,
        quantity: selectedItem.quantity,
        sellingPrice: selectedItem.sellingPrice,
        totalPrice: selectedItem.totalPrice,

      }));
      console.log("items :  ", items)
      
      const totalSelectedPrice = selectedItemsArray.reduce((total, item) => total + item.totalPrice, 0);

      // Send data to the billing endpoint
      await axios.post('http://localhost:8000/bill', {
        name,
        email,
        mob_number: phoneNumber,
        selectedItems: selectedItemsArray,
        totalSelectedPrice: totalSelectedPrice,

      });
  
      // Send data to the updateQuantities endpoint
      await axios.post('http://localhost:8000/api/updateQuantities', {
        items : items,
        updatedQuantities: selectedItemsArray,
      });
  
      console.log('Data submitted successfully, and quantities updated in the database!');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  const computeRemainingQuantity = (itemName) => {
    const selectedQuantity = selectedData.items.find((selectedItem) => selectedItem.item === itemName)?.quantity || 0;
    const originalQuantity = items.find((item) => item.name === itemName)?.quantity || 0;
    return originalQuantity - selectedQuantity;
  };


  return (
    <Form action="POST" onSubmit={handleSubmit} noValidate  validated={validated}>
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label >Name</Form.Label>
        <Form.Control  value={selectedData.name} onChange={handleName} type="text" placeholder="Enter name....." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label >Email address</Form.Label>
        <Form.Control value={selectedData.email} onChange={handleEmail} type="email" placeholder="Enter email......" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label >Phone number</Form.Label>
        <Form.Control value={selectedData.mob_number} onChange={handleNumber} type="text" placeholder="Phone number....." />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Choose your products</Form.Label>
     
        <div>
        <label>Select an item: </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <select onChange={handleItemSelect} value={selectedItem}>
        <option value="">--Select a product--</option>
        {items.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name} - Remaining Quantity: {computeRemainingQuantity(item.name)}
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
  {selectedData.items.length > 0 ? (
    <ul>
      {selectedData.items.map((selectedItem, index) => (
        <li key={index}>
          Product: {selectedItem.item} - Quantity: {selectedItem.quantity} - Selling Price: ${selectedItem.sellingPrice}
        </li>
      ))}
    </ul>
  ) : (
    <p>No selected data.</p>
  )}
</div>
      </Form.Group>
         <Button variant="success" type='submit'>Submit </Button> 
    </Form>
   
  );
}

export default Billing
