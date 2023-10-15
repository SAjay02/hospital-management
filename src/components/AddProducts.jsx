import React from 'react'
import { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import axios from 'axios'

const AddProducts = () => {
  const [color, setColor] = useState("#00806B");
  const [validated, setValidated] = useState(false);
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
  
  const handleChange=(e)=>
  {
    setProduct({
      ...product,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit=(event)=>
  {
    event.preventDefault();
    try
    {
        console.log('Form Data:', product); 
        axios.post("http://localhost:8000",product).then((response)=>console.log(response)).catch((error)=>console.log(error));
    }
    catch(event){
      console.log("Error:"+event);
    }
    setValidated(true);
  }
  return (
    <div className="container mt-5 mb-5 ">
      <Row>
        <Col className="col-sm-12">
              <Card>
                  <Card.Body>
                      <Form action="POST" onSubmit={handleSubmit} noValidate validated={validated}>
                      <Form.Group as={Row} className="mb-2" controlId="formPlaintextEmail">
                      <Form.Label >Product Name</Form.Label>
                   <Col >
                   <Form.Control type="text" placeholder="Enter Product" value={product.name} onChange={handleChange} name="name" required/>
                   </Col>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Row>
                        <Col sm={10} lg={6}>
                          <Form.Label column >Description</Form.Label>
                          <Form.Control type="text" placeholder="Product Description" value={product.description}onChange={handleChange} name="description" required/>
                        </Col>
                        <Col sm={10} lg={6}>
                          <Form.Label column >State</Form.Label>
                            <Form.Control type="text" placeholder="Enter State" value={product.state} onChange={handleChange} name="state" required/>
                        </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Row>
                        <Col sm={10} lg={6}>
                        <Form.Label column >Quantity</Form.Label>
                            <Form.Control type="text" placeholder="Enter Quantity" value={product.quantity}onChange={handleChange} name="quantity" required/>
                        </Col>
                        <Col sm={10} lg={6}>
                          <Form.Label column >Measurement</Form.Label>
                          <Form.Control type="text" placeholder="Enter Product" value={product.measurement} onChange={handleChange} name="measurement" required/>
                        </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Row>
                        <Col sm={10} lg={6}>
                        <Form.Label column >Storage Conditions</Form.Label>
                        <Form.Control type="text" placeholder="Enter Product" value={product.condition} onChange={handleChange} name="condition" required/>
                        </Col>
                        <Col sm={10} lg={6}>
                          <Form.Label column >Product Entry Date</Form.Label>
                          <Form.Control type="date" value={product.entryDate} onChange={handleChange} name="entryDate" required/>
                        </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Row>
                        <Col sm={10} lg={6}>
                        <Form.Label column >Manufacture Date</Form.Label>
                        <Form.Control type="date" value={product.manufactureDate} onChange={handleChange} name="manufactureDate" required/>
                        </Col>
                        <Col sm={10} lg={6}>
                          <Form.Label column >Expiry Date</Form.Label>
                          <Form.Control type="date" value={product.expiryDate} onChange={handleChange} name="expiryDate" required/>
                        </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Row>
                        <Col sm={10} lg={6}>
                        <Form.Label column>Cost Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter Price" value={product.cost}onChange={handleChange} name="cost" required/>
                        </Col>
                        <Col sm={10} lg={6}>
                          <Form.Label column>Selling Price</Form.Label>
                          <Form.Control type="text" placeholder="Enter Price" value={product.selling} onChange={handleChange} name="selling" required/>
                        </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Row>
                        <Col sm={10} lg={6}>
                        <Form.Label column>Company Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Company Name" value={product.companyName} onChange={handleChange} name="companyName" required/>
                        </Col>
                        <Col sm={10} lg={6}>
                          <Form.Label column>Batch Number</Form.Label>
                          <Form.Control type="text" placeholder="Enter Number" value={product.batch} onChange={handleChange} name="batch" required/>
                        </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Row>
                        <Col sm={10} lg={6}>
                        <Form.Label column>Vendor Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={product.vendorName} onChange={handleChange} name="vendorName" required/>
                        </Col>
                        <Col sm={10} lg={6}>
                          <Form.Label column>Vendor Number</Form.Label>
                          <Form.Control type="text" placeholder="Enter Number" value={product.vendorNo} onChange={handleChange} name="vendorNo" required/>
                        </Col>
                        </Row>
                      </Form.Group>
                      <div className="text-center">
                      <Button style={{backgroundColor:`${color}`}} type="submit">Submit</Button>
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