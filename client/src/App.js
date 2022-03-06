import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"

const App = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/detail" element={<div>detail</div>} />
    </Routes>
  )
}

export default App
