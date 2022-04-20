import React, { useState } from "react"
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
  const items = [
    { label: "Disable", value: 0 },
    { label: "Enable", value: 1 },
  ]
  return (
    <Modal isOpen={isOpen} onCancel={onCancel} onSave={onSave} title={title}>
      <br />
      <br />
      <Input
        label="Name"
        value={data?.username}
        onChange={(value) => setData({ ...data, username: value })}
      />
      <br />
      <Input
        label="Role"
        value={data?.role}
        onChange={(value) => setData({ ...data, role: value })}
      />
      <br />
      <Input
        label="Email"
        value={data?.email}
        onChange={(value) => setData({ ...data, email: value })}
      />
      <br />
      <RadioGroup
        items={items}
        value={items.find(
          (i) => i?.value?.toString() === data?.enable?.toString()
        )}
        onChange={(value) => setData({ ...data, enable: value?.value })}
      />
      <br />
    </Modal>
  )
}

export default UserDetailModal
