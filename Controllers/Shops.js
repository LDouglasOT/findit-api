const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createShop = async (req, res) => {
  try {
    const { shopName, profile, subscription, isActive, loginId } = req.body;
    const shop = await prisma.shop.create({
      data: {
        shopName,
        profile,
        subscription,
        isActive,
        loginId
      }
    });
    res.json(shop);
  } catch (error) {
    console.error('Error creating shop:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllShops = async (req, res) => {
  try {
    const shops = await prisma.shop.findMany();
    res.json(shops);
  } catch (error) {
    console.error('Error fetching shops:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getShopById = async (req, res) => {
  try {
    const { id } = req.params;
    const shop = await prisma.shop.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    res.json(shop);
  } catch (error) {
    console.error('Error fetching shop:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateShopById = async (req, res) => {
  try {
    const { id } = req.params;
    const { shopName, profile, subscription, isActive, loginId } = req.body;
    const updatedShop = await prisma.shop.update({
      where: {
        id: parseInt(id)
      },
      data: {
        shopName,
        profile,
        subscription,
        isActive,
        loginId
      }
    });
    res.json(updatedShop);
  } catch (error) {
    console.error('Error updating shop:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteShopById = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.shop.delete({
      where: {
        id: parseInt(id)
      }
    });
    res.json({ message: 'Shop deleted successfully' });
  } catch (error) {
    console.error('Error deleting shop:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createShop, getAllShops, getShopById, updateShopById, deleteShopById };
