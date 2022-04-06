import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Detail from "./pages/Detail/Detail"
import Home from "./pages/Home/Home"
import Products from "./pages/Products/Products"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/detail" element={<Detail />} />
    </Routes>
  )
}

export default App
