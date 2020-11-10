const db = require('./server/db')
const faker = require('faker')

function userMaker() {
  let userArray = []
  let random_boolean

  for (let i = 0; i < 100; i++) {
    random_boolean = Math.random() <= 0.25
    userArray.push({
      email: faker.internet.email(),
      password: faker.internet.password(),
      address: faker.address.streetAddress(),
      imageUrl: faker.image.people(),
      isAdmin: random_boolean
    })
  }
  return userArray
}

const users = userMaker()

console.log(users)

function productMaker() {
  let productArray = []
  let categoryArray = [clubs, balls]
  for (let j = 0; j < 100; j++) {
    productArray.push({
      name: faker.commerce.productName(),
      imageUrl: faker.image.technics(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      category: categoryArray[Math.ceil(Math.random() * 2)]
    })
  }
  return productArray
}

const products = productMaker()
