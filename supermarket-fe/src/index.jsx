import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './Routes'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    50: '#ecefff',
    100: '#cbceeb',
    200: '#a9aed6',
    300: '#888ec5',
    400: '#666db3',
    500: '#4d5499',
    600: '#3c4178',
    700: '#2a2f57',
    800: '#181c37',
    900: '#080819',
  },
}

const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

const theme = extendTheme({ colors, config })

const rootElement = document.getElementById('root')
ReactDOM.render(
  <ChakraProvider theme={theme}>
    <Routes />
  </ChakraProvider>,
  rootElement
)

// ReactDOM.render(
//   <React.StrictMode>
//     <Routes />
//   </React.StrictMode>
// )
// document.getElementById('root')

// function App({ Component }) {
//   // 2. Use at the root of your app
//   return (
//     <ChakraProvider>
//       <Routes />
//       <Component />
//     </ChakraProvider>
//   )
// }
