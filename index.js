require('dotenv').config();
const connectDB = require('./db/connect');
const Product = require('./models/products');

const productJson = require('./product.json');
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    product = await Product.create(productJson)
    console.log('Successfulle created product');
  } catch (error) {
    console.log(error);
  }
}