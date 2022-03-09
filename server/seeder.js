const seeder = require("mongoose-seed")
const faker = require("faker")

let items = []
for (let i = 0; i <= 50; i++) {
  items.push({
    name: faker.commerce.productName(),
    quantity: faker.datatype.number(),
    imageUrl: faker.image.imageUrl(),
    description: faker.lorem.text(),
  })
}
let data = [
  {
    model: "Product",
    document: items,
  },
]
seeder.connect("mongodb://localhost:27017/mern_auth", function () {
  seeder.loadModels(["./models/Product.js"])
  seeder.populateModels(["Product"], function () {
    seeder.populateModels(data, function () {
      seeder.disconnect()
      console.log("seeder successfully initialized")
    })
  })
})
