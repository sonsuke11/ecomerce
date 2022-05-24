import React, { useEffect, useState, useCallback, useContext } from "react"
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom"
import styled from "styled-components"
import { ToastContext } from "../../App"
import InfoTabBar from "../../components/modlecules/InfoForm/InfoTabBar"
import Layout from "../../components/modlecules/Layout/Layout"
import OrderHistoryList from "../../components/modlecules/MyOrder/OrderHistoryList"
import TabLink from "../../components/modlecules/MyOrder/TabLink"
import useOrder from "../../hooks/useOrder"
import images from "../../themes/image"

const MyOrder = () => {
  const [order, setOrder] = useState()
  const { searchOrder, updateOrder } = useOrder()
  const [searchParams] = useSearchParams()
  const status = searchParams.get("status")
  const { toast } = useContext(ToastContext)
  const history = useNavigate()

  const [paramsSearch, setParamSearch] = useState({
    searchByUser: true,
    ...(status !== null && { status: Number(status) }),
  })

  const handleSearch = useCallback(
    (params) => {
      let search = { ...paramsSearch, ...params }
      if (!status && status !== 0) {
        delete search?.status
      }
      searchOrder(
        search,
        (res) => {
          setOrder(res?.data)
          setParamSearch(search)
        },
        () => {
          // do nothing
        }
      )
    },
    [status]
  )

  const handleCancelOrder = (order) => {
    updateOrder(
      { _id: order, status: 0 },
      () => {
        toast("success", "Hủy đơn thành công")
        handleSearch({ status: Number(status) })
      },
      () => {
        // do nothing
      }
    )
  }

  const handleDetailOrderClick = (_id) => {
    history({
      pathname: "/detail-order",
      search: createSearchParams({ id: _id }).toString(),
    })
  }

  useEffect(() => {
    handleSearch({ status: Number(status) })
  }, [status])

  return (
    <Layout>
      <br />
      <div className="grid wide">
        <div className="row">
          <div className="col c-2">
            <InfoTabBar />
          </div>
          <div className="col c-10">
            <TabLink />
            {order?.list?.length === 0 && (
              <>
                <br />
                <WrapNoOrder>
                  <NoOrder
                    style={{ backgroundImage: `url(${images.icNoOrder})` }}
                  />
                  <br />
                  <p>Chưa có đơn hàng</p>
                </WrapNoOrder>
              </>
            )}
            {order?.list?.length > 0 &&
              order?.list?.map((item) => (
                <OrderHistoryList
                  data={item}
                  onCancelOrder={handleCancelOrder}
                  onDetailOrderClick={handleDetailOrderClick}
                />
              ))}
          </div>
        </div>
      </div>
      <br />
    </Layout>
  )
}

export default MyOrder

const NoOrder = styled.div`
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: white;
  width: 10rem;
  height: 10rem;
`

const WrapNoOrder = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  flex-direction: column;
  border-radius: 5px;
`
