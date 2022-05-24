import _ from "lodash"
import React, { useEffect, useState } from "react"
import AdminLayout from "../../../components/modlecules/Admin/AdminLayout"
import OrderTable from "../../../components/modlecules/Admin/OrderTable"
import useOrder from "../../../hooks/useOrder"

const OrderList = () => {
  const { searchOrder } = useOrder()
  const [dataOrder, setDataOrder] = useState()
  const [paramSearch, setParamSearch] = useState()
  const fetchOrder = (params) => {
    let search = { ...paramSearch }
    if (!_.isEmpty(params)) {
      search = { ...search, ...params }
    }
    searchOrder(
      search,
      (res) => {
        setDataOrder(res?.data)
        setParamSearch(search)
      },
      () => {}
    )
  }
  console.log("dataOrder", dataOrder)
  useEffect(() => {
    fetchOrder()
  }, [])

  const handleChangePage = (page) => {
    fetchOrder({ ...paramSearch, page })
  }
  return (
    <AdminLayout>
      <OrderTable data={dataOrder} onChangePage={handleChangePage} />
    </AdminLayout>
  )
}

export default OrderList
