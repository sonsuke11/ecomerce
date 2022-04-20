import React from "react"
import Input from "../../atoms/Input/Input"
import Select from "../../atoms/Select/Select"

const InfoOrderForm = ({ dataOrder, setDataOrder, cites }) => {
  return (
    <div className="col c-6">
      <div className="order__block">
        <h1 className="order__title">Thông tin giao hàng</h1>
        <Input placeholder="Họ và Tên" />
        <div className="row sm-gutter">
          <div className="col c-8">
            <Input placeholder="Email" />
          </div>
          <div className="col c-4">
            <Input placeholder="Số điện thoại" />
          </div>
        </div>
        <Input placeholder="Địa chỉ" />
        <Select
          options={cites}
          value={cites.find((city) => city.value === dataOrder?.city)}
          onChange={(select) =>
            setDataOrder({ ...dataOrder, city: select?.value })
          }
        />
      </div>
    </div>
  )
}

export default InfoOrderForm
