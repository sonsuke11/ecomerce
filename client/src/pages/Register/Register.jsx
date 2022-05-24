import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/atoms/Button/Button"
import Input from "../../components/atoms/Input/Input"
import images from "../../themes/image"
import useUser from "../../hooks/useUser"
import { ToastContext } from "../../App"
import { getMessageError } from "../../utils/helpers"
import { ADMIN } from "../../utils/constants"

const Login = () => {
  const [isHidden, setIsHidden] = useState(false)
  const [isHiddenConfirm, setIsHiddenConfirm] = useState(false)

  const { toast } = useContext(ToastContext)
  const history = useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const { register } = useUser()
  const handleClickIcon = () => {
    setIsHidden(!isHidden)
  }
  const handleLickConfirm = () => {
    setIsHiddenConfirm(!isHiddenConfirm)
  }
  const handleRegisterClick = () => {
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
  return (
    <div className="login__modal">
      <br />
      <div className="login__title">REGISTER</div>
      <br />
      <br />
      <Input
        type="text"
        value={user.username}
        onChange={(value) => setUser({ ...user, username: value })}
        placeholder="Username"
      />
      <br />
      <Input
        type="text"
        value={user.email}
        onChange={(value) => setUser({ ...user, email: value })}
        placeholder="Email"
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
      <Input
        value={user.confirmPassword}
        onChange={(value) => setUser({ ...user, confirmPassword: value })}
        type={isHiddenConfirm ? "text" : "password"}
        icon={isHiddenConfirm ? images.icView : images.icHidden}
        onClickIcon={handleLickConfirm}
        placeholder="Confirm Password"
      />
      <br />
      <br />
      <Button className="login__button" onClick={handleRegisterClick}>
        Register
      </Button>
      <br />
      <Link to="/forgot-password">Forgot Password ?</Link>
      <br />
      <div className="login__create">
        You have an account ?<Link to="/login">&nbsp;Login</Link>
      </div>
    </div>
  )
}

export default Login
