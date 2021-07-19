import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./ApiController";
import Card from "./Card";

const Home = () => {
  const [productsBySold, setProductsBySold] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySold = () => {
    getProducts("sold").then((data) => {
      if (error) {
        setError(error);
      } else {
        setProductsBySold(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      console.log(data);
      if (error) {
        setError(error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySold();
  }, []);

  return (
    <Layout
      title="Siong Siong APP"
      description="App"
      className="container-fluid"
    >
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productsByArrival.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>

      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySold.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
