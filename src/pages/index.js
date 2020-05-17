import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, useStaticQuery } from "gatsby"
import Post from "../components/post"
import PaginationLinks from "../components/paginationLinks"

const IndexPage = () => {
  const postsPerPage = 2
  
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 2
      ) {
        totalCount
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
            fields {
              slug
            }
            excerpt
          }
        }
      }
    }
  `)
  let numberOfPages = Math.ceil(
    data.allMarkdownRemark.totalCount / postsPerPage
  )
  return (
    <Layout pageTitle="gajitt">
      <SEO title="Home" />
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
        <PaginationLinks currentPage={1} numberOfPages={numberOfPages} />
      </div>
    </Layout>
  )
}

export default IndexPage
