import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Modal, Button, Card, Col } from 'react-bootstrap';
// import ProductCard from './ProductCard';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument } from 'pdf-lib';
import '../pages/BillingForm.css'
import MIMG1 from '../assests/calpol.png'
import MIMG2 from '../assests/paracetamol.jpg'
import MIMG3 from '../assests/citrizine.png'
import { MdOutlineDescription } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BsCalendar2DateFill } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
function ProductCard({ product }) {


  const imageDetails = [
    {
      batch : 1,
      url : MIMG1
    },
    {
      batch : 2,
      url : MIMG3
    },
    {
      batch : 3,
      url : MIMG2
    }

]
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const selectedImage = imageDetails.find((img) => img.batch == product.batch)?.url;

  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <Card className='card-body' style={{ width: '300px', height: '350px' }} onClick={handleShow}>
        {console.log(product.batch)}
        <Card.Img style={{ minHeight: '1px' }} 
                  variant="top" 
                  src={selectedImage}
        />
        <Card.Body>
          <Card.Title>{product?.name}</Card.Title>
        </Card.Body>
      </Card>

      <ProductDetailsModal
        show={showModal}
        onHide={handleClose}
        product={product}
      />
    </Col>
  );
}

const Current = () => {
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/data')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="App">
      <Container>
        <Row>
          {data.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleCardClick(product)}
            />
          ))}
        </Row>
      </Container>

      {selectedProduct && (
        <ProductDetailsModal
          show={true}
          onHide={handleModalClose}
          product={selectedProduct}
        />
      )}
    </div>
  );
}

function ProductDetailsModal({ show, onHide, product }) {
  return (
    <Modal show={show} onHide={onHide}>
      <div className='modal-body'>
      <Modal.Header closeButton>
        <Modal.Title style={{fontStyle:'italic'}}>{(product.name).toUpperCase()} Details</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        {/* Display other product details here */}
        <p><span><MdOutlineDescription size={30}/>:  &nbsp;</span> {product.description}</p>
        <p><span><MdOutlineProductionQuantityLimits size={30} /> :  &nbsp;</span>{product.quantity}</p>
        <p><span>EXPIRY <BsCalendar2DateFill size={30} /> :  &nbsp;</span>{product.expiryDate}</p>
        <p><span><GiMoneyStack size={30}/> : Rs.</span>{product.cost}</p>
      </Modal.Body>
      <Modal.Footer   >
        <button className='billing-btn'variant="secondary" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
      </div>
    </Modal>
    


  );
}
export default Current;
export {ProductCard}
