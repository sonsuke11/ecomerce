import React, { useContext, useState } from "react"
import moment from "moment"
import Paginate from "../../atoms/Paginate/Paginate"
import "./ProductTable.scss"
import {
  Approved,
  Cancel,
  Completed,
  Transport,
  Waitting,
} from "../../../utils/constants"
import { formatCurrent } from "../../../utils/helpers"
import styled from "styled-components"
import images from "../../../themes/image"
import ChangeStatusOrderModal from "./ChangeStatusOrderModal"
import useOrder from "../../../hooks/useOrder"
import { ToastContext } from "../../../App"
moment.locale("vi")
const OrderTable = ({
  data,
  handleDelete,
  handleEdit,
  onChangePage,
  fetchOrder,
}) => {
  const { toast } = useContext(ToastContext)
  const [selected, setSelected] = useState({})
  const { updateOrder } = useOrder()
  const [modal, setModal] = useState({ show: false })
  const mapStatus = (status) => {
    switch (status) {
      case Waitting:
        return (
          <StatusSpan style={{ backgroundColor: `#ffc107` }}>
            Chờ phê duyệt
          </StatusSpan>
        )
      case Approved:
        return (
          <StatusSpan style={{ backgroundColor: `#FC8213` }}>
            Đã phê duyệt
          </StatusSpan>
        )
      case Transport:
        return (
          <StatusSpan style={{ backgroundColor: `#5bc0de` }}>
            Vận chuyển
          </StatusSpan>
        )
      case Cancel:
        return (
          <StatusSpan style={{ backgroundColor: `rgb(235, 21, 21)` }}>
            Hủy đơn
          </StatusSpan>
        )
      default:
        return (
          <StatusSpan style={{ backgroundColor: `#28a745` }}>
            Hoàn thành
          </StatusSpan>
        )
    }
  }
  const handleShowModal = () => {
    setModal({ show: true })
  }
  const handleSave = () => {
    updateOrder(
      { _id: selected._id, status: selected.status },
      () => {
        toast("success", "Cập nhật đơn hàng thành công")
        handleCloseModal()
        fetchOrder()
      },
      () => {
        // do nothing
      }
    )
  }
  const handleCloseModal = () => {
    setModal({ show: false })
  }
  return (
    <>
      <div className="table__block">
        <table>
          <thead>
            <tr>
              <th>Stt</th>
              <th>Sản Phẩm</th>
              <th>Trạng thái</th>
              <th>Tổng tiền</th>
              <th>Người đặt</th>
              <th>Thông tin đặt hàng</th>
              <th>Ngày đặt hàng</th>
            </tr>
          </thead>
          <tbody>
            {data?.list?.map((item, index) => (
              <tr key={item._id}>
                <td style={{ verticalAlign: "middle" }}>{index + 1}</td>
                <td>
                  {item.products.map((i) => (
                    <>
                      <Product>
                        <img
                          style={{ width: "6rem" }}
                          src={`data:image/png;base64,${i.productId.images[0].file}`}
                          alt="product"
                        />
                        <p style={{ marginLeft: "1rem", marginRight: "1rem" }}>
                          {i.productId.name}
                        </p>
                        <p style={{ marginLeft: "auto" }}>x{i.quantity}</p>
                      </Product>
                    </>
                  ))}
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {mapStatus(item.status)}
                    {item.status !== Completed && (
                      <img
                        src={images.icEdit}
                        alt=""
                        onClick={() => {
                          setSelected(item)
                          handleShowModal()
                        }}
                        style={{ width: "2rem", marginLeft: "0.9rem" }}
                      />
                    )}
                  </div>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  {formatCurrent(item.totalPrice)}
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  {item.userId.username}
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  {item?.name && (
                    <OrderInfo>
                      <p>Họ và tên:</p>
                      <p>{item.name}</p>
                    </OrderInfo>
                  )}
                  {item.phone && (
                    <OrderInfo>
                      <p>Số đt:</p>
                      <p>{item.phone}</p>
                    </OrderInfo>
                  )}
                  {item.address && (
                    <OrderInfo>
                      <p>Địa chỉ:</p>
                      <p>{item.address}</p>
                    </OrderInfo>
                  )}
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  {moment(item.createdAt).format("DD/MM/yyyy")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <br />
        <Paginate
          size={data?.totalPage}
          active={data?.page}
          onChangePage={onChangePage}
        />
      </div>
      <ChangeStatusOrderModal
        show={modal?.show}
        data={selected}
        onSave={handleSave}
        setData={setSelected}
        onCancel={handleCloseModal}
      />
    </>
  )
}

export default OrderTable

const OrderInfo = styled.div`
  display: flex;
  & p:first-child {
    display: block;
    width: 10rem;
  }
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`

const Product = styled.div`
  display: flex;
  align-items: center;
  width: 30rem;
  &:not(:first-child) {
    margin-top: 0.8rem;
  }
`
const StatusSpan = styled.p`
  padding: 1rem;
  border-radius: 2rem;
  color: white;
  min-width: 11rem;
`
