const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const crypto = require('crypto');


const PlaceOrder = async (req, res) => {
    const { phone, email, name, product } = req.body;
    console.log("PlaceOrder");
    console.log(req.body);
    const orderId = crypto.randomBytes(16).toString('hex');

  
    try {
      for(const product  of req.body.product){

        const order_details = await prisma.OrderDetails.create({
          data:{
          prodId: product.id,
          orderId: product.id,
          productId: product.id,
          quantity: product.quantity,
          price: product.price,
          productName: product.productName,
          shopId:product.shopId,
          orderHash:orderId,
          img:product.image,
        }
        });

      }

      const order = await prisma.Order.create({
        data: {
          orderHash: orderId,
          email: email,
          isProcessing:true,
          orderHash: orderId,
          Name:name,
          PhoneNumber:phone,

        },
      });
  
      return res.status(200).json({ message: "Order Placed Successfully" });
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const allOrders = async (req, res) => {
    const userId = req.body.user_id;
    try {
      const shop = await prisma.Shop.findFirst({
        where: {
          loginId: parseInt(userId)
        }
      });
  
      if (!shop) {
        return res.status(404).json({ error: 'Shop not found' });
      }
  
      const products = await prisma.OrderDetails.findMany({
        where: {
          shopId: shop.id,
          orderStatus: false
        }
      });
  
      const orderhashes = products.map(product => product.orderHash);
  
      const pendingOrders = await prisma.Order.findMany({
        where: {
          isDelivered:false,
          orderHash: {
            in: orderhashes
          }
        },
        include:{
          order:true
        }
      });

      return res.status(200).json(pendingOrders);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

const allOrderDetails = async (req, res) => {
  console.log("allOrderDetails");
    const hash = req.params.hash;
    const user_id = req.body.user_id;
    console.log(hash);
    console.log(user_id);
    try {
      const shop = await prisma.Shop.findFirst({
        where:{
          loginId:parseInt(user_id)
        }
      })
      const hashcode = await prisma.OrderDetails.findMany({
        where:{
          orderHash:hash,
          shopId:shop.id,
          orderStatus:false
        }
      })
   
      return res.status(200).json(hashcode)
    }catch(e){
      console.log(e.message);
      return res.status(500).json({ error: 'Internal Server Error' });  
    }
}

const completeOrder=async(req,res)=>{

  try{
    const { ids } = req.body;

    const updatePromises = ids.map(id =>
      prisma.OrderDetails.update({
        where: { id },
        data: { orderStatus: true },
      })
    );

    const getmainorder = await prisma.OrderDetails.findFirst({
      where:{
        id:ids[0]
      }
    })

    await Promise.all(updatePromises);
    
    return res.status(200).json({message:"Order Completed Successfully"});

  }catch(e){
    console.log(e.message);
    return res.status(500).json({ error: 'Internal Server Error' });  
  }

}

module.exports = {
    PlaceOrder,
    allOrders,
    allOrderDetails,
    completeOrder
}