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
  const handleLoginClick = () => {
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
  return (
    <div className="login__modal">
      <br />
      <div className="login__title">LOGIN</div>
      <br />
      <br />
      <Input
        type="text"
        value={user.username}
        onChange={(value) => setUser({ ...user, email: value })}
        placeholder="Username"
      />
      <br />
      <Input
        value={user.password}
        onChange={(value) => setUser({ ...user, password: value })}
        type={isHidden ? "text" : "password"}
        icon={isHidden ? images.icView : images.icHidden}
        onClickIcon={handleClickIcon}
        placeholder="Password"
      />
      <br />
      <br />
      <Button className="login__button" onClick={handleLoginClick}>
        Login
      </Button>
      <br />
      <Link to="/forgot-password">Forgot Password ?</Link>
      <br />
      <div className="login__create">
        Don't have an account ?<Link to="/register">&nbsp;Register</Link>
      </div>
    </div>
  )
}

export default Login
