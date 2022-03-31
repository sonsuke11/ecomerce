const express = require("express")
require("dotenv").config()
const swaggerUi = require("swagger-ui-express")
const connectDB = require("./config/db")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const handleError = require("./middlewares/handlerError")
const { options } = require("./swagger")
const swaggerJSDoc = require("swagger-jsdoc")

const app = express()
const PORT = process.env.PORT || 3000
//connectDB
connectDB()

// middlewares
const spec = swaggerJSDoc(options)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec))
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/product", productRoute)
app.use(handleError)

app.listen(PORT, console.log(`listening on port ${PORT}`))
