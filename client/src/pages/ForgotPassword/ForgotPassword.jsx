import React, { useState, useContext, useRef } from "react"
import { Link } from "react-router-dom"
import Button from "../../components/atoms/Button/Button"
import Input from "../../components/atoms/Input/Input"
import useUser from "../../hooks/useUser"
import { ToastContext } from "../../App"
import { getMessageError } from "../../utils/helpers"

const ForgotPassword = () => {
  const { toast } = useContext(ToastContext)
  const [user, setUser] = useState({
    email: "",
  })
  const [validateError, setValidateError] = useState({ email: "" })
  const { forgotPassword } = useUser()
  const [sent, setSent] = useState(false)
  const ref = useRef()

  const validate = () => {
    const errors = {}
    let flag = true
    if (!user.email.trim()) {
      errors.email = "Vui lòng không để trống trường này"
      ref?.current?.focus()
      flag = false
    }

    setValidateError(errors)
    return flag
  }

  const handleSendMailClick = () => {
    if (validate()) {
      forgotPassword(
        user,
        () => {
          toast("success", "Vui lòng kiểm tra mail của bạn")
          setSent(true)
        },
        (error) => {
          toast("error", getMessageError(error))
        }
      )
    }
  }
  return (
    <div className="login__modal">
      <br />
      <div className="login__title">Quên mật khẩu</div>
      <br />
      <br />
      {sent && (
        <div style={{ textAlign: "center" }}>
          Vui lòng kiểm tra email của bạn
        </div>
      )}
      {!sent && (
        <Input
          type="text"
          ref={ref}
          value={user.email}
          onChange={(value) => {
            setUser({ ...user, email: value })
            setValidateError({ ...validateError, email: "" })
          }}
          placeholder="Email"
          error={validateError.email}
        />
      )}
      <br />
      <br />
      <Button className="login__button" onClick={handleSendMailClick}>
        {sent ? "Gửi lại" : "Gửi mail"}
      </Button>
      <br />
      <div className="login__create">
        Bạn chưa có tài khoản ?<Link to="/register">&nbsp;Đăng ký</Link>
      </div>
      <br />
      <div className="login__create">
        Bạn đã có tài khoản ?<Link to="/login">&nbsp;Đăng nhập</Link>
      </div>
    </div>
  )
}

export default ForgotPassword
