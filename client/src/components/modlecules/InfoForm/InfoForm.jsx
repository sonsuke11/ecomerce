import React from "react"
import styled from "styled-components"
import Button from "../../atoms/Button/Button"
import FileSelect from "../../atoms/FileSelect/FileSelect"
import Input from "../../atoms/Input/Input"

const InfoForm = ({ user, setUser, onSaveUser }) => {
  return (
    <Wrap>
      <Title>Tài khoản của tôi</Title>
      <br />
      <hr />
      <br />
      <div className="row">
        <div className="col c-7">
          <Input
            placeholder="Họ và tên"
            label="Họ và tên"
            value={user?.username}
            onChange={(value) => setUser({ ...user, username: value })}
          />
          <br />
          <Input
            placeholder="Email"
            label="Email"
            value={user?.email}
            onChange={(value) => setUser({ ...user, email: value })}
          />
          <br />
          <Input
            placeholder="Số điện thoại"
            label="Số điện thoại"
            value={user?.phone}
            onChange={(value) => setUser({ ...user, phone: value })}
          />
          <br />
          <Input
            type="date"
            form
            label="Ngày sinh"
            placeholder="Ngày sinh"
            style={{ paddingRight: 8 }}
            value={user?.dateOfBirth}
            onChange={(value) => setUser({ ...user, dateOfBirth: value })}
          />
        </div>
        <div className="col c-5">
          <FileSelect
            displayFile="top"
            fileBase64={user?.fileBase64}
            file={user?.avatar}
            imgRadius
            onChange={(file) =>
              setUser({
                ...user,
                avatar: file,
                fileBase64: null,
                isChangeFile: true,
              })
            }
          />
        </div>
      </div>
      <br />
      <hr />
      <br />
      <GroupButton>
        <Button onClick={onSaveUser}>Lưu</Button>
      </GroupButton>
    </Wrap>
  )
}

export default InfoForm

const Wrap = styled.div`
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: white;
`
const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`

const GroupButton = styled.div`
  display: flex;
  justify-content: flex-end;
`
