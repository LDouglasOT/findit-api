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
    let count = req.params.count;
    count = parseInt(count);
    try{
        const category = await prisma.products.findMany({
            skip:count,
            where:{
                categoryId:parseInt(id),
                isProduct:true
            }
        });
        if(category.length < 20){
          count = 0;  
        }else{
            count = count + 20;
        }

        res.status(200).json({"category":category,"count":count});
    }catch(e){
        console.error('Error fetching category:', e);
        res.status(500).json({error:'Internal Server Error'});
    }

}


const categoryProducts=async(req,res)=>{    
    const category = req.params.category;   
    console.log(category);
    try{

        const products = await prisma.products.findMany({
            where:{
                category:category,
                isProduct:true
            }
        });
        return res.status(200).json(products);

    }catch(e){
        console.error('Error fetching category:', e);
        res.status(500).json({error:'Internal Server Error'});
    
    }
}

module.exports = {
    categories,getcategoriesbyId,categoryProducts
}