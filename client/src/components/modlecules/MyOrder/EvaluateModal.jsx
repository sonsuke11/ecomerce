import React from "react"
import styled from "styled-components"
import Modal from "../../atoms/Modal/Modal"

const EvaluateModal = ({ isOpen, onCancel, data }) => {
  console.log("data", data)
  return (
    <Modal isOpen={isOpen} onCancel={onCancel}>
      <ModalBody>
        <Title>Đánh giá sản phẩm</Title>
      </ModalBody>
    </Modal>
  )
}

export default EvaluateModal

const Title = styled.h4``

const ModalBody = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`
