import React from "react"
import styled from "styled-components"
import moment from "moment"
import Button from "../../atoms/Button/Button"
import Input from "../../atoms/Input/Input"

const FilterByDate = ({ params, setParams, onClickSearch }) => {
  const min = params?.startDate
  const max = moment().format("yyyy-MM-DD")
  return (
    <Wrap>
      <Block>
        <Input
          label="Ngày bắt đầu"
          type="date"
          style={{ paddingRight: 8 }}
          value={params?.startDate}
          onChange={(value) => setParams({ ...params, startDate: value })}
        />
        <div style={{ marginLeft: 20 }}>
          <Input
            label="Ngày kết thúc"
            type="date"
            min={min}
            max={max}
            style={{ paddingRight: 8 }}
            value={params?.endDate}
            onChange={(value) => setParams({ ...params, endDate: value })}
          />
        </div>
      </Block>
      <br />
      <hr />
      <br />
      <Button onClick={onClickSearch}>Tìm kiếm</Button>
    </Wrap>
  )
}

export default FilterByDate

const Block = styled.div`
  display: flex;
`
const Wrap = styled.div`
  background-color: white;
  padding: 2rem;
`
