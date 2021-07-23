import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ShowImage from './ShowImage'
import { addItem, updateItem, removeItem } from './cartHelpers'
import moment from 'moment'
import './Card.scss'
const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false)
  const [count, setCount] = useState(product.count)

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
  const addToCart = () => {
    addItem(product, setRedirect(true))
  }

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2 card-btn-1  "
        >
          Add to cart
        </button>
      )
    )
  }

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id)
            setRun(!run) // so can use useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
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

  const handleChange = (productId) => (event) => {
    setCount(event.target.value < 1 ? 1 : event.target.value)
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value)
    }
  }

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    )
  }

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />
    }
  }

  return (
    <div className="col-lg-3 col-md-4 col-12 col-sm-6">
      <div className="product-cart-wrap mb-30">
        <div className="product-img-action-wrap">
          <div className="product-img product-img-zoom">
            <ShowImage item={product} url="product" />
          </div>

          <div className="product-badges product-badges-position product-badges-mrg">
            <span className="hot">Hot</span>
          </div>
        </div>
        <div className="product-content-wrap">
          <div className="product-category">
            <a href="shop-grid-right.html">Clothing</a>
          </div>
          <h2>
            <a href="shop-product-right.html">{product.name}</a>
          </h2>
          <div className="rating-result" title="90%">
            <span>
              <span>90%</span>
            </span>
          </div>
          <div className="product-price">
            <span>$238.85 </span>
            <span className="old-price">$245.8</span>
          </div>
          <div className="product-action-1 show">
            {showAddToCartBtn(showAddToCartButton)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
