import React from 'react'
import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import {Card} from 'react-bootstrap'
import axios from 'axios'

const AddProducts = () => {
  const [color, setColor] = useState("#00806B");
  const [validated, setValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [product,setProduct]=useState(
    {
    name:"",
    description:"",
    state:"",
    quantity:"",
    measurement:"",
    condition:"",
    entryDate:"",
    manufactureDate:"",
    expiryDate:"",
    cost:"",
    selling:"",
    companyName:"",
    batch:"",
    vendorName:"",
    vendorNo:""
  }
  );

  const [productErrors,setProductErrors]=useState(
    {
    name:"",
    description:"",
    state:"",
    quantity:"",
    measurement:"",
    condition:"",
    entryDate:"",
    manufactureDate:"",
    expiryDate:"",
    cost:"",
    selling:"",
    companyName:"",
    batch:"",
    vendorName:"",
    vendorNo:""
  }
  );
  // const validateName = (value) => {
  //   if (value.length <= 5 ) {
  //     return "Invalid characters in product name.";
  //   }
  //   return "";
  // };

  // const validateDescription = (value) => {
  //   if (value.length <= 5) {
  //     return "Please give detailed Description about the product.";
  //   }
  //   return "";
  // };

  const validateField = () =>{
    const  {
      name,
      description,
      state,
      quantity,
      measurement,
      condition,
      entryDate,
      manufactureDate,
      expiryDate,
      cost,
      selling,
      companyName,
      batch,
      vendorName,
      vendorNo
    } = product
    const newErrors = {}
    const isalpha = str => /^[a-zA-Z]*$/.test(str);

         if(!name || name === "Enter Product" || name.length < 3)
          newErrors.name =     "Please enter the valid product name"
            
        if(!description || description === "" || description.length < 10)
          newErrors.description =   "Please give the detailed description of the product"
            
        
        if(!state || state === "" || state.length < 3 ||!isalpha(state))
            newErrors.state =   "Please enter the valid state"
              
         if(!quantity || quantity === "" )
            newErrors.quantity =   "Enter the quantity in numerical form"
              
            if(!measurement || measurement === "")
            newErrors.measurement =   "Enter the measurements in numerical form"
             
            if(!manufactureDate || manufactureDate === 'mm/dd/yyyy')

            newErrors.manufactureDate =   "Select the manufacture date"
            
            if(!expiryDate || expiryDate === "")
            newErrors.expiryDate =   "Select the expiry date"
            
            if(!entryDate || entryDate === "")
            newErrors.entryDate =   "Select the entry date"
            
           if(!condition || condition === "" || condition.length <= 2 ||!isalpha(condition))
            newErrors.condition =  "Please give the preferrable conditions"
              
            if(!cost || cost === "" )
            newErrors.cost =   "Enter the cost price in numerical form"
              
           if(!selling || selling === "" )
            newErrors.selling =   "Enter the selling price in numerical form"
                   
           if(!companyName || companyName === "" || companyName.length < 3 ||!isalpha(companyName))
          newErrors.companyName =   "Please give the valid Company Name"
            
           if(!batch || batch === "" || batch.length <=2)
            newErrors.batch =    "Enter the batch number in numerical form"            
              
           if(!vendorName || vendorName === "" || vendorName.length <=3 || !isalpha(vendorName))
            newErrors.vendorName =   "Please enter the vendor name"            
              
             if(!vendorNo || vendorNo === "" ) 
          newErrors.vendorNo =        "Enter the vendor Number in numerical form"           
            
    return newErrors
  }

  // const handleChange=(e)=>
  // {
  //   // const { name, value } = e.target;

  //   // switch (name) {
  //   //   case "name":
  //   //     if (!/^[a-zA-Z\s]+$/.test(value)) {
  //   //       setProductErrors({ ...productErrors, name: "Invalid characters" });
  //   //       return;
  //   //     }
  //   //     break;
  //   //   case "description":
  //   //     // Add validation logic for "Description" if needed
  //   //     setProductErrors({ ...productErrors, description: "" });
  //   //     break;
  //   //   // Add cases for other form control elements and their validation
  //   //   default:
  //   //     break;
  //   //   }
  //   const { name, value } = e.target;

  //   // const error = validateField(name, value);

  //   setProductErrors((prevErrors) => ({
  //     ...prevErrors,
  //     [name]: "",
  //   }));
  
  //   setProduct((prevProduct) => ({
  //     ...prevProduct,
  //     [name]: value,
  //   }));
  // };
  
  const setField = (field, value) =>{

    setProduct({
      ...product,
      [field] : value
    })

    if(!!productErrors[field]){
      setProductErrors({
        ...productErrors,
        [field] : null
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  // console.log("product ", product)
    // let errors = {};
    // let hasErrors = false;
  
    // Validate each field
    // Object.entries(product).forEach(([fieldName, value]) => {
    //   const error = validateField(fieldName, value);
    //   errors[fieldName] = error;
  
    //   // if (error) {
    //   //   hasErrors = true;
    //   // }
    // });
  const formErrors = validateField()
  console.log("formErrors : ", formErrors)
  if(Object.keys(formErrors).length > 0){
    setProductErrors(formErrors)
  }else{
    console.log("form submitted")
  
    // Update the productErrors state with the new errors only when submit button is clicked
    // if (formSubmitted) {
      // setProductErrors(errors);
    // }
  
    // if (hasErrors) {
    //   // If any error exists, prevent form submission
    //   setValidated(true);
    //   return;
    // }
    // if (Object.values(errors).some((error) => error !== "")) {
    //   // If any error exists, prevent form submission
    //   setValidated(true);
    //   setFormSubmitted(true);
    //   return;
    // }
    // Your existing try-catch block for submitting data to the server
    try {
      console.log('Form Data:', product);
      axios.post("http://localhost:8000", product)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log("Error:" + error);
    }
  
    setValidated(true);
  }
  console.log("productErrors : ", productErrors)

  };
  return (
    <div className="container mt-5 mb-5 ">
      <Row>
        <Col className="col-sm-12">
              <Card >
                  <Card.Body>
                      <Form action="POST" onSubmit={handleSubmit} noValidate validated={validated}>
                      <Form.Group as={Row} className="mb-2" >
                      <Form.Label >Product Name</Form.Label>
                      <Col>
                      <Form.Control
                        controlId = 'name'
                        type="text"
                        placeholder="Enter Product"
                        value={product.name}
                        onChange={(e)=>{setField('name', e.target.value)}}
                        isInvalid ={!!productErrors.name}
                        // name="name"
                        required
                        
                      />
                        <Form.Control.Feedback type="invalid">
                          {productErrors.name}
                        </Form.Control.Feedback>
                      </Col>
                      </Form.Group>
                      
                      <Form.Group className="mb-2" >
                        <Row>
                        <Col sm={10} lg={6}>
                          <Form.Label column >Description</Form.Label>
                          <Form.Control 
                          controlId = 'description'
                          type="text" 
                          placeholder="Product Description" 
                          value={product.description}
                          onChange={(e)=>{setField('description', e.target.value)}}
                          isInvalid ={!!productErrors.description} 
                          // name="description" 
                          required/>
                          
                          <Form.Control.Feedback type="invalid">{productErrors.description}</Form.Control.Feedback>

                        </Col>

                        <Col sm={10} lg={6}>
                          <Form.Label column >State</Form.Label>
                            <Form.Control 
                            controlId = 'state'
                            type="text" 
                            placeholder="Enter State" 
                            value={product.state} 
                            onChange={(e)=>{setField('state', e.target.value)}}
                            isInvalid ={!!productErrors.state} 
                            name="state" 
                            required/>
                            <Form.Control.Feedback type="invalid">{productErrors.state}</Form.Control.Feedback>

                        </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group className="mb-2" >
                        <Row>
                        <Col sm={10} lg={6}>
                        <Form.Label column >Quantity</Form.Label>
                            <Form.Control 
                            controlId = 'quantity'
                            type="text" 
                            placeholder="Enter Quantity" 
                            value={product.quantity}
                            onChange={(e)=>{setField('quantity', e.target.value)}}
                            isInvalid ={!!productErrors.quantity} 
                            name="quantity" 
                            required/>
                            <Form.Control.Feedback type="invalid">{productErrors.quantity}</Form.Control.Feedback>

                        </Col>
                        <Col sm={10} lg={6}>
                          <Form.Label column >Measurement</Form.Label>
                          <Form.Control 
                          controlId = 'measurement'
                          type="text" 
                          placeholder="Enter Product" 
                          value={product.measurement} 
                          onChange={(e)=>{setField('measurement', e.target.value)}}
                        isInvalid ={!!productErrors.measurement} 
                        name="measurement" 
                        required/>
                          <Form.Control.Feedback type="invalid">{productErrors.measurement}</Form.Control.Feedback>

                        </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group className="mb-2" >
                        <Row>
                        <Col sm={10} lg={6}>
                        <Form.Label column >Storage Conditions</Form.Label>
                        <Form.Control
                         controlId = 'condition'
                        type="text" 
                        placeholder="Enter Product" 
                        value={product.condition} 
                        onChange={(e)=>{setField('condition', e.target.value)}}
                        isInvalid ={!!productErrors.condition}
                         name="condition" 
                         required/>
                        <Form.Control.Feedback type="invalid">{productErrors.condition}</Form.Control.Feedback>

                        </Col>
                        <Col sm={10} lg={6}>
                          <Form.Label column >Product Entry Date</Form.Label>
                          <Form.Control 
                          controlId ='entryDate'
                          type="date" 
                          value={product.entryDate} 
                          onChange={(e)=>{setField('entryDate', e.target.value)}}
                          isInvalid ={!!productErrors.entryDate}
                          name="entryDate" 
                          required/>
                        </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group className="mb-2" >
                        <Row>
                        <Col sm={10} lg={6}>
                        <Form.Label column >Manufacture Date</Form.Label>
                        <Form.Control 
                        type='date'
                        controlId ="manufactureDate" 
                        value={product.manufactureDate} 
                        onChange={(e)=>{setField('manufactureDate', e.target.value)}}
                        isInvalid ={!!productErrors.manufactureDate}                        
                         name="manufactureDate" 
                         required/>
                        </Col>
                        <Col sm={10} lg={6}>
                          <Form.Label column >Expiry Date</Form.Label>
                          <Form.Control 
                          controlId="expiryDate"
                          type="date" 
                          value={product.expiryDate}
                          onChange={(e)=>{setField('expiryDate', e.target.value)}}
                          isInvalid ={!!productErrors.expiryDate}         
                          name="expiryDate" 
                           required/>
                        </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group className="mb-2" >
                        <Row>
                        <Col sm={10} lg={6}>
                        <Form.Label column>Cost Price</Form.Label>
                        <Form.Control 
                        controlId = 'cost'
                        type="text" 
                        placeholder="Enter Price" 
                        value={product.cost}
                        onChange={(e)=>{setField('cost', e.target.value)}}
                        isInvalid ={!!productErrors.cost} 
                        name="cost" 
                        required/>
                        <Form.Control.Feedback type="invalid">{productErrors.cost}</Form.Control.Feedback>

                        </Col>
                        <Col sm={10} lg={6}>
                          <Form.Label column>Selling Price</Form.Label>
                          <Form.Control 
                          controlId = 'selling'
                          type="text"
                           placeholder="Enter Price" 
                           value={product.selling} 
                           onChange={(e)=>{setField('selling', e.target.value)}}
                        isInvalid ={!!productErrors.selling}
                        
                        name="selling" 
                        required/>
                          <Form.Control.Feedback type="invalid">{productErrors.selling}</Form.Control.Feedback>

                        </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group className="mb-2" >
                        <Row>
                        <Col sm={10} lg={6}>
                        <Form.Label column>Company Name</Form.Label>
                        <Form.Control 
                        controlId = 'companyName'
                        type="text" 
                        placeholder="Enter Company Name" 
                        value={product.companyName} 
                        onChange={(e)=>{setField('companyName', e.target.value)}}
                        isInvalid ={!!productErrors.companyName} 
                        name="companyName" 
                        required/>
                        <Form.Control.Feedback type="invalid">{productErrors.companyName}</Form.Control.Feedback>

                        </Col>
                        <Col sm={10} lg={6}>
                          <Form.Label column>Batch Number</Form.Label>
                          <Form.Control 
                          controlId = 'batch'
                          type="text" 
                          placeholder="Enter Number" 
                          value={product.batch} 
                          onChange={(e)=>{setField('batch', e.target.value)}}
                        isInvalid ={!!productErrors.batch} 
                        name="batch" 
                        required/>
                          <Form.Control.Feedback type="invalid">{productErrors.batch}</Form.Control.Feedback>

                        </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group className="mb-2" >
                        <Row>
                        <Col sm={10} lg={6}>
                        <Form.Label column>Vendor Name</Form.Label>
                        <Form.Control 
                        controlId = 'vendorName'
                        type="text" 
                        placeholder="Enter Name" 
                        value={product.vendorName}   
                        onChange={(e)=>{setField('vendorName', e.target.value)}}
                        isInvalid ={!!productErrors.vendorName}
                         name="vendorName" 
                         required/>
                        <Form.Control.Feedback type="invalid">{productErrors.vendorName}</Form.Control.Feedback>

                        </Col>
                        <Col sm={10} lg={6}>
                          <Form.Label column>Vendor Number</Form.Label>
                          <Form.Control 
                          controlId = 'vendorNo'
                          type="text" 
                          placeholder="Enter Number" 
                          value={product.vendorNo} 
                          onChange={(e)=>{setField('vendorNo', e.target.value)}}
                          isInvalid ={!!productErrors.vendorNo }
                          name="vendorNo" 
                          required/>
                          <Form.Control.Feedback type="invalid">{productErrors.vendorNo}</Form.Control.Feedback>

                        </Col>
                        </Row>
                      </Form.Group>
                      <div className="text-center">
                      <button className='in-button' type="submit">Submit</button>
                      </div>
                      </Form>
                  </Card.Body>
              </Card>
        </Col>
      </Row>
    </div>
  )
}
export default AddProducts