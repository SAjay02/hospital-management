import {React, useState, useEffect} from 'react'
import axios from 'axios'
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
const item = []


  
function ProductCard({product}) {
  const cartItem = item.find((item) => item.productId === product.id);
  return (
    <Col sm={6} md={4} lg={3}>
      <Card>
        <Card.Img variant="top"  src={"#"} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>      
          <Card.Text>Description : {product.description}</Card.Text>
          <Card.Text>Quantity : {product.quantity}</Card.Text>
          <Card.Text>Expiry Date : {product.expiryDate}</Card.Text>
          <Card.Text>Rs.{product.cost}</Card.Text>
          {/* <Button
            variant="primary"
            onClick={() => incrementQuantity(product._id)}
          >
            Add to Cart
          </Button>
          <p>Quantity in Cart: {cartItem ? cartItem.quantity : 0}</p> */}
        </Card.Body>
      </Card>
    </Col>
  );
}

const Current = () => {
  
    const [data, setData] = useState([]);
  
    // useEffect(() => {
    //   axios.get('http://localhost:8000/api/data')
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setData(data);
    //     });
    // }, []);

    useEffect(() => {
      // Replace with your API endpoint
      axios.get('http://localhost:8000/api/data')
        .then((response) => {
          setData(response.data);
          // setIsLoading(false);
        })
        .catch((error) => {
          // setError(error);
          // setIsLoading(false);
          console.log(error)
        });
    }, []);

    data.forEach(i=>{
      item.push(i)
    })
    console.log(data)
    return (
      // <div className="App">
      //   {/* {data ? <p>{data}</p> : <p>Loading...</p>} */}
      //   {data.map((key, value)=>{
      //     console.log(value)
      //   })}
      // </div>
      <div className="App">
      <Container>
        <Row>
          {data.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              // incrementQuantity={incrementQuantity}
              // cartItems={cart}
            />
          ))}
        </Row>    
      </Container>
      {/* <div className="cart">
        <h2>Cart</h2>
        {data.map((cartItem) => (
          <div key={cartItem.productId}>
            Product ID: {cartItem.productId}, Quantity: {cartItem.quantity}
          </div>
        ))}
      </div> */}

    </div>
  
    );
  
}

export default Current