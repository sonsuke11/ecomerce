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
      price: 20000,
      sold: 120000,
      rank: 4,
    },
    {
      name: "albany sectional",
      quantity: 109,
      imageUrl:
        "https://images.unsplash.com/photo-1646830663355-0e38627e2106?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      description: "lorempdsvdva",
      price: 20000,
      sold: 120000,
      rank: 0,
    },
    {
      name: "albanyđâfdsa sectional",
      quantity: 1022,
      imageUrl:
        "https://images.unsplash.com/photo-1646830663355-0e38627e2106?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      description: "lorempdsvdva  vadfsafa",
      price: 20000,
      sold: 120000,
      rank: 0,
    },
    {
      name: "albany sectional",
      quantity: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1646830663355-0e38627e2106?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      description: "lorempdsvdva",
      price: 20000,
      sold: 120000,
      rank: 0,
    },
    {
      name: "albany sectional",
      quantity: 106,
      imageUrl:
        "https://images.unsplash.com/photo-1646830663355-0e38627e2106?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      description: "lorempdsvdva",
      price: 20000,
      sold: 120000,
      rank: 0,
    },
    {
      name: "jkfdnskfnda sectional",
      quantity: 111,
      imageUrl:
        "https://images.unsplash.com/photo-1646830663355-0e38627e2106?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      description: "lorempdsvdva",
      price: 20000,
      sold: 120000,
      rank: 3,
    },
    {
      name: "12213 sectional",
      quantity: 13,
      imageUrl:
        "https://images.unsplash.com/photo-1646830663355-0e38627e2106?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      description: "lorempdsvdva",
      price: 20000,
      sold: 120000,
      rank: 5,
    },
    {
      name: "phone 12",
      quantity: 10,
      imageUrl:
        "https://images.unsplash.com/photo-1646830663355-0e38627e2106?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      description: "lorempdsvdva adsfs adsaf",
      price: 20000,
      sold: 120000,
      rank: 2,
    },
  ]

  return (
    <Layout>
      <div className="grid wide">
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
