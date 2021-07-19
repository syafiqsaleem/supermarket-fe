import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getCategories } from './ApiController'

const Shop = () => {
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(false)

  const init = () => {
    getCategories().then((data) => {
      if (error) {
        setError(error)
      } else {
        setCategories(data)
      }
    })
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <Layout
      title="See all Products"
      description="Siong Siong Supermart App"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4"> {JSON.stringify(categories)}</div>
        <div className="col-8">Right Content</div>
      </div>
    </Layout>
  )
}
export default Shop
