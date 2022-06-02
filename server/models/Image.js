const mongoose = require("mongoose")

const ImageSchema = mongoose.Schema({
  file: {
    type: String,
    required: [true, "Hãy cung cấp file ảnh"],
  },
  fileName: {
    type: String,
  },
})

module.exports = mongoose.model("Image", ImageSchema)
