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
          <Route
            path="/search"
            element={
              <PrivateRouter>
                <Products />
              </PrivateRouter>
            }
          />
          <Route
            path="/detail"
            element={
              <PrivateRouter>
                <Detail />
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
          <Route path="/login" element={<Login />} />
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
