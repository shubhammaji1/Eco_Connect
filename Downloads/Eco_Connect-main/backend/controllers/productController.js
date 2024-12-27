const Product = require('../models/productModel');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const addProduct = async (req, res) => {
  const { name, price, stock, image } = req.body;
  try {
    const newProduct = await Product.create({ name, price, stock, image });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
};

module.exports = { getProducts, addProduct };
