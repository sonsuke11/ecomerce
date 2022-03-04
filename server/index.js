const express = require("express")
require("dotenv").config()
const connectDB = require("./config/db")
const authRoute = require("./routes/auth")
const handleError = require("./middlewares/handlerError")
const app = express()
const PORT = process.env.PORT || 3000
//connectDB
connectDB()

// middlewares
app.use(express.json())
app.use("/api/auth", authRoute)

app.use(handleError)
app.listen(PORT, console.log(`listening on port ${PORT}`))
