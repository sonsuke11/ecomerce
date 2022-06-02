import React, { useRef, createContext } from "react"
import { Route, Routes } from "react-router-dom"
import Toast from "./components/modlecules/Toast/Toast"
import Detail from "./pages/Detail/Detail"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Products from "./pages/Products/Products"
import PrivateRouter from "./Router/PrivateRouter"
import AdminRoute from "./Router/AdminRoute"
import Dashboard from "./pages/Admin/Dashboard/Dashboard"
import CategoryList from "./pages/Admin/Category/CategoryList"
import CategoryEdit from "./pages/Admin/Category/CategoryEdit"
import UserList from "./pages/Admin/User/UserList"
import ProductList from "./pages/Admin/Product/ProductList"
import AddProduct from "./pages/Admin/Product/AddProduct"
import ProductEdit from "./pages/Admin/Product/ProductEdit"
import OrderPage from "./pages/OrderPage/OrderPage"
import Register from "./pages/Register/Register"
import ResetPassword from "./pages/ResetPassword/ResetPassword"
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword"
import OrderList from "./pages/Admin/Order/OrderList"
import MyAccount from "./pages/MyAccount/MyAccount"
import MyOrder from "./pages/MyOrder/MyOrder"
import OrderDetail from "./pages/OrderDetail/OrderDetail"
import EvaluateProduct from "./pages/EvaluateProduct/EvaluateProduct"

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
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Products />} />
          <Route path="/detail" element={<Detail />} />
          <Route
            path="/evaluate-product"
            element={
              <PrivateRouter>
                <EvaluateProduct />
              </PrivateRouter>
            }
          />

          <Route
            path="/order"
            element={
              <PrivateRouter>
                <OrderPage />
              </PrivateRouter>
            }
          />
          <Route
            path="/my-account"
            element={
              <PrivateRouter>
                <MyAccount />
              </PrivateRouter>
            }
          />
          <Route
            path="/my-order"
            element={
              <PrivateRouter>
                <MyOrder />
              </PrivateRouter>
            }
          />
          <Route
            path="/detail-order"
            element={
              <PrivateRouter>
                <OrderDetail />
              </PrivateRouter>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="admin">
            <Route
              path="dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route
              path="category-list"
              element={
                <AdminRoute>
                  <CategoryList />
                </AdminRoute>
              }
            />
            <Route
              path="category-create"
              element={
                <AdminRoute>
                  <CategoryEdit />
                </AdminRoute>
              }
            />
            <Route
              path="order-list"
              element={
                <AdminRoute>
                  <OrderList />
                </AdminRoute>
              }
            />
            <Route
              path="user-list"
              element={
                <AdminRoute>
                  <UserList />
                </AdminRoute>
              }
            />
            <Route
              path="product-list"
              element={
                <AdminRoute>
                  <ProductList />
                </AdminRoute>
              }
            />
            <Route
              path="product-create"
              element={
                <AdminRoute>
                  <AddProduct />
                </AdminRoute>
              }
            />
            <Route
              path="product-edit"
              element={
                <AdminRoute>
                  <ProductEdit />
                </AdminRoute>
              }
            />
          </Route>
        </Routes>
      </ToastContext.Provider>
      <Toast ref={ref} />
    </>
  )
}

export default App
