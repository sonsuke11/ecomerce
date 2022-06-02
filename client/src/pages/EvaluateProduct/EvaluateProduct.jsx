import React, { useEffect, useState } from "react"
import Layout from "../../components/modlecules/Layout/Layout"
import InfoTabBar from "../../components/modlecules/InfoForm/InfoTabBar"
import useProduct from "../../hooks/useProduct"
import ProductsListOrdered from "../../components/modlecules/EvaluateProduct/ProductsListOrdered"

const EvaluateProduct = () => {
  const [orders, setOrders] = useState()
  const { getProductBought } = useProduct()
  const fetchData = () => {
    getProductBought(
      {},
      (res) => {
        const data = res?.data[0]?.products?.filter(
          (item) => !item?.isEvaluated
        )
        setOrders(data)
      },
      () => {}
    )
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Layout>
      <br />
      <br />
      <div className="grid wide">
        <div className="row">
          <div className="col c-2">
            <InfoTabBar />
          </div>
          <div className="col c-10">
            <ProductsListOrdered data={orders} refeshData={fetchData} />
          </div>
        </div>
      </div>
      <br />
      <br />
    </Layout>
  )
}

export default EvaluateProduct
