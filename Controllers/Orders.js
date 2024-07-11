const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const PlaceOrder = async (req, res) => {
    const { phone, email, name, product } = req.body;
    console.log("PlaceOrder");
    console.log(req.body);
  
    const productsByShopId = product.reduce((acc, prod) => {
      if (!acc[prod.shopId]) {
        acc[prod.shopId] = [];
      }
      acc[prod.shopId].push(prod);
      return acc;
    }, {});
  
    try {

      for (const [shopId, products] of Object.entries(productsByShopId)) {
        const order = await prisma.order.create({
          data: {
            shop: {
              connect: { id: parseInt(shopId) }
            },
            order: {
              create: products.map(prod => ({
                productName: prod.productName,
                discount: prod.discount,
                price: prod.price,
                quantity: prod.quantity,
                size: prod.size,
                color: prod.color,
                description: prod.description,
                image: prod.image,
                isProduct:false,
                shop: {
                  connect: { id: prod.shopId }
                }
              }))
            }
          }
        });
  
        console.log(`Order created for shopId ${shopId} with id ${order.id}`);
      }
  
      return res.status(200).json({ message: "Order Placed Successfully" });
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = {
    PlaceOrder
}