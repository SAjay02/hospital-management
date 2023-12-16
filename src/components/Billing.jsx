import {React, useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from './Dropdown';
import axios from 'axios'
// const product = require('../Server/mod/els/productModels')
// import {availableProducts} from '../Server/app.js'
// const product = require('../Server/app.js')
export const selectedItemsArray_to_backend =[{}]
const Billing = () => {
  // console.log('billdata : ',billData)
  const [name, setName] = useState('');
  const [validated, setValidated] = useState(false);

    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedItems, setSelectedItems] = useState({});

/* ------------------ DROPDOWN ------------------*/
const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [ selectedData, setSelectedData] = useState({});

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

    // Check if both item and quantity are provided
    if (selectedItem && quantity) {
      setSelectedData((prevSelectedData) => {
        // datas.push(selectedData)
        // Use the previous state to avoid overwriting existing data
        return {
          ...prevSelectedData,
          [selectedItem]: parseInt(quantity, 10),
        };
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
/* ------------------ DROPDOWN ------------------*/

    const handleProductSelect = (selectedProduct) => {
     
    setSelectedItems((prevItems) => {
      const updatedItems = { ...prevItems };
      updatedItems[selectedProduct] = (updatedItems[selectedProduct] || 0) + 1;
      return updatedItems;
     }
  )
  // console.log("selected product : ", selectedProduct)

  // setSelectedItems(billData)
};
  // {console.log(selectedItems)}
  // const handleQuantityChange = (product, newQuantity) => {
  //   setSelectedItems((prevItems) => {
  //     const updatedItems = { ...prevItems };
  //     updatedItems[product] = newQuantity;
  //     return updatedItems;
  //   });
  // };

  // const handleRemoveItem = (product) => {
  //   setSelectedItems((prevItems) => {
  //     const updatedItems = { ...prevItems };
  //     delete updatedItems[product];
  //     return updatedItems;
  //   });
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Access the form data, including selected items
  //   console.log({
  //     name,
  //     email,
  //     phoneNumber,
  //     selectedItems,
  //   });
  //   // Convert selected items to JSON string for display
  //   const selectedItemsJson = JSON.stringify(selectedItems, null, 2);
  //   console.log(selectedItemsJson);
  //   // Add logic to further process or store the form data
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);
  
    try {
      const selectedItemsArray = Object.keys(selectedData).map((itemName) => ({
        item: itemName,
        quantity: selectedData[itemName],
      }));

      // // console.log("selectedItemsArray : ",selectedItemsArray)
      console.log("items :  ", items)
      // console.log("selecteditemarray : ", selectedItemsArray)
      // selectedItemsArray_to_backend = Object.keys(selectedData).map((itemName) => ({
      //   name: itemName,
      //   quantity: selectedData[itemName],
      // }));
  
      // Send data to the billing endpoint
      await axios.post('http://localhost:8000/bill', {
        name,
        email,
        mob_number: phoneNumber,
        selectedItems: selectedItemsArray,
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
    const selectedQuantity = selectedData[itemName] || 0;
    const originalQuantity = items.find((item) => item.name === itemName)?.quantity || 0;
    return originalQuantity - selectedQuantity;
  };

  // {console.log("items : ",items)}
  // {console.log("selected data : ",selectedData)}



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
        {/* <Dropdown onChange={handleProductSelect} /> */}

        {/* DropDOwn */}
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
      
      {/* <Billing dataToSend={selectedData}/> */}
      <hr />
      <div>
        <label>Selected Data:</label>
        {Object.keys(selectedData).length > 0 ? (
  <ul>
    {Object.keys(selectedData).map((item, index) => (
      <li key={index}>
        Product: {item} - Quantity: {selectedData[item]}
      </li>
    ))}
  </ul>
) : (
  <p>No selected data.</p>
)}
      </div>
        {/* DropDOwn */}
      </Form.Group>
         <Button variant="success" type='submit'>Submit </Button> 
    </Form>
   
  );
}

export default Billing
// export {selectedItemsArray_to_backend}