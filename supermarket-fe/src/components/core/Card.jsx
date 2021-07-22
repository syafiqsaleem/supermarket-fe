import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { chakra, Box, Image, Flex, useColorModeValue } from '@chakra-ui/react'
import ShowImage from './ShowImage'
import { addItem, updateItem, removeItem } from './cartHelpers'
import moment from 'moment'
import { API } from '../../config'

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
    <Flex
      bg={useColorModeValue('#F9FAFB', 'gray.600')}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        maxW="sm"
        mx="auto"
        bg={useColorModeValue('white', 'gray.800')}
        shadow="lg"
        rounded="lg"
        position="relative"
      >
        <Box px={4} py={2}>
          <chakra.h1
            color={useColorModeValue('gray.800', 'white')}
            fontWeight="bold"
            fontSize="3xl"
            textTransform="uppercase"
          >
            {product.name}
          </chakra.h1>
          <chakra.p
            mt={1}
            fontSize="sm"
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            {product.description.substring(0, 100)}
          </chakra.p>
        </Box>

        <ShowImage item={product} url="product" />

        <Flex
          alignItems="center"
          justifyContent="space-between"
          px={4}
          py={2}
          bg="gray.900"
          roundedBottom="lg"
        >
          <chakra.h1 color="white" fontWeight="bold" fontSize="lg">
            ${product.price}
          </chakra.h1>
          <chakra.button
            px={2}
            py={1}
            bg="white"
            fontSize="xs"
            color="gray.900"
            fontWeight="bold"
            rounded="lg"
            textTransform="uppercase"
            _hover={{
              bg: 'gray.200',
            }}
            _focus={{
              bg: 'gray.400',
            }}
          >
            Add to cart
          </chakra.button>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Card
