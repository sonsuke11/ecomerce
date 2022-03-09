import React from "react"

import CartProduct from "../../components/modlecules/CartProduct/CartProduct"
import Layout from "../../components/modlecules/Layout/Layout"
import "./product.scss"

const Products = () => {
  const products = [
    {
      name: "accent chair",
      quantity: 12,
      imageUrl:
        "https://images.unsplash.com/photo-1646830663355-0e38627e2106?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      description: "loremp",
    },
    {
      name: "albany sectional",
      quantity: 109,
      imageUrl:
        "https://images.unsplash.com/photo-1646830663355-0e38627e2106?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      description: "lorempdsvdva",
    },
    {
      name: "albanyđâfdsa sectional",
      quantity: 1022,
      imageUrl:
        "https://images.unsplash.com/photo-1646830663355-0e38627e2106?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      description: "lorempdsvdva  vadfsafa",
    },
    {
      name: "albany sectional",
      quantity: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1646830663355-0e38627e2106?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      description: "lorempdsvdva",
    },
    {
      name: "albany sectional",
      quantity: 106,
      imageUrl:
        "https://images.unsplash.com/photo-1646830663355-0e38627e2106?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      description: "lorempdsvdva",
    },
    {
      name: "jkfdnskfnda sectional",
      quantity: 111,
      imageUrl:
        "https://images.unsplash.com/photo-1646830663355-0e38627e2106?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      description: "lorempdsvdva",
    },
    {
      name: "12213 sectional",
      quantity: 13,
      imageUrl:
        "https://images.unsplash.com/photo-1646830663355-0e38627e2106?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      description: "lorempdsvdva",
    },
    {
      name: "phone 12",
      quantity: 10,
      imageUrl:
        "https://images.unsplash.com/photo-1646830663355-0e38627e2106?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      description: "lorempdsvdva adsfs adsaf",
    },
  ]

  return (
    <Layout>
      <div className="container__product">
        <div className="row">
          {products.map((product) => (
            <CartProduct product={product} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Products
