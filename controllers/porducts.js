const products = require('../models/products');

const getAllProducts = (req, res) => {
  products.find({"featured": true, "type": "Electronics"})
    .then(data => res.status(200).json({ success: true, data }))
    .catch(err => res.status(500).json({ success: false, msg: 'Internal server error' }));
};

const getAllProductsTesting = async (req, res) => {
  res.status(200).json({ success: true, msg: 'Show all' });
}

module.exports = { 
  getAllProducts,
  getAllProductsTesting
}