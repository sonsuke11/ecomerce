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

  useEffect(() => {
    fetchOrder()
  }, [])

  const handleChangePage = (page) => {
    fetchOrder({ ...paramSearch, page })
  }
  return (
    <AdminLayout>
      <div className="title__block">
        <h4>Danh sách đơn hàng</h4>
        {/* <p>Wellcome to Create Product Page </p> */}
      </div>
      <br />
      <br />
      <OrderTable
        data={dataOrder}
        onChangePage={handleChangePage}
        fetchOrder={fetchOrder}
      />
    </AdminLayout>
  )
}

export default OrderList
