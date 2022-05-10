const express = require("express")
require("dotenv").config()
const cors = require("cors")
const morgan = require("morgan")
const connectDB = require("./config/db")
const appRoutes = require("./routes")
const handleError = require("./middlewares/handlerError")

const app = express()

const PORT = process.env.PORT || 3000
//connectDB
connectDB()

// middlewares
app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())
app.use("/api/auth", appRoutes.authRoute)
app.use("/api/product", appRoutes.productRoute)
app.use("/api/cart", appRoutes.cartRoute)
app.use("/api/category", appRoutes.categoryRoute)
app.use("/api/order", appRoutes.orderRoute)
app.use(handleError)

app.listen(PORT, console.log(`listening on port ${PORT}`))
