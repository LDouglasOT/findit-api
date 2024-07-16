const { PrismaClient } = require('@prisma/client');
var serviceAccount = require("./serviceAccountKey.json");
var admin = require("firebase-admin");


const prisma = new PrismaClient();
const firebaseConfig = {
  apiKey: "AIzaSyDZ0Dc5HQXCkrwfmJuoZcrSAVT_vcE_Bi0",
  authDomain: "flirtify-616c0.firebaseapp.com",
  projectId: "flirtify-616c0",
  storageBucket: "flirtify-616c0.appspot.com",
  messagingSenderId: "305402540915",
  appId: "1:305402540915:web:a2ea8b773d478e5cd90b06",
  measurementId: "G-G2C9KGD4XV"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  ...firebaseConfig
});
const bucket = admin.storage().bucket();

const updateproduct = async (req, res) => {
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
    if(imageArray.length > 0){
      const update = await prisma.Products.update({
        where:{
          id:parseInt(req.body.id),
          isProduct:true 
        },
        data:{
          "productName":req.body.productName,
          "price":parseFloat(req.body.price),
          "quantity":parseInt(req.body.quantity),
          "description":req.body.description,
          "image":imageArray[0],
          "images":imageArray
        }
      })    
    }else{
      const update = await prisma.Products.update({
        where:{
          id:parseInt(req.body.id),
          isProduct:true 
        },
        data:{
          "productName":req.body.productName,
          "price":parseFloat(req.body.price),
          "quantity":parseInt(req.body.quantity),
          "description":req.body.description,
        }
      })  
    }
 


return res.status(200).end()

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error uploading image.');
  }
}

const createProducts = async (req, res) => {
  try {
    const { ProductsName, price, description, shopId, quantity, size, color, image} = req.body;

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
        images:imageArray
      }
    });
    return res.json(Products);

  } catch (error) {

    return res.status(500).json({ error: 'Internal Server Error' });

  }
};

const getAllProducts = async (req, res) => {
  try {

    const Products = await prisma.Products.findMany({
      where:{
        isProduct:true
      }
    });
    console.log(Products)
    return res.json(Products);

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
        id: parseInt(id),
        isProduct:true 
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
    const category = await prisma.Category.findFirst({
      where:{
        "name":req.body.category
      }
    })

    const updatedProducts = await prisma.Products.update({
      where: {
        id: parseInt(id),
        isProduct:true 
      },
      data: {
        productName:ProductsName,
        price:price,
        shopId:shopId,
        quantity:quantity,
        size:size,
        color:color,
        description:description,
        image:imageArray[0],
        images:imageArray
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
        id: parseInt(id),
        isProduct:true  
      }
    });
    res.json({ message: 'Products deleted successfully' });
  } catch (error) {
    console.error('Error deleting Products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const addproduct = async (req, res) => {
  try {
    console.log(req.body)
    const file = req.files;
    const userId = req.body.user_id;

    const shop = await prisma.Shop.findFirst({
      where: {
        loginId: parseInt(userId)
      }
    });

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
    const category = await prisma.Category.findFirst({
      where:{
        "name":req.body.category
      }
    })

    await prisma.Products.create({
      data:{
        "productName":req.body.productName,
        "price":parseFloat(req.body.price),
        "quantity":parseInt(req.body.quantity),
        "description":req.body.description,
        "shopId":shop.id,
        "categoryId":category.id,
        "image":imageArray[0],
        "images":imageArray
      }
    })    
  return res.status(200).end()

  } catch (error) {
    console.log(error.message)
    res.status(500).send('Error uploading image.');
  }
}

module.exports = { createProducts, getAllProducts, getProductsById, updateProductsById, deleteProductsById,updateproduct,bucket,addproduct };
