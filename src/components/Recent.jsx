import { React, useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "./Current";
import { Container, Row } from "react-bootstrap";
const Recent = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from the database
    axios
      .get("http://localhost:8000/api/data")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const currentDate = new Date();
  const recentProducts = products.filter((product) => {
    const entryDate = new Date(product.entryDate);

    const monthsDifference =
      (currentDate.getFullYear() - entryDate.getFullYear()) * 12 +
      currentDate.getMonth() -
      entryDate.getMonth();

    return monthsDifference < 2;
  });

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };
  return (
    <div className="App">
      <Container>
      {loading ? (
        <>
          <p style={{textAlign:'center', fontSize:'35px', fontStyle:'italic',fontWeight:'bolder'}}>No recent products available........</p>
          <h3 style={{textAlign:'center', fontSize:'35px', marginTop:'30px'}}>Please Check Current Available products  &nbsp;:)</h3><br /><br />
          </>
        ) : recentProducts.length === 0 ? (
          <p></p>
        ) : (
          <Row>
            {recentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleCardClick(product)}
              />
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Recent;
