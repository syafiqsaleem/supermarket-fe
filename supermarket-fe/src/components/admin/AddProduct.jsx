import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { createProduct, getCategories } from './AdminApiController'
import './AddProduct.scss'

const AddProduct = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    stocks: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: '',
  })

  const { user, token } = isAuthenticated()
  const {
    name,
    description,
    brand,
    origin,
    price,
    categories,
    category,
    shipping,
    stocks,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values

  // load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        })
      }
    })
  }

  useEffect(() => {
    init()
  }, [])

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    formData.set(name, value)
    setValues({ ...values, [name]: value })
  }

  const clickSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: '', loading: true })

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          brand: '',
          origin: '',

          photo: '',
          price: '',
          stocks: '',
          loading: false,
          createdProduct: data.name,
        })
      }
    })
  }

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <label className="text-muted">Upload product image</label>
      <div className="form-group mb-4">
        <label className="form-label">
          <input
            className="form-control"
            onChange={handleChange('photo')}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange('name')}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="mb-4">
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange('description')}
          className="form-control"
          rows="3"
          value={description}
        />
      </div>
      <div className="mb-4">
        <label className="text-muted">Brand</label>
        <input
          onChange={handleChange('brand')}
          className="form-control"
          value={brand}
        />
      </div>
      <div className="mb-4">
        <label className="text-muted">Origin</label>
        <input
          onChange={handleChange('origin')}
          className="form-control"
          value={origin}
        />
      </div>

      <div className="form-group mb-4">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange('price')}
          type="number"
          className="form-control"
          value={price}
        />
      </div>

      <div className="mb-4">
        <label className="text-muted">Category</label>
        <select onChange={handleChange('category')} className="form-select">
          <option>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="text-muted">Shipping</label>
        <select onChange={handleChange('shipping')} className="form-select">
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="text-muted">Stocks Available</label>
        <input
          onChange={handleChange('stocks')}
          type="number"
          className="form-control"
          value={stocks}
        />
      </div>

      <button className="btn btn-outline-primary">Create Product</button>
    </form>
  )

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  )

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? '' : 'none' }}
    >
      <h2>{`${createdProduct}`} is created!</h2>
    </div>
  )

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    )

  return (
    <Layout
      title="Add a new product"
      description={`Hey ${user.name}, ready to add a new product?`}
    >
      <section class="mt-50 mb-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="card mb4">
                <div className="card-body">
                  {showLoading()}
                  {showSuccess()}
                  {showError()}
                  {newPostForm()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default AddProduct
