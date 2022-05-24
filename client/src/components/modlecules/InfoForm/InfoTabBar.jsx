import React from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import useUser from "../../../hooks/useUser"

const InfoTabBar = () => {
  const { userData } = useUser()

  return (
    <>
      <InfoUser>
        <Avatar
          style={{
            backgroundImage: `url(data:image/png;base64,${userData?.auth?.avatar})`,
          }}
        />
        <UserName>SonSuke</UserName>
      </InfoUser>
      <br />
      <hr />
      <br />
      <TabLink to="/my-account">Tài Khoản</TabLink>
      <TabLink to="/my-order">Đơn hàng</TabLink>
    </>
  )
}

export default InfoTabBar

const InfoUser = styled.div`
  display: flex;
  align-items: center;
`
const Avatar = styled.div`
  padding-top: 8rem;
  width: 8rem;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  border: 1px solid #ccc;
`
const UserName = styled.div`
  margin-left: 1rem;
  font-weight: bold;
`

const TabLink = styled(NavLink)`
  display: block;
  text-align: center;
  padding-block: 1.5rem;
  color: black;
  &.active {
    background-color: black;
    color: white;
  }
`
