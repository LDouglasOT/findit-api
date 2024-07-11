const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const categories=async(req,res)=>{

    try{

        const categories = await prisma.Category.findMany({});
        res.status(200).json(categories);

    }catch(e){
        res.status(500).json({error:'Internal Server Error'});
    }

}

const getcategoriesbyId=async(req,res)=>{
    const id = req.params.id;
    try{
        const category = await prisma.products.findMany({
            where:{
                categoryId:parseInt(id),
                isProduct:true
            }
        });
        res.status(200).json(category);
    }catch(e){
        console.error('Error fetching category:', e);
        res.status(500).json({error:'Internal Server Error'});
    }

}

module.exports = {
    categories,getcategoriesbyId
}