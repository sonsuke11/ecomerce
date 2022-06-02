import React from "react"
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"
import {
  Approved,
  Cancel,
  Completed,
  Transport,
  Waitting,
} from "../../../utils/constants"

const TabLink = () => {
  const location = useLocation()

  const getPath = () => {
    return location.pathname + location.search
  }

  const navLinkData = [
    { path: "/my-order", label: "Tất cả" },
    { path: `/my-order?status=${Waitting}`, label: "Chờ xác nhận" },
    { path: `/my-order?status=${Approved}`, label: "Đã xác nhận" },
    { path: `/my-order?status=${Transport}`, label: "Vận chuyển" },
    { path: `/my-order?status=${Completed}`, label: "Hoàn thành" },
    { path: `/my-order?status=${Cancel}`, label: "Đã hủy" },
  ]

  return (
    <Wrap>
      {navLinkData.map((item) => (
        <StyledLink
          to={item.path}
          className={getPath() === item.path ? "actived" : ""}
        >
          {item.label}
        </StyledLink>
      ))}
    </Wrap>
  )
}

export default TabLink

const Wrap = styled.div`
  display: flex;
  border-radius: 5px;
  background-color: white;
  box-shadow: 4px 4px 10px #ccc;
`

const StyledLink = styled(Link)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  font-size: 1.7rem;
  color: black;
  position: relative;
  &.actived:after {
    content: "";
    display: block;
    position: absolute;
    top: calc(100% - 2px);
    width: 100%;
    border-bottom: 2px solid black;
  }
`
