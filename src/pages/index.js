import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, useStaticQuery } from "gatsby"
import Post from "../components/post"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC}) {
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "MMM Do YYYY")
              author
              path
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
      <div>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <Post
            title={node.frontmatter.title}
            author={node.frontmatter.author}
            path={node.frontmatter.path}
            date={node.frontmatter.date}
            body={node.excerpt}
          />
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage
