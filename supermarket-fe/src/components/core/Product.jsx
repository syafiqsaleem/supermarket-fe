import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { read } from './ApiController'
import Card from './Card'

const Product = (props) => {
  const [product, setProduct] = useState({})
  const [error, setError] = useState(false)

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (error) {
        setError(error)
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
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        {product && product.description && (
          <Card product={product} showViewProductButton={false} />
        )}
      </div>
    </Layout>
  )
}

export default Product
