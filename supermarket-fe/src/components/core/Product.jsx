import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { read } from './ApiController'
import Card from './Card'

const Product = (props) => {
  const [product, setProduct] = useState({})
  const [error, setError] = useState(false)

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setProduct(data)
        // fetch related products
      }
    })
  }

  useEffect(() => {
    const productId = props.match.params.productId
    loadSingleProduct(productId)
  }, [props])

  return (
    <Layout
      title="Welcome to Siong Siong"
      description="Siong Siong Supermart App"
      className="container-fluid"
    >
      <h2 className="mb-4">Single Product</h2>
      <div className="row">{JSON.stringify(product)}</div>
    </Layout>
  )
}

export default Product
