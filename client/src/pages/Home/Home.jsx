import React, { useEffect, useState } from "react"
import FeatureProducts from "../../components/modlecules/Home/FeatureProducts"
import Slider from "../../components/modlecules/Home/Slider"
import Layout from "../../components/modlecules/Layout/Layout"
import useProduct from "../../hooks/useProduct"

const Home = () => {
  const { getTopSellProduct } = useProduct()
  const [featureProducts, setFeatureProducts] = useState()
  useEffect(() => {
    getTopSellProduct(
      (res) => {
        setFeatureProducts(res?.data)
      },
      (error) => {}
    )
  }, [])

  return (
    <Layout>
      <br />
      <br />
      <div className="grid wide">
        <div className="row">
          <Slider />
          <FeatureProducts data={featureProducts} />
        </div>
      </div>
      <br />
      <br />
    </Layout>
  )
}

export default Home
