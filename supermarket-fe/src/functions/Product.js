import axios from 'axios'

export const getProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/`)
