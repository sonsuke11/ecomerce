import React, { useContext, useEffect, useState } from "react"
import InfoForm from "../../components/modlecules/InfoForm/InfoForm"
import InfoTabBar from "../../components/modlecules/InfoForm/InfoTabBar"
import Layout from "../../components/modlecules/Layout/Layout"
import useUser from "../../hooks/useUser"
import { ToastContext } from "../../App"
import _ from "lodash"

const MyAccount = () => {
  const [user, setUser] = useState()
  const { toast } = useContext(ToastContext)
  const { updateUser, userData } = useUser()

  const handleSaveUser = () => {
    updateUser(
      _.omit(user, ["fileBase64"]),
      () => toast("success", "Cập nhật tài khoản thành công"),
      () => {
        // do nothing
      }
    )
  }

  useEffect(() => {
    if (!_.isEmpty(userData?.auth)) {
      setUser({ ...userData?.auth, fileBase64: userData?.auth?.avatar })
    }
  }, [userData?.auth])
  return (
    <Layout>
      <br />
      <div className="grid wide">
        <div className="row">
          <div className="col c-2">
            <InfoTabBar />
          </div>
          <div className="col c-10">
            <InfoForm
              user={user}
              setUser={setUser}
              onSaveUser={handleSaveUser}
            />
          </div>
        </div>
      </div>
      <br />
    </Layout>
  )
}

export default MyAccount
