
import React from 'react'
import { Link } from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'

const Card = ({ product, showViewProductButton = true }) => {
  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">
            View Product
          </button>
        </Link>
      )
    )
  }

  const showStock = (stocks) => {
    return stocks > 0 ? (
      <span className="black-8">In Stock </span>
    ) : (
      <span className="black-8">Out of Stock </span>
    )
  }
  return (
    <div className="col-4 mb3">
      <div className="card ">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
          {shouldRedirect(redirect)}
          <ShowImage item={product} url="product" />
          <p className="lead mt-2">{product.description.substring(0, 100)}</p>
          <p className="black-9">{product.price}</p>
          <p className="black-9">
            Category: {product.category && product.category.name}
          </p>
          <p className="black-8">
            Added on {moment(product.createdAt).fromNow()}
          </p>
          {showStock(product.stocks)}

          {showViewButton(showViewProductButton)}
          <button className="btn btn-outline-warning mt-2 mb-2">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
