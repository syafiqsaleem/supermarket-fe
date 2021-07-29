import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from './Layout'
import { getCart } from './cartHelpers'
import Card from './Card'
import CardInCheckout from './CardInCheckout'
import Checkout from './Checkout'

const Cart = () => {
  const [items, setItems] = useState([])
  const [run, setRun] = useState(false)

  useEffect(() => {
    setItems(getCart())
  }, [run])

  const showItems = (items) => {
    return (
      <div>
        <h2 className="mb-5">Your cart has {`${items.length}`} items</h2>

        {items.map((product, i) => (
          <CardInCheckout
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    )
  }

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
    </h2>
  )

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add remove checkout or continue shopping."
      className="container-fluid"
    >
      <section class="mt-50 mb-50">
        <div className="container">
          <div className="row">
            <div className="col-6">
              {items.length > 0 ? showItems(items) : noItemsMessage()}
            </div>

            <div className="col-6">
              <h2 className="mb-5">Your cart summary</h2>
              <Checkout products={items} setRun={setRun} run={run} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Cart
