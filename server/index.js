const express = require("express")
require("dotenv").config()
const cors = require("cors")
const morgan = require("morgan")

const connectDB = require("./config/db")
const appRoutes = require("./routes")
const handleError = require("./middlewares/handlerError")

const app = express()

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, console.log(`listening on port ${PORT}`))
const io = require("socket.io")(server)

app.set("socket", io)
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
app.use("/api/comment", appRoutes.commentRoute)
app.get("/api/activities", async (req, res, next) => {
  const io = req.app.get("socket")
  io.emit("hi", "hi")
})
Webs
app.use(handleError)
