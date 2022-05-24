import React from "react"
import styled from "styled-components"
import { formatCurrent, formatNumber } from "../../../utils/helpers"

const RevenueBlock = ({
  totalSold,
  totalRootPrice,
  totalRevenue,
  totalBendfit,
}) => {
  return (
    <Wrap>
      <Column>
        <Title>Số lượng đã bán</Title>
        <Content>{formatNumber(totalSold)}</Content>
      </Column>
      <Divided />
      <Column>
        <Title>Tổng chi</Title>
        <Content>{formatCurrent(totalRootPrice)}</Content>
      </Column>
      <Divided />
      <Column>
        <Title>Doanh thu</Title>
        <Content>{formatCurrent(totalRevenue)}</Content>
      </Column>
      <Divided />
      <Column>
        <Title>Lợi nhuận</Title>
        <Content>{formatCurrent(totalRevenue - totalRootPrice)}</Content>
      </Column>
    </Wrap>
  )
}

export default RevenueBlock

const Wrap = styled.div`
  background-color: white;
  display: flex;
  border: 1px solid #ccc;
  align-items: center;
`

const Column = styled.div`
  flex: 1;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Divided = styled.div`
  height: 138px;
  width: 1px;
  border-right: 1px solid #ccc;
`
const Title = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1.6rem;
`
const Content = styled.div`
  font-size: 2rem;
  font-weight: 700;
`
