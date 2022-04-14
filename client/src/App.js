import React, { useRef, createContext } from "react"
import { Route, Routes } from "react-router-dom"
import Toast from "./components/modlecules/Toast/Toast"
import Detail from "./pages/Detail/Detail"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Products from "./pages/Products/Products"
import PrivateRouter from "./Router/PrivateRouter"

export const ToastContext = createContext()
const App = () => {
  const ref = useRef()

  return (
    <>
      <ToastContext.Provider
        value={{
          toast: (variant, mess) => ref.current.showToast(variant, mess),
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRouter>
                <Home />
              </PrivateRouter>
            }
          />
          <Route path="/products" element={<Products />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ToastContext.Provider>
      <Toast ref={ref} />
    </>
  )
}

export default App
