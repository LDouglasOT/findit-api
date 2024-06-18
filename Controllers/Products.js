const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createProducts = async (req, res) => {
  try {
    const { ProductsName, price, description, shopId, quantity, size, color, image} = req.body;
    const user = await prisma.login.findMany({})
    const Products = await prisma.Products.create({
      data: {
        productName:ProductsName,
        price:price,
        shopId:shopId,
        quantity:quantity,
        size:size,
        color:color,
        description:description,
        image:image,
      }
    });
    return res.json(Products);

  } catch (error) {

    console.error('Error creating Products:', error);
    return res.status(500).json({ error: 'Internal Server Error' });

  }
};

const getAllProducts = async (req, res) => {
  try {

    const Productss = await prisma.Products.findMany();
    return res.json(Productss);

  } catch (error) {

    console.error('Error fetching Productss:', error);
    res.status(500).json({ error: 'Internal Server Error' });

  }
};

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const Products = await prisma.Products.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    if (!Products) {
      return res.status(404).json({ error: 'Products not found' });
    }
    res.json(Products);

  } catch (error) {
    console.error('Error fetching Products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const { ProductsName, price, description, shopId, quantity, size, color, image } = req.body;
    const updatedProducts = await prisma.Products.update({
      where: {
        id: parseInt(id)
      },
      data: {
        productName:ProductsName,
        price:price,
        shopId:shopId,
        quantity:quantity,
        size:size,
        color:color,
        description:description,
        image:image,
      }
    });
    res.json(updatedProducts);
  } catch (error) {
    console.error('Error updating Products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.Products.delete({
      where: {
        id: parseInt(id)
      }
    });
    res.json({ message: 'Products deleted successfully' });
  } catch (error) {
    console.error('Error deleting Products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createProducts, getAllProducts, getProductsById, updateProductsById, deleteProductsById };
