import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import Card from './Card'

const Shop = () => {
  return (
    <Layout
      title="See all Products"
      description="Siong Siong Supermart App"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4"> Left sidebar</div>
        <div className="col-8">Right Content</div>
      </div>
    </Layout>
  )
}
