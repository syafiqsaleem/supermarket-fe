import React, { useState, useEffect } from 'react'
import Layout from './Layout'

const Product = (props) => {
  const [product, setProduct] = useState({})
  const [error, setError] = useState(false)

  const loadSingleProduct = (productId) => {
    read().then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setProduct(data)
      }
    })
  }

  return (
    <Layout
      title="See all Products"
      description="Siong Siong Supermart App"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4"> Left sidebar</div>
        <div className="col-8">Right Content</div>
      </div>
    </Layout>
  )
}

export default Product
