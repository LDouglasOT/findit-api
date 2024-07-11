const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
var serviceAccount = require("./serviceAccountKey.json");
var admin = require("firebase-admin");
const { bucket } = require("./Products")


const createShop = async (req, res) => {
  try {
    const file = req.files;
    // return res.status(200).end();
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
    let imageArray = [];
    for (const singlefile of file) {
      const fileName = `${Date.now()}-${singlefile.originalname}`;

      // Upload the file to Firebase Storage
      const fileRef = bucket.file(fileName);
      await fileRef.createWriteStream().end(singlefile.buffer);
      // Get the download URL of the uploaded file
      const imageUrl = await fileRef.getSignedUrl({
        action: 'read',
        expires: '01-01-2099', // Adjust the expiration date as needed
      });
      imageArray.push(imageUrl[0]);
    }

    const user = await prisma.login.findMany({})
    const shop = await prisma.shop.create({
      data: {
        shopName:req.body.ShopName,
        profile:imageArray[0],
        subscription:req.body.ShopName,
        latitude:parseFloat(req.body.Latitude),
        longitude:parseFloat(req.body.Longitude),
        level:req.body.level,
        Phonenumber:req.body.Phonenumber,
        location:req.body.Location,
        loginId: user[0].id
      }
    });
    console.log(shop)
    return res.status(200).json(shop);

  } catch (error) {
    console.error('Error creating shop:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




const getAllShops = async (req, res) => {
  try {
    const shops = await prisma.shop.findMany({
      include: {
        products: true
      }
    });
    const allshops = []
    for (const shop of shops) {
      shop.products = shop.products.filter(product => product.isProduct === true);
      allshops.push(shop)

    }
    
    return res.status(200).json([allshops[0]]);

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
    const { shopName, profile, subscription } = req.body;
    const updatedShop = await prisma.shop.update({
      where: {
        id: parseInt(id)
      },
      data: {
        shopName:shopName,
        profile:profile,
        subscription:subscription,
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

const getTrendingShops= async (req, res) => {
  try {
    const shops = await prisma.Shop.findMany({
      include: {
        products: true
      }
    });
    const allshops = []
    for (const shop of shops) {
      shop.products = shop.products.filter(product => product.isProduct === true);
      allshops.push(shop)

    }
    
    return res.status(200).json([allshops[0]]);

  } catch (error) {
    console.error('Error fetching shops:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }


}

const myShop = async (req, res) => { 
  try {
    console.log(req.body)
    console.log("hit this route")
    if(req.body.user_id){
      const shops = await prisma.shop.findMany({
        where: {
          loginId: parseInt(req.body.user_id)
        },
        include: {
          products: true
        }
      });
      console.log(shops)
  const allshops = []
      for (const shop of shops) {
        shop.products = shop.products.filter(product => product.isProduct === true);
        allshops.push(shop)

      }
      
      return res.status(200).json([allshops[0]]);

    }else{

      return res.status(403).end();
    }
  
  } catch (error) {
    console.error('Error fetching shops:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


const searchVendorProducts = async (req, res) => {
  const { query,vendor } = req.params;
  console.log(req.params)
  try {
    const products = await prisma.products.findMany({
      where: {
        shopId: parseInt(vendor),
        productName: {
          contains: query
        },
        isProduct:true
      },
    });
    console.log(products)
    res.status(200).json(products);
  }catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}

const FetchShop = async (req, res) => { 
  console.log("hit the shops route")
  try {

    const shops = await prisma.Shop.findMany({
      where: {
        id: parseInt(req.params.id)
      },
      include: {
        products: true
      }
    });
    console.log("Thie is is the shop we are looking for")
    console.log(shops)
    return res.status(200).json([shops[0]]);
  } catch (error) {
    console.error('Error fetching shops:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = { createShop, getAllShops, getShopById, updateShopById, deleteShopById,getTrendingShops,myShop,searchVendorProducts,FetchShop };
