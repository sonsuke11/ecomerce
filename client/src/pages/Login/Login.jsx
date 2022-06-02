import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/atoms/Button/Button"
import Input from "../../components/atoms/Input/Input"
import images from "../../themes/image"
import "./Login.scss"
import useUser from "../../hooks/useUser"
import { ToastContext } from "../../App"
import { getMessageError } from "../../utils/helpers"
import { ADMIN } from "../../utils/constants"

const Login = () => {
  const [isHidden, setIsHidden] = useState(false)
  const { toast } = useContext(ToastContext)
  const history = useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const [validateError, setValidateError] = useState({
    email: "",
    password: "",
  })
  const { login, getUserInfo } = useUser()
  const handleClickIcon = () => {
    setIsHidden(!isHidden)
  }
  const handleGetUserInfo = () => {
    getUserInfo(
      (res) => {
        console.log("res :>> ", res)
        if (res?.data?.role === ADMIN) {
          history("/admin/dashboard")
        } else {
          history("/")
        }
      },
      () => {
        // do nothing
      }
    )
  }

  const validate = () => {
    const errors = {}
    let flag = true
    if (!user.email.trim()) {
      errors.email = "Vui lòng không để trống trường này"
      flag = false
    }

    if (!user.password.trim()) {
      errors.password = "Vui lòng không để trống trường này"
      flag = false
    }
    setValidateError(errors)
    return flag
  }

  const handleLoginClick = () => {
    if (validate()) {
      login(
        user,
        (res) => {
          toast("success", "Đăng nhập thành công")
          localStorage.setItem("user", res?.accessToken)
          setTimeout(() => {
            handleGetUserInfo()
          }, 1000)
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
      <div className="login__title">Đăng nhập</div>
      <br />
      <br />
      <Input
        type="text"
        id="email"
        value={user.email}
        onChange={(value) => {
          setUser({ ...user, email: value })
          setValidateError({ ...validateError, email: "" })
        }}
        placeholder="Tên đăng nhập"
        error={validateError.email}
      />
      <br />
      <br />
      <Input
        value={user.password}
        onChange={(value) => {
          setUser({ ...user, password: value })
          setValidateError({ ...validateError, password: "" })
        }}
        type={isHidden ? "text" : "password"}
        icon={isHidden ? images.icView : images.icHidden}
        onClickIcon={handleClickIcon}
        placeholder="Mật khẩu"
        error={validateError.password}
      />
      <br />
      <br />
      <Button className="login__button" onClick={handleLoginClick}>
        Login
      </Button>
      <br />
      <Link to="/forgot-password">Quên mật khẩu ?</Link>
      <br />
      <div className="login__create">
        Bạn chưa có tài khoản ?<Link to="/register">&nbsp;Đăng ký</Link>
      </div>
    </div>
  )
}

export default Login
