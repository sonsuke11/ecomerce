import moment from "moment"
import React, { useEffect, useState } from "react"
import AdminLayout from "../../../components/modlecules/Admin/AdminLayout"
import FilterByDate from "../../../components/modlecules/Admin/FilterByDate"
import RevenueBlock from "../../../components/modlecules/Admin/RevenueBlock"
import TopProduct from "../../../components/modlecules/Admin/TopProduct"
import useOrder from "../../../hooks/useOrder"

const Dashboard = () => {
  const defaultSearch = {
    startDate: moment().subtract(3, "days").format("yyyy-MM-DD"),
  }
  const { searchAllOrder } = useOrder()

  const [paramsSearch, setParamsSearch] = useState(defaultSearch)
  const [dataOrder, setDataOrder] = useState()

  const calcTotalSold = () => {
    const calcOneOrder = (products) => {
      return products?.reduce((prev, curr) => prev + curr?.quantity, 0)
    }
    return dataOrder?.list?.reduce(
      (prev, curr) => prev + calcOneOrder(curr?.products),
      0
    )
  }
  const calcTotalRevenue = () => {
    return dataOrder?.list?.reduce(
      (prev, curr) => prev + Number(curr?.totalPrice),
      0
    )
  }

  const calcTotalRootPrice = () => {
    const calcOneOrder = (products) => {
      return products?.reduce(
        (prev, curr) => prev + curr?.productId?.rootPrice * curr?.quantity,
        0
      )
    }
    return dataOrder?.list?.reduce(
      (prev, curr) => prev + calcOneOrder(curr?.products),
      0
    )
  }
  const handleSearch = (params) => {
    const search = { ...paramsSearch, ...params }

    searchAllOrder(
      search,
      (res) => {
        setParamsSearch(search)
        setDataOrder(res?.data)
      },
      () => {
        // do nothing
      }
    )
  }

  const handleClickSearch = () => {
    handleSearch()
  }

  const getTopOrder = () => {}

  useEffect(() => {
    handleSearch()
    getTopOrder()
  }, [])

  return (
    <AdminLayout>
      <FilterByDate
        params={paramsSearch}
        setParams={setParamsSearch}
        onClickSearch={handleClickSearch}
      />
      <br />
      <RevenueBlock
        totalSold={calcTotalSold()}
        totalRevenue={calcTotalRevenue()}
        totalRootPrice={calcTotalRootPrice()}
      />
      <TopProduct />
    </AdminLayout>
  )
}

export default Dashboard
