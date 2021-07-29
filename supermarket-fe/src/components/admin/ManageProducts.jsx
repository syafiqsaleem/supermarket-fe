import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct } from './AdminApiController'

const ManageProducts = () => {
  const [products, setProducts] = useState([])

  const { user, token } = isAuthenticated()

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setProducts(data)
      }
    })
  }

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        loadProducts()
      }
    })
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <Layout
      title="Manage Products"
      description="Perform CRUD on products"
      className="container-fluid"
    >
      <section className="mt-50 mb-50">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h2 className="text-center">
                    Total {products.length} products
                  </h2>
                </div>

                <div className="card-body">
                  <div className="table-responsive">
                    {products.map((p, i) => (
                      <li
                        key={i}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <strong>{p.name}</strong>
                        <Link to={`/admin/product/update/${p._id}`}>
                          <button className="btn btn-outline-warning mt-2 mb-2 card-btn-1">
                            Update
                          </button>
                        </Link>
                        <button
                          onClick={() => destroy(p._id)}
                          className="btn btn-outline-danger mt-2 mb-2 card-btn-1"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </div>
                </div>

                <br />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ManageProducts
