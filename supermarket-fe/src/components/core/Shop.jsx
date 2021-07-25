import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getCategories, getFilteredProducts } from './ApiController'
import Card from './Card'
import Checkbox from './Checkbox'
import RadioBox from './RadioBox'
import { prices } from './PriceFilter'
import './Shop.scss'

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  })
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(false)
  const [limit, setLimit] = useState(6)
  const [skip, setSkip] = useState(0)
  const [size, setSize] = useState(0)
  const [filteredResults, setFilteredResults] = useState([])

  const init = () => {
    getCategories().then((data) => {
      if (error) {
        setError(error)
      } else {
        setCategories(data)
      }
    })
  }

  const loadFilteredResults = (newFilters) => {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setFilteredResults(data.data)
        setSize(data.size)
        setSkip(0)
      }
    })
  }

  const loadMore = () => {
    let toSkip = skip + limit

    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setFilteredResults([...filteredResults, ...data.data])
        setSize(data.size)
        setSkip(toSkip)
      }
    })
  }

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    )
  }

  useEffect(() => {
    init()
    loadFilteredResults(skip, limit, myFilters.filters)
  }, [])

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters }
    newFilters.filters[filterBy] = filters

    if (filterBy === 'price') {
      let priceValues = handlePrice(filters)
      newFilters.filters[filterBy] = priceValues
    }
    loadFilteredResults(myFilters.filters)
    setMyFilters(newFilters)
  }

  const handlePrice = (value) => {
    const data = prices
    let array = []

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array
      }
    }
    return array
  }

  return (
    <Layout
      title="Shop Categories"
      description="As one of the cheapest supermarkets in Singapore, we always know what is a good bargain. We offer live, fresh and chilled produce, such as seafood, meat and vegetables. There is also packaged foods, general merchandise, and essential household products."
      className="container-fluid"
    >
      <div className="row">
        <div class="col-lg-3">
          <div class="widget-category mb-30">
            <h5 class="section-title style-1 mb-30 wow fadeIn animated">
              Filter by categories
            </h5>
            <ul class="categories">
              <Checkbox
                categories={categories}
                handleFilters={(filters) => handleFilters(filters, 'category')}
              />
            </ul>
          </div>
          <div class="widget-category mb-30">
            <h5 class="section-title style-1 mb-30 wow fadeIn animated">
              Filter by price range
            </h5>
            <ul class="categories">
              <RadioBox
                prices={prices}
                handleFilters={(filters) => handleFilters(filters, 'price')}
              />
            </ul>
          </div>
        </div>

        <div className="col-lg-9">
          <h2>Products</h2>

          <div className="row">
            {filteredResults.map((product, i) => (
              <Card key={i} product={product} />
            ))}
          </div>
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  )
}

export default Shop
