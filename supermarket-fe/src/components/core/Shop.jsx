import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getCategories } from './ApiController'
import Checkbox from './Checkbox'

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  })
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

  const handleFilters = (filters, filterBy) => {
    // console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters }
    newFilters.filters[filterBy] = filters
    setMyFilters(newFilters)
  }

  return (
    <Layout
      title="See all Products"
      description="Siong Siong Supermart App"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, 'category')}
            />
          </ul>
        </div>
        <div className="col-8">{JSON.stringify(myFilters)}</div>
      </div>
    </Layout>
  )
}

export default Shop
