import {React, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from './Dropdown';
import axios from 'axios'
// const product = require('../Server/mod/els/productModels')
// import {availableProducts} from '../Server/app.js'
// const product = require('../Server/app.js')
const Billing = () => {
  // console.log(availableProducts)
  const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedItems, setSelectedItems] = useState({});

    const handleProductSelect = (selectedProduct) => {
    setSelectedItems((prevItems) => {
      const updatedItems = { ...prevItems };
      updatedItems[selectedProduct] = (updatedItems[selectedProduct] || 0) + 1;
      return updatedItems;
    });
  };

  const handleQuantityChange = (product, newQuantity) => {
    setSelectedItems((prevItems) => {
      const updatedItems = { ...prevItems };
      updatedItems[product] = newQuantity;
      return updatedItems;
    });
  };

  const handleRemoveItem = (product) => {
    setSelectedItems((prevItems) => {
      const updatedItems = { ...prevItems };
      delete updatedItems[product];
      return updatedItems;
    });
  };

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


  const handleSubmit=(event)=>
  {
    event.preventDefault();
    try
    {
        console.log('Form Data:', selectedItems); 
        axios.post("http://localhost:8000",selectedItems).then((response)=>console.log(response)).catch((error)=>console.log(error));
    }
    catch(event){
      console.log("Error:"+event);
    }
  }

  return (
    <Form>
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name....." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email......" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Phone number</Form.Label>
        <Form.Control type="text" placeholder="Phone number....." />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Choose your products</Form.Label>
        <Dropdown onSelect={handleProductSelect} />
      </Form.Group>
         <Button onSubmit={handleSubmit}variant="success">
        Submit
      </Button> 
    </Form>
  );
}

export default Billing
// export {selectedItems}