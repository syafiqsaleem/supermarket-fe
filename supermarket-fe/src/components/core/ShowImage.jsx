import { API } from '../../config'
import React from 'react'
import { Box, Center, Image } from '@chakra-ui/react'

const ShowImage = ({ item, url }) => (
  <Center py={6}>
    <Box h={'210px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
      <Image
        boxSize="250px"
        fit="cover"
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
      />
    </Box>
  </Center>
)

export default ShowImage
