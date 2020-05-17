import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, useStaticQuery } from "gatsby"
import Post from "../components/post"
import { Row, Col } from "reactstrap"
import Sidebar from "../components/sidebar"

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
              tags
              image {
                childImageSharp {
                  fluid(maxWidth: 600) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            fields{
              slug
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
                key={node.id}
                title={node.frontmatter.title}
                author={node.frontmatter.author}
                slug={node.fields.slug}
                date={node.frontmatter.date}
                body={node.excerpt}
                fluid={node.frontmatter.image.childImageSharp.fluid}
                tags={node.frontmatter.tags}
              />
            ))}
          </div>
        </Col>
        <Col md="4">
          <Sidebar />
        </Col>
      </Row>
    </Layout>
  )
}

export default IndexPage
