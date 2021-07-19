import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import { addItem } from "./cartHelpers";

const Card = ({ product }) => {
  const [redirect, setRedirect] = useState(false);

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  return (
    <div className="col-4 mb3">
      <div className="card ">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
          {shouldRedirect(redirect)}
          <ShowImage item={product} url="product" />
          <p>{product.description}</p>
          <p>{product.price}</p>
          <Link to="/">
            <button className="btn btn-outline-primary mt-2 mb-2">
              View Product
            </button>
          </Link>
          <button
            onClick={addToCart}
            className="btn btn-outline-warning mt-2 mb-2"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
