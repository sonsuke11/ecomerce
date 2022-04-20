import React, { useEffect, useState } from "react"
import Layout from "../../components/modlecules/Layout/Layout"
import InfoOrderForm from "../../components/modlecules/Order/InfoOrderForm"
import usePlaceSearch from "../../hooks/usePlaceSearch"
const OrderPage = () => {
  const { searchAllCity } = usePlaceSearch()
  const [dataOrder, setDataOrder] = useState({})
  const [cites, setCities] = useState([])
  useEffect(() => {
    searchAllCity(
      (res) => {
        const options = res?.data?.map((item) => ({
          label: item.name,
          value: item.code,
        }))
        setCities(options)
      },
      () => {}
    )
  }, [])
  return (
    <Layout>
      <div className="grid wide">
        <div className="row">
          <InfoOrderForm
            dataOrder={dataOrder}
            setDataOrder={setDataOrder}
            cites={cites}
          />
        </div>
      </div>
    </Layout>
  )
}

export default OrderPage
