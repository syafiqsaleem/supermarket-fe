import {
  Avatar,
  Box,
  Collapse,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { FaBell } from 'react-icons/fa'
import { FiMenu, FiSearch } from 'react-icons/fi'
import React, { useState, useEffect } from 'react'
import { getCategories, getFilteredProducts } from './ApiController'
import Card from './Card'
import Checkbox from './Checkbox'
import RadioBox from './RadioBox'
import { prices } from './PriceFilter'

const Shop = (props) => {
  const { icon, children, ...rest } = props
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
    <Flex
      align="center"
      px="4"
      pl="4"
      py="3"
      cursor="pointer"
      color={useColorModeValue('inherit', 'gray.400')}
      _hover={{
        bg: useColorModeValue('gray.100', 'gray.900'),
        color: useColorModeValue('gray.900', 'gray.200'),
      }}
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      {...rest}
    >
      {icon && (
        <Icon
          mr="2"
          boxSize="4"
          _groupHover={{
            color: useColorModeValue('gray.600', 'gray.300'),
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  )
}

const SidebarContent = (props) => (
  <Box
    as="nav"
    pos="fixed"
    top="0"
    left="0"
    zIndex="sticky"
    h="full"
    pb="10"
    overflowX="hidden"
    overflowY="auto"
    bg={useColorModeValue('white', 'gray.800')}
    borderColor={useColorModeValue('inherit', 'gray.700')}
    borderRightWidth="1px"
    w="60"
    {...props}
  >
    <Flex px="4" py="5" align="center">
      <Text
        fontSize="2xl"
        ml="2"
        color={useColorModeValue('brand.500', 'white')}
        fontWeight="semibold"
      >
        Choc UI
      </Text>
    </Flex>
    <Flex
      direction="column"
      as="nav"
      fontSize="sm"
      color="gray.600"
      aria-label="Main Navigation"
    >
      <h4>Filter by categories</h4>
      <ul>
        <Checkbox
          categories={categories}
          handleFilters={(filters) => handleFilters(filters, 'category')}
        />
      </ul>

      <h4>Filter by price range</h4>
      <div>
        <RadioBox
          prices={prices}
          handleFilters={(filters) => handleFilters(filters, 'price')}
        />
      </div>
    </Flex>
  </Box>
)
return (
  <Box as="section" bg={useColorModeValue('gray.50', 'gray.700')} minH="100vh">
    <SidebarContent display={{ base: 'none', md: 'unset' }} />
    <Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left">
      <DrawerOverlay />
      <DrawerContent>
        <SidebarContent w="full" borderRight="none" />
      </DrawerContent>
    </Drawer>
    <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
      <Flex
        as="header"
        align="center"
        justify="space-between"
        w="full"
        px="4"
        bg={useColorModeValue('white', 'gray.800')}
        borderBottomWidth="1px"
        borderColor={useColorModeValue('inherit', 'gray.700')}
        h="14"
      >
        <IconButton
          aria-label="Menu"
          display={{ base: 'inline-flex', md: 'none' }}
          onClick={sidebar.onOpen}
          icon={<FiMenu />}
          size="sm"
        />
        <InputGroup w="96" display={{ base: 'none', md: 'flex' }}>
          <InputLeftElement color="gray.500" children={<FiSearch />} />
          <Input placeholder="Search for articles..." />
        </InputGroup>

        <Flex align="center">
          <Icon color="gray.500" as={FaBell} cursor="pointer" />
          <Avatar
            ml="4"
            size="sm"
            name="anubra266"
            src="https://avatars.githubusercontent.com/u/30869823?v=4"
            cursor="pointer"
          />
        </Flex>
      </Flex>

      <Box as="main" p="4">
        <h2>Products</h2>
        <Box mt={6}>
          <SimpleGrid
            minChildWidth="300px"
            align="center"
            justify="center"
            spacing="10px"
            mb={32}
          >
            {filteredResults.map((product, i) => (
              <Card key={i} product={product} />
            ))}
          </SimpleGrid>
        </Box>
        <Box borderWidth="4px" borderStyle="dashed" rounded="md" h="96" />
      </Box>
    </Box>
  </Box>
)
export default Shop
