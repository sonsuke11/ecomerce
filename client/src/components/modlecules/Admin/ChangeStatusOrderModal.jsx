import React from "react"
import styled from "styled-components"
import { OrderStatusOption } from "../../../utils/constants"
import Modal from "../../atoms/Modal/Modal"
import Select from "../../atoms/Select/Select"

const ChangeStatusOrderModal = ({ show, onSave, onCancel, data, setData }) => {
  return (
    <Modal isOpen={show} onSave={onSave} onCancel={onCancel}>
      <Title>Cập nhật trạng thái đơn hàng</Title>
      <br />
      <br />
      <Select
        value={OrderStatusOption.find((item) => item.value === data.status)}
        options={OrderStatusOption}
        onChange={(select) => {
          setData({ ...data, status: select?.value })
        }}
      />
    </Modal>
  )
}

export default ChangeStatusOrderModal

const Title = styled.h3`
  font-size: 2.3rem;
  text-align: center;
  font-weight: bold;
`
