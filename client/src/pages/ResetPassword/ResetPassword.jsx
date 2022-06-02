import React, { useState, useContext } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Button from "../../components/atoms/Button/Button"
import Input from "../../components/atoms/Input/Input"
import images from "../../themes/image"
import useUser from "../../hooks/useUser"
import { ToastContext } from "../../App"

const ResetPassword = () => {
  const [isHidden, setIsHidden] = useState(false)
  const [isHiddenConfirm, setIsHiddenConfirm] = useState(false)
  const [validateError, setValidateError] = useState({
    confirmPassword: "",
    password: "",
  })
  const { toast } = useContext(ToastContext)
  const history = useNavigate()
  const { token } = useParams()
  const [user, setUser] = useState({
    confirmPassword: "",
    password: "",
  })
  const { resetPassword } = useUser()

  const handleClickIcon = () => {
    setIsHidden(!isHidden)
  }
  const handleLickConfirm = () => {
    setIsHiddenConfirm(!isHiddenConfirm)
  }
  const validate = () => {
    const errors = {}
    let flag = true
    if (!user.password.trim()) {
      errors.password = "Vui lòng không để trống trường này"
      flag = false
    }
    if (!user.confirmPassword.trim()) {
      errors.confirmPassword = "Vui lòng không để trống trường này"
      flag = false
    }
    if (user.password.trim() !== user.confirmPassword.trim()) {
      errors.confirmPassword = "Trường này phải trùng giá trị với mật khẩu"
      flag = false
    }
    setValidateError(errors)
    return flag
  }
  const handleResetClick = () => {
    if (validate()) {
      console.log("token:>> ", {
        token,
        password: user.password,
      })
      resetPassword(
        {
          token,
          password: user.password,
        },
        () => {
          toast("success", "Đặt lại mật khẩu thành công")
          history("/login")
        },
        () => {
          // do nothing
        }
      )
    }
  }
  return (
    <div className="login__modal">
      <br />
      <div className="login__title">Đặt lại mật khẩu</div>
      <br />
      <br />
      <Input
        type={isHidden ? "text" : "password"}
        error={validateError?.password}
        value={user.password}
        onChange={(value) => {
          setUser({ ...user, password: value })
          setValidateError({ ...validateError, password: "" })
        }}
        placeholder="Mật khẩu mới"
        icon={isHidden ? images.icView : images.icHidden}
        onClickIcon={handleClickIcon}
      />
      <br />
      <br />
      <Input
        type={isHiddenConfirm ? "text" : "password"}
        value={user.confirmPassword}
        error={validateError?.confirmPassword}
        onChange={(value) => {
          setUser({ ...user, confirmPassword: value })
          setValidateError({ ...validateError, confirmPassword: "" })
        }}
        icon={isHiddenConfirm ? images.icView : images.icHidden}
        onClickIcon={handleLickConfirm}
        placeholder="Nhập lại mật khẩu mới"
      />
      <br />
      <br />
      <Button className="login__button" onClick={handleResetClick}>
        Xác nhận
      </Button>
      <br />
      <Link to="/forgot-password">Quên mật khẩu?</Link>
      <br />
      <div className="login__create">
        You have an account?<Link to="/login">&nbsp;Đăng nhập</Link>
      </div>
    </div>
  )
}

export default ResetPassword
