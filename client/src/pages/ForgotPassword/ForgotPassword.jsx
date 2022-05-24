import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/atoms/Button/Button"
import Input from "../../components/atoms/Input/Input"
import images from "../../themes/image"
import useUser from "../../hooks/useUser"
import { ToastContext } from "../../App"
import { getMessageError } from "../../utils/helpers"
import { ADMIN } from "../../utils/constants"

const ForgotPassword = () => {
  const { toast } = useContext(ToastContext)
  const history = useNavigate()
  const [user, setUser] = useState({
    email: "",
  })
  const { forgotPassword } = useUser()

  const handleSendMailClick = () => {
    forgotPassword(
      user,
      () => {
        toast("success", "Vui lòng kiểm tra mail của bạn")
      },
      (error) => {
        toast("error", getMessageError(error))
      }
    )
  }
  return (
    <div className="login__modal">
      <br />
      <div className="login__title">Forgot Password</div>
      <br />
      <br />
      <Input
        type="text"
        value={user.email}
        onChange={(value) => setUser({ ...user, email: value })}
        placeholder="Email"
      />
      <br />
      <Button className="login__button" onClick={handleSendMailClick}>
        Send mail
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

export default ForgotPassword
