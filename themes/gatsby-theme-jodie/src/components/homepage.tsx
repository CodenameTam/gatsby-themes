/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { PageProps } from "gatsby"
import Img from "gatsby-image"
import Layout from "./layout"
import { ChildImageSharp } from "../types"
import GridItem from "./grid-item"
import { itemListWrapperStyles, itemStyles } from "../styles/item-list"

type DataProps = {
  projects: {
    nodes: {
      slug: string
      title: string
      cover: ChildImageSharp
    }[]
  }
  pages: {
    nodes: {
      slug: string
      title: string
      cover: ChildImageSharp
    }[]
  }
}

const Homepage: React.FC<PageProps<DataProps>> = ({ data: { pages, projects } }) => {
  const items = [...pages.nodes, ...projects.nodes]
  const itemsCount = items.length
  let divisor = 9

  for (let i = 0; i < itemsCount; i++) {
    const quotient = itemsCount % divisor
    const quotient_alt = (itemsCount - 1) % divisor

    if (quotient === 0 || quotient_alt === 0) {
      break
    }

    divisor -= 1
  }

  return (
    <Layout>
      <div className={`item-list-wrapper`} sx={itemListWrapperStyles}>
        <div className={`item-list div${divisor}`}>
          {items.map((item) => (
            <GridItem to={item.slug} className="item" key={item.title} sx={itemStyles}>
              <Img fluid={item.cover.childImageSharp.fluid} />
              <span>{item.title}</span>
            </GridItem>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Homepage
