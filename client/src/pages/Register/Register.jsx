import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/atoms/Button/Button"
import Input from "../../components/atoms/Input/Input"
import images from "../../themes/image"
import useUser from "../../hooks/useUser"
import { ToastContext } from "../../App"
import { getMessageError } from "../../utils/helpers"

const Login = () => {
  const [isHidden, setIsHidden] = useState(false)
  const [isHiddenConfirm, setIsHiddenConfirm] = useState(false)
  const [validateError, setValidateError] = useState()
  const { toast } = useContext(ToastContext)
  const history = useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  })
  const { register } = useUser()
  const handleClickIcon = () => {
    setIsHidden(!isHidden)
  }
  const handleLickConfirm = () => {
    setIsHiddenConfirm(!isHiddenConfirm)
  }
  const validate = () => {
    const errors = {}
    let flag = true

    if (!user.username.trim()) {
      errors.username = "Vui lòng không để trống trường này"
      flag = false
    }
    if (!user.email.trim()) {
      errors.email = "Vui lòng không để trống trường này"
      flag = false
    }
    if (
      user.email.trim() &&
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.email.trim())
    ) {
      errors.email = "Vui lòng nhập email hợp lệ."
      flag = false
    }
    if (!user.password.trim()) {
      errors.password = "Vui lòng không để trống trường này."
      flag = false
    }

    if (
      user.password.trim() &&
      user.password.trim() !== user?.confirmPassword?.trim()
    ) {
      errors.confirmPassword = "Trường này phải trùng với mật khẩu."
      flag = false
    }

    if (!user?.confirmPassword?.trim()) {
      errors.confirmPassword = "Vui lòng không để trống trường này"
      flag = false
    }

    setValidateError(errors)

    console.log("errors", errors)
    return flag
  }
  const handleRegisterClick = () => {
    if (validate()) {
      register(
        user,
        () => {
          toast("success", "Đăng ký thành công")
          history("/login")
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
      <div className="login__title">Đăng ký</div>
      <br />
      <br />
      <Input
        type="text"
        value={user.username}
        onChange={(value) => setUser({ ...user, username: value })}
        placeholder="Tên đăng nhập"
        error={validateError?.username}
      />
      <br />
      <br />
      <Input
        type="text"
        value={user.email}
        onChange={(value) => setUser({ ...user, email: value })}
        placeholder="Email"
        error={validateError?.email}
      />
      <br />
      <br />
      <Input
        value={user.password}
        onChange={(value) => setUser({ ...user, password: value })}
        type={isHidden ? "text" : "password"}
        icon={isHidden ? images.icView : images.icHidden}
        onClickIcon={handleClickIcon}
        placeholder="Mật khẩu"
        error={validateError?.password}
      />
      <br />
      <br />
      <Input
        value={user.confirmPassword}
        onChange={(value) => setUser({ ...user, confirmPassword: value })}
        type={isHiddenConfirm ? "text" : "password"}
        icon={isHiddenConfirm ? images.icView : images.icHidden}
        onClickIcon={handleLickConfirm}
        placeholder="Nhập lại mật khẩu"
        error={validateError?.confirmPassword}
      />
      <br />
      <br />
      <br />
      <Button className="login__button" onClick={handleRegisterClick}>
        Đăng ký
      </Button>
      <br />
      <Link to="/forgot-password">Quên mật khẩu ?</Link>
      <br />
      <div className="login__create">
        Bạn đã có tài khoản ?<Link to="/login">&nbsp;Đăng nhập.</Link>
      </div>
    </div>
  )
}

export default Login
