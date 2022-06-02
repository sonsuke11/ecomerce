import React, { useState } from "react"
import useUser from "../../../hooks/useUser"
import { StatusOption } from "../../../utils/constants"
import Input from "../../atoms/Input/Input"
import Modal from "../../atoms/Modal/Modal"
import RadioGroup from "../../atoms/RadioGroup/RadioGroup"

const UserDetailModal = ({
  data,
  isOpen,
  onCancel,
  onSave,
  title,
  setData,
}) => {
  const { userData } = useUser()
  return (
    <Modal isOpen={isOpen} onCancel={onCancel} onSave={onSave} title={title}>
      <br />
      <br />
      <Input
        disabled
        label="Name"
        value={data?.username}
        onChange={(value) => setData({ ...data, username: value })}
      />
      <br />
      <Input
        label="Role"
        disabled
        value={data?.role}
        onChange={(value) => setData({ ...data, role: value })}
      />
      <br />
      <Input
        label="Email"
        value={data?.email}
        disabled
        onChange={(value) => setData({ ...data, email: value })}
      />
      <br />
      <RadioGroup
        disabled={userData?.auth?._id === data._id}
        items={StatusOption}
        value={StatusOption.find(
          (i) => i?.value?.toString() === data?.enable?.toString()
        )}
        onChange={(value) => setData({ ...data, enable: value?.value })}
      />
      <br />
    </Modal>
  )
}

export default UserDetailModal
