import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, useStaticQuery } from "gatsby"
import Post from "../components/post"
import { Row, Col } from "reactstrap"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "MMM Do YYYY")
              author
              path
              image {
                childImageSharp {
                  fluid(maxWidth: 600) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            excerpt
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Home page</h1>
      <Row>
        <Col md="8">
          <div>
            {data.allMarkdownRemark.edges.map(({ node }) => (
              <Post
                title={node.frontmatter.title}
                author={node.frontmatter.author}
                path={node.frontmatter.path}
                date={node.frontmatter.date}
                body={node.excerpt}
                fluid={node.frontmatter.image.childImageSharp.fluid}
              />
            ))}
          </div>
        </Col>
        <Col md="4">
          <div style={{width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.4)"}}></div>
        </Col>
      </Row>
    </Layout>
  )
}

export default IndexPage
