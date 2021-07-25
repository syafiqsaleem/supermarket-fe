import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link, Redirect } from 'react-router-dom'
import { read, update, updateUser } from './ApiUser'

// We need 2 methods, 1) Read the user information from the backend, 2)Update the user information
// props: To grab the user Id from the url
// props.match: but we want to destructure match so we just put match
const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: false,
    success: false,
  })

  // Destructure token
  const { token } = isAuthenticated()

  // so that we dont have to write values.name -> Destructuring
  const { name, email, password, error, success } = values

  // load user information
  const init = (userId) => {
    // console.log(userId);
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true })
      } else {
        // we can populate the actual user information in the state
        // that way this information can be used in the update form
        // we will pre-populate with the existing user information
        // changes can be made then press the submit button
        setValues({ ...values, name: data.name, email: data.email })
      }
    })
  }

  // To get the user information from the backend, we need the user ID, cause we need to know which user ID to fetch
  useEffect(() => {
    init(match.params.userId)
  }, [])

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value })
  }

  const clickSubmit = (e) => {
    e.preventDefault()
    // first param: match.params.userID
    // second param: token
    // thrid param : {name, email, password} --> user data(object)
    update(match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          console.log(data.error)
          //       alert(data.error);
        } else {
          //       // set information in localStorage
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            })
          })
        }
      }
    )
  }

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/cart" />
    }
  }

  const profileUpdate = (name, email, password) => (
    <form>
      <div className="form-group mt-4">
        <label className="text-muted">Name</label>
        <input
          type="text"
          onChange={handleChange('name')}
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group mt-4">
        <label className="text-muted">Email</label>
        <input
          type="email"
          onChange={handleChange('email')}
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group mt-4">
        <label className="text-muted">Password</label>
        <input
          type="password"
          onChange={handleChange('password')}
          className="form-control"
          value={password}
        />
      </div>

      <button onClick={clickSubmit} className="btn btn-primary mt-3">
        Submit
      </button>
    </form>
  )

  return (
    <Layout
      title="Profile"
      description="Update your profile"
      className="container-fluid"
    >
      <section class="mt-50 mb-50">
        <div className="container">
          <h2 className="mb-4">Profile Update</h2>
          {profileUpdate(name, email, password)}
          {redirectUser(success)}
        </div>
      </section>
    </Layout>
  )
}

export default Profile
