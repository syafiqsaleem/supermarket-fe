import React from 'react'
import Menu from './Menu'
import './header.scss'

const Layout = ({
  title = 'Title',
  description = 'Description',
  className,
  children,
}) => (
  <div>
    <Menu />
    <div className="header-area header-style-1 header-height-2">
      <div className="container">
        <div className="header-wrap.header-space-between">
          <div className="header-middle header-middle-ptb-1 d-none d-lg-block"></div>
          <h2 className="dashboardtitle">{title}</h2>
          <p className="dashboardsubtitle d-none d-lg-block">{description}</p>
        </div>
      </div>
    </div>
    <div className={className}>{children}</div>
  </div>
)

export default Layout
