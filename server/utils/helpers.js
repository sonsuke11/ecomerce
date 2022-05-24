const mongoose = require("mongoose")

function extendSchema(Schema, definition, options) {
  return new mongoose.Schema(Object.assign({}, Schema.obj, definition), options)
}

function getDaysInCurrentMonth() {
  const date = new Date()

  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}
module.exports = { extendSchema, getDaysInCurrentMonth }
