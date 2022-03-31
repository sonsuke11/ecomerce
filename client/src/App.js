import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Products from "./pages/Products/Products"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  )
}

export default App
