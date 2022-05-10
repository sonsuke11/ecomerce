import React from "react"
import { createPortal } from "react-dom"
import Button from "../../atoms/Button/Button"
import "./Modal.scss"

const Modal = ({ isOpen, title, children, onSave, onCancel }) => {
  if (!isOpen) return null
  return createPortal(
    <div className="modal__background">
      <div className="modal__wrapper">
        <h2 className="modal__title">{title}</h2>
        <div className="modal__body">{children}</div>
        <div className="modal__btn--group">
          <Button variant="success" onClick={onSave}>
            Save
          </Button>
          <Button
            variant="warning"
            onClick={onCancel}
            style={{ marginLeft: "2rem" }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
