import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import "../styles/index.scss"
import { Row, Col } from "reactstrap"
import Sidebar from "./sidebar"

const Layout = ({ authorImageFluid, children, pageTitle, postAuthor }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <link
        rel="stylesheet"
        href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
        crossOrigin="anonymous"
      />
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className="container" id="content">
        <h1>{pageTitle}</h1>
        <Row>
          <Col md="8">{children}</Col>
          <Col md="4">
            <Sidebar author={postAuthor} authorFluid={authorImageFluid} />
          </Col>
        </Row>
        <Footer />
        {/* <footer>
          © {new Date().getFullYear()} {data.site.siteMetadata.title}
        </footer> */}
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
