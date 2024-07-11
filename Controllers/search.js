const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function searchProducts(req,res) {
  const { query } = req.body;
  try{
    const products = await prisma.Products.findMany({
        where: {
          isProduct:true,
          OR: [
            {
              productName: {
                contains: query,
              },
             
            },
            {
              description: {
                  contains: query,
              },
            },
          ],
        },
        include: {
          shop: true,
        },
    });
    console.log(products)
      setTimeout(()=>{
        res.status(200).json(products);
      },1000)
    return

  }catch(e){
    console.log(e.message)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getPopularProducts (req,res) {
    try{

        const products = await prisma.Products.findMany({
          where:{
            isProduct:true,
          },
          include:{
            reviews:true,
          }
        });


          res.status(200).json(products);
        return 
    }catch{
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getReviews(req,res) {
try{
  const { id } = req.params;
  console.log(id)
  console.log("getReviews")
  const reviews = await prisma.Reviews.findMany({
    where: {
      reviewId: parseInt(id),
    },
  });
  console.log(reviews.length)
  console.log(reviews)
  res.status(200).json(reviews);
}catch(e){
  console.log("getReviews")
  console.log(e.message)
return res.status(500).json({ error: 'Internal Server Error' });
}

}

async function CreateReview(req,res) {
console.log(req.body)
try{
 const review = await prisma.Reviews.create({
   data: {
     review: req.body.review,
     rating: req.body.rating,
     userId: req.body.productId,
     username: req.body.user,
     reviewId:req.body.productId
   },
 });

}catch(e){
  console.log(e.message)
  return res.status(500).json({ error: 'Internal Server Error' });
}

}



module.exports = {searchProducts,getPopularProducts,getReviews,CreateReview}