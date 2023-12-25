import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Modal, Button, Card, Col } from 'react-bootstrap';
// import ProductCard from './ProductCard';
import '../pages/current.css'
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument } from 'pdf-lib';

function ProductCard({ product }) {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <Card className='card-body' style={{ width: '300px', height: '500px' }} onClick={handleShow}>
        <Card.Img style={{ minHeight: '1px' }} variant="top" src={"#"} />
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
      <Modal.Header closeButton>
        <Modal.Title>{product.name} Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Display other product details here */}
        <p>Description: {product.description}</p>
        <p>Quantity: {product.quantity}</p>
        <p>Expiry Date: {product.expiryDate}</p>
        <p>Cost: Rs.{product.cost}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default Current;
