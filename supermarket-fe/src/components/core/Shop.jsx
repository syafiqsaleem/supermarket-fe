import React, { useState, useEffect } from 'react'
import { Box, Flex, useColorModeValue, Wrap, Stack } from '@chakra-ui/react'
import Layout from './Layout'
import { getCategories, getFilteredProducts } from './ApiController'
import Card from './Card'
import Checkbox from './Checkbox'
import RadioBox from './RadioBox'
import { prices } from './PriceFilter'

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
      title="See all Products"
      description="Siong Siong Supermart App"
      className="container-fluid"
    >
      <Flex direction={{ base: 'column', md: 'row' }} px={2} py={2} mx="auto">
        <Box
          w={{ base: 'full', md: 11 / 12, xl: 9 / 12 }}
          mx="auto"
          pr={{ md: 20 }}
        >
          <h4>Filter by categories</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, 'category')}
            />
          </ul>

          <h4>Filter by price range</h4>

          <RadioBox
            prices={prices}
            handleFilters={(filters) => handleFilters(filters, 'price')}
          />
        </Box>
        <Box maxW="7xl" py="20" mx="auto">
          <Box
            rounded={['none', 'lg']}
            shadow={['none', 'md']}
            bg={useColorModeValue('white', 'gray.800')}
          >
            <Flex
              direction="column"
              justify="space-between"
              p="6"
              borderBottomWidth="1px"
              borderColor={useColorModeValue('gray.200', 'gray.600')}
            >
              <h2>Products</h2>

              <Stack
                display={{ md: 'grid' }}
                gridTemplateColumns={{ md: 'repeat(3,1fr)' }}
              >
                {filteredResults.map((product, i) => (
                  <Card key={i} product={product} />
                ))}
              </Stack>

              <hr />
              <hr />
            </Flex>
          </Box>

          {loadMoreButton()}
        </Box>
      </Flex>
    </Layout>
  )
}

export default Shop
