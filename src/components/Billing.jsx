import {React, useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'animate.css'
import Dropdown from './Dropdown';
import axios from 'axios'
import {Card, Container, Row} from 'react-bootstrap'
import '../pages/BillingForm.css'
import '../App.css'
import { saveAs } from 'file-saver';
import { Document, Page } from 'react-pdf';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiSolidAddToQueue } from "react-icons/bi";
import { FaHornbill } from "react-icons/fa";
import { PDFDocument,rgb} from 'pdf-lib'; // Corrected import
// import {ProductCard} from './Current'
// import {generatePDF} from '../pages/pdfGenerator'
// const product = require('../Server/mod/els/productModels')
// import {availableProducts} from '../Server/app.js'
// const product = require('../Server/app.js')
import jsPDF from 'jspdf';
import 'jspdf-autotable';
const Billing = () => {

  const [name, setName] = useState('');
  // const [total_price, setTotal_price] = useState('');
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  // const [selectedItems, setSelectedItems] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);
  const [productErrors, setProductErrors] = useState({name:"",email:"",phoneNumber:"",selectedData1:"",billBtnError:""})
  const [addProductsError, setAddProductsError] = useState({ error: '' });
  const [generateBillError, setGenerateBillError] = useState({error:''});
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


 
  // const generatePDF = async () => {
  //   try {
  //     // Create a new PDF document
  //     // computeTotalPrice();
  //     const pdfDoc = await PDFDocument.create();
  //     const page = pdfDoc.addPage();
  //     const { width, height } = page.getSize();

  //     // const font = await pdfDoc.embedFont(PDFDocument.Font.Helvetica);

  //     // Add a title
  //     page.drawText('Invoice', { x: 50, y: height - 50,  size: 24, color: rgb(0, 0, 0) });
  
  //    // Add customer details
  //   page.drawText(`Name: ${name}`, { x: 50, y: height - 80 });
  //   page.drawText(`Email: ${email}`, { x: 50, y: height - 105 });
  //   page.drawText(`Phone Number: ${phoneNumber}`, { x: 50, y: height - 130 });

  //   // Add a separator line
  //   page.drawLine({ start: { x: 50, y: height - 140 }, end: { x: width - 50, y: height - 140 }, thickness: 2, color: rgb(0, 0, 0) });

  //   // Add table header
  //   let yOffset = height - 170;
  //   page.drawText('Product', { x: 50, y: yOffset, });
  //   page.drawText('Quantity', { x: 200, y: yOffset, });
  //   page.drawText('Unit Price', { x: 350, y: yOffset, });
  //   page.drawText('Total ', { x: 500, y: yOffset, });

  //   // Add a separator line
  //   page.drawLine({ start: { x: 50, y: yOffset - 15 }, end: { x: width - 50, y: yOffset - 10 }, thickness: 2, color: rgb(0, 0, 0) });

  //   // Add details of selected items in a table-like layout
  //   selectedData.items.forEach((item) => {
  //     yOffset -= 50;
  //     page.drawText(item.item, { x: 50, y: yOffset });
  //     page.drawText(item.quantity.toString(), { x: 200, y: yOffset });
  //     page.drawText(item.sellingPrice.toString(), { x: 350, y: yOffset });
  //     page.drawText(item.totalPrice.toString(), { x: 500, y: yOffset });
  //   });

  //   // Add a separator line
  //   page.drawLine({ start: { x: 50, y: yOffset - 15 }, end: { x: width - 50, y: yOffset - 10 }, thickness: 2, color: rgb(0, 0, 0) });

  //   // Add the total price
  //   yOffset -= 30;
  //   page.drawText(`Total Amount: ${totalPrice}`, { x: 50, y: yOffset-20 });
  //     // Convert the PDF document to bytes
  //     const pdfBytes = await pdfDoc.save();

  //     // Create a Blob from the PDF bytes
  //     const blob = new Blob([pdfBytes], { type: 'application/pdf' });

  //     // Download the PDF
  //     saveAs(blob, 'bill.pdf');
  //   } catch (error) {
  //     console.error('Error generating PDF:', error);
  //   }
  // };

  
const generatePDF = () => {
  try {
    // Create a new jsPDF instance
    const pdfDoc = new jsPDF();

    // Add title to the PDF
    pdfDoc.text('Invoice', 100, 20);

    // Add customer details
    pdfDoc.text(`Name: ${name}`, 20, 40);
    pdfDoc.text(`Email: ${email}`, 20, 55);
    pdfDoc.text(`Phone Number: ${phoneNumber}`, 20, 70);

    // Add a separator line
    pdfDoc.line(20, 80, 190, 80);

    // Add table header
    pdfDoc.autoTable({
      startY: 90,
      head: [['Product', 'Quantity', 'Unit Price', 'Total']],
      theme: 'plain',
    });

    // Add details of selected items in a table-like layout
    const data = selectedData.items.map(item => [item.item, item.quantity, item.sellingPrice, item.totalPrice]);

    pdfDoc.autoTable({
      startY: 110,
      body: data,
      theme: 'plain',
    });

    // Add the total amount
    pdfDoc.text(`Total Amount: ${totalPrice}`, 20, pdfDoc.autoTable.previous.finalY + 20);

    // Save the PDF
    pdfDoc.save('bill.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

  const handleGenerateBill = (event) => {
    event.preventDefault();
    if (selectedData.items.length === 0 || !submitted) {
      setProductErrors({ ...productErrors, billBtnError: "Please submit before generating the bill" });
      return;
    }

    if (!submitted) {
      setAddProductsError({ error: 'Please submit the form first' });
      return;
    }
    // Call the function to compute the total price
    // computeTotalPrice();

    // Now you can use the totalPrice state for further actions
    console.log('Total Price:', totalPrice);

    // Generate PDF and allow the user to download it
    generatePDF();
    setProductErrors({ ...productErrors, billBtnError: '' });

  };















  // const computeTotalPrice = () => {
  //   setTotalPrice(
  //     selectedData.items.reduce((total, item) => total + item.totalPrice, 0)
  //   );
  // };

  const handleAddProductsClick = (event) => {
    event.preventDefault();
  

  

    // Reset the error when the form is submitted
    setAddProductsError({ error: '' });

    // Check if selected item is empty or not selected
    if (!selectedItem) {
      setAddProductsError({error:'Please select a product'});
      return;
    }
  
    // Check if quantity is provided
    if (!quantity) {
      setAddProductsError({error:'Please enter quantity'});
      return;
    }
  
    // Find the selected item
    const selectedItemData = items.find((item) => item.name === selectedItem);
    const totalPrice = calculateTotalPrice(selectedItemData, quantity);
  
    // Update the selected data state
    setSelectedData((prevSelectedData) => ({
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
    }));
  
    // Clear the selected item and quantity after processing
    setSelectedItem('');
    setQuantity('');
    setAddProductsError(null); // Clear the error when successfully adding a product
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
    setProductErrors({ ...productErrors, selectedData1: '' }); // Clear the error when a product is selected
  };
  
  const handleQuantityChange = (event) => {
    const quantityValue = event.target.value;
    setQuantity(quantityValue);
  };
/* ------------------ DROPDOWN ------------------*/

const validate = () =>{
  const newErrors = {}
  const isalpha = str => /^[a-zA-Z]*$/.test(str);
  function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    // alert("You have entered an invalid email address!")
    return (false)
}

  if(name.length <=2 || !isalpha(name))
    newErrors.name = "Please enter valid name"
  if(!ValidateEmail(email))
    newErrors.email = "Please enter valid email"
  if(!(phoneNumber.length == 10))
    newErrors.phoneNumber =  "Please enter your valid Contact Number"
  if (selectedData.items.length === 0) newErrors.selectedData1 = 'Please select a product and enter quantity';

    return newErrors
}

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);
    setSubmitted(true);

    const errorProduct  = validate();
    if(Object.keys(errorProduct).length > 0){
      setProductErrors(errorProduct)
      return
    }
    else{
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
    <>
    <div className="container mt-5 mb-5 ">

    <Form className="form-body" action="POST" onSubmit={handleSubmit} noValidate  validated={validated}>
       <Form.Group className="mb-3" controlId="formName">
        <Form.Label >Name</Form.Label>
        <Form.Control 
        isInvalid ={!!productErrors.name}
        className="input-with-padding"  
        value={selectedData.name} 
        onChange={handleName} 
        type="text" 
        placeholder="Enter name....." />
        <Form.Control.Feedback style={{marginTop:"-15px"}} type='invalid'>{productErrors.name}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label >Email address</Form.Label>
        <Form.Control 
          className="input-with-padding"                         
          isInvalid ={!!productErrors.email}
          value={selectedData.email} 
          onChange={handleEmail} 
          type="email" 
          placeholder="Enter email......" />
        <Form.Control.Feedback style={{marginTop:"-15px"}} type='invalid'>{productErrors.email}</Form.Control.Feedback>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhoneNo">
        <Form.Label >Phone number</Form.Label>
        <Form.Control className="input-with-padding"                         
        isInvalid ={!!productErrors.phoneNumber}
        value={selectedData.mob_number} 
        onChange={handleNumber} 
        type="text" 
        placeholder="Phone number....." />
        <Form.Control.Feedback  type='invalid'>{productErrors.phoneNumber}</Form.Control.Feedback>
      </Form.Group>
      
      <div className='billing-content'> 
      <Form.Group className="mb-3" controlId="formSelectProducts">
  <Form.Label style={{paddingTop:"5px"}}> Choose your products</Form.Label>
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
  <div className='add-prod-btn'>
    <button className='in-button billing-btn' onClick={handleAddProductsClick}>
      <MdOutlineProductionQuantityLimits size={20} className='icon' />Add Products
    </button>
    {addProductsError && <div className="error-message"  style={{color:"red"}}>{addProductsError.error}</div>}
    {console.log(addProductsError)}
  </div>
  <Form.Control.Feedback>{productErrors.selectedData1}</Form.Control.Feedback>
  {console.log(productErrors.selectedData1)}
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
      <div className='submit-btn'>
         <button  className='in-button billing-btn' type='submit'> <BiSolidAddToQueue size={17} className='submit-btn-icon'/>Submit </button> 
      </div>
      <div className='bill-btn'>
        <button type="submit" className='in-button billing-btn' onClick={handleGenerateBill}>
          <FaHornbill size={20} className='icon' />Generate Bill
        </button>
        <Form.Control.Feedback 
          style={{color:"red", marginTop:"10px"}}>
          {productErrors.billBtnError}
        </Form.Control.Feedback>
        {/* {productErrors.billBtnError} */}
      </div>
      </div>
    </Form><br />
    </div>

   </>
  );
}

export default Billing


// style={{ marginLeft: '100px' }}
// style={{ marginLeft: '600px' }}
// style={{ marginLeft: '250px' }}
// const Billing = () =>{

//   const [data, setData] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:8000/api/data')
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   const handleCardClick = (product) => {
//     setSelectedProduct(product);
//   };

//   return(
//     <div className="card">
//     <Container>
//       <Row className='first-content'>
//         {data.map((product) => (
//           <ProductCard
//             key={product.id}
//             product={product}
//             onClick={() => handleCardClick(product)}
//           />
//         ))}
//       </Row>
//       <Row>
        
//       </Row>
//     </Container>
//     </div>
//   );
// }


// export default Billing
