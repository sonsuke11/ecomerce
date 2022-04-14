import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/atoms/Button/Button"
import Input from "../../components/atoms/Input/Input"
import images from "../../themes/image"
import "./Login.scss"
import useUser from "../../hooks/useUser"
import { ToastContext } from "../../App"
import { getMessageError } from "../../utils/helpers"

const Login = () => {
  const [isHidden, setIsHidden] = useState(false)
  const { toast } = useContext(ToastContext)
  const history = useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const { login } = useUser()
  const handleClickIcon = () => {
    setIsHidden(!isHidden)
  }
  const handleLoginClick = () => {
    login(
      user,
      (res) => {
        toast("success", "Đăng nhập thành công")
        console.log(res)
        localStorage.setItem("user", res.accessToken)
        history("/")
      },
      (error) => {
        console.log(error.response.data.error)
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
        label="Username"
        type="text"
        value={user.username}
        onChange={(value) => setUser({ ...user, email: value })}
      />
      <br />
      <Input
        value={user.password}
        onChange={(value) => setUser({ ...user, password: value })}
        label="Password"
        type={isHidden ? "text" : "password"}
        icon={isHidden ? images.icView : images.icHidden}
        onClickIcon={handleClickIcon}
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
