import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getProducts } from './ApiController'
import Card from './Card'

const Home = () => {
  const [productsBySold, setProductsBySold] = useState([])
  const [productsByArrival, setProductsByArrival] = useState([])
  const [error, setError] = useState(false)

  const loadProductsBySold = () => {
    getProducts('sold').then((data) => {
      if (error) {
        setError(error)
      } else {
        setProductsBySold(data)
      }
    })
  }

  const loadProductsByArrival = () => {
    getProducts('createdAt').then((data) => {
      console.log(data)
      if (error) {
        setError(error)
      } else {
        setProductsByArrival(data)
      }
    })
  }

  useEffect(() => {
    loadProductsByArrival()
    loadProductsBySold()
  }, [])

  return (
    <Layout
      title="Welcome to Siong Siong Supermart!"
      description="As one of the cheapest supermarkets in Singapore, we always know what is a good bargain. We offer live, fresh and chilled produce, such as seafood, meat and vegetables. There is also packaged foods, general merchandise, and essential household products."
      className="container-fluid"
    >
      <div className="container">
        <div className="col-lg-12">
          <div className="row">
            <h2 className="mb-4">New Arrivals</h2>

            {productsByArrival.map((product, i) => (
              <Card key={i} product={product} />
            ))}
          </div>
        </div>
      </div>

      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySold.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>
    </Layout>
  )
}

export default Home
