const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function searchProducts(req,res) {
  const { query } = req.body;
  try{

    const products = await prisma.products.findMany({
        where: {
          OR: [
            {
              productName: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              shop: {
                shopName: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            },
          ],
        },
        include: {
          shop: true,
        },
    });
      
    return res.status(200).json(products);

  }catch{
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getPopularProducts (req,res) {
    try{
        console.log("getPopularProducts")
        const products = await prisma.Products.findMany({});
        console.log("getPopularProducts finals")
        console.log(products);
        return res.status(200).json(products);
    }catch{
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {searchProducts,getPopularProducts}