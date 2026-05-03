const Product = require("../models/Product");


exports.getProducts = async (req, res) => {
  const products = await Product.find({ user: req.user._id });
  res.json(products);
};

exports.getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

exports.createProduct = async (req, res) => {
  const { name, image, price, description } = req.body;

  const product = await Product.create({
    name,
    image,
    price,
    description,
    user: req.user._id,
  });

  res.status(201).json(product);
};


exports.updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Not found" });
  }

  product.name = req.body.name || product.name;
  product.image = req.body.image || product.image;
  product.price = req.body.price || product.price;
  product.description = req.body.description || product.description;

  const updated = await product.save();
  res.json(updated);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};