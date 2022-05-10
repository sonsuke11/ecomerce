const mongoose = require("mongoose")

const ImageSchema = mongoose.Schema({
  file: {
    type: String,
  },
  fileName: {
    type: String,
  },
})

module.exports = mongoose.model("Image", ImageSchema)
