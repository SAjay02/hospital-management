import {React, useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from './Dropdown';
import axios from 'axios'
import '../pages/BillingForm.css'
import { saveAs } from 'file-saver';
import { Document, Page } from 'react-pdf';
import { PDFDocument } from 'pdf-lib'; // Corrected import

// import {generatePDF} from '../pages/pdfGenerator'
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
  const [totalPrice, setTotalPrice] = useState(0);

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


 
  const generatePDF = async () => {
    try {
      // Create a new PDF document
      // computeTotalPrice();
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();

      // Add content to the PDF (customize this based on your data)
      page.drawText(`Name: ${name}`, { x: 50, y: height - 50 });
      page.drawText(`Email: ${email}`, { x: 50, y: height - 70 });
      page.drawText(`Phone Number: ${phoneNumber}`, { x: 50, y: height - 90 });

      // Add details of selected items
      selectedData.items.forEach((item, index) => {
        const yOffset = height - 120 - index * 20;
        page.drawText(`Product: ${item.item} - Quantity: ${item.quantity} - Selling Price: ${item.sellingPrice}`, {
          x: 50,
          y: yOffset,
        });
      });

      const totalYOffset = height - 120 - selectedData.items.length * 20 - 20;
      page.drawText(`Total Price: ${totalPrice}`, { x: 50, y: totalYOffset });

      // Convert the PDF document to bytes
      const pdfBytes = await pdfDoc.save();

      // Create a Blob from the PDF bytes
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });

      // Download the PDF
      saveAs(blob, 'bill.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleGenerateBill = (event) => {
    event.preventDefault();

    // Call the function to compute the total price
    // computeTotalPrice();

    // Now you can use the totalPrice state for further actions
    console.log('Total Price:', totalPrice);

    // Generate PDF and allow the user to download it
    generatePDF();
  };















  // const computeTotalPrice = () => {
  //   setTotalPrice(
  //     selectedData.items.reduce((total, item) => total + item.totalPrice, 0)
  //   );
  // };




  const handleAddProductsClick = (event) => {
    event.preventDefault();
  
    // Check if both item, quantity, and selling price are provided
    if (selectedItem && quantity) {

      setSelectedData((prevSelectedData) => {
        // Find the selected item
        const selectedItemData = items.find((item) => item.name === selectedItem);
        const totalPrice = calculateTotalPrice(selectedItemData, quantity);
        setTotalPrice(totalPrice)

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
    // computeTotalPrice();

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
      setTotalPrice(totalSelectedPrice)
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

  // const handleDownloadBill = async () => {
  //   // Validate and submit the form data
  //   try {
  //     await handleSubmit();

  //     // Generate PDF using the submitted data
  //     const billData = {
  //       name,
  //       email,
  //       mob_number: phoneNumber,
  //       selectedItems: selectedData.items,
  //       totalSelectedPrice: selectedData.items.reduce((total, item) => total + item.totalPrice, 0),
  //     };

  //     await generatePDF(billData, 'bill.pdf');

  //     console.log('PDF generated successfully');
  //   } catch (error) {
  //     console.error('Error generating PDF:', error);
  //   }
  // };

  return (
    <Form className="form-body" action="POST" onSubmit={handleSubmit} noValidate  validated={validated}>
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label >Name</Form.Label>
        <Form.Control className="input-with-padding"  value={selectedData.name} onChange={handleName} type="text" placeholder="Enter name....." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label >Email address</Form.Label>
        <Form.Control className="input-with-padding"  value={selectedData.email} onChange={handleEmail} type="email" placeholder="Enter email......" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label >Phone number</Form.Label>
        <Form.Control className="input-with-padding"  value={selectedData.mob_number} onChange={handleNumber} type="text" placeholder="Phone number....." />
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
      <Button style={{ marginLeft: '100px' }}  variant="success"onClick={handleAddProductsClick}>Add Products</Button>
      
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
         <Button style={{ marginLeft: '100px' }} className="form-btn" variant="success" type='submit'>Submit </Button> 
          {/* <Button variant="primary" type="button" onClick={handleDownloadBill}>
          Download Bill
        </Button> */}

<Button variant="success" type="submit" onClick={handleGenerateBill}>
          Generate Bill
        </Button>
    </Form>
   
  );
}

export default Billing
