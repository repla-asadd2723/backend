const getAllProducts = async (req, res) => {
  res.status(200).json({ success: true, msg: 'Show all products' });
}

const getAllProductsTesting = async (req, res) => {
  res.status(200).json({ success: true, msg: 'Show all products' });
}

module.exports = { 
  getAllProducts,
   getAllProductsTesting
}