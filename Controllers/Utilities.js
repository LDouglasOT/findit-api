const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getbanner = async (req, res) => {
    console.log(req.body)
    console.log("Fertching banner")
    try{
        const banners = await prisma.Banner.findFirst({
            where:{
                isActive:true
            }
        });

        return res.status(200).json(banners);
    }catch(Error){
        console.log(Error.message)
        return res.status(500).json({ error: 'Internal Server Error' });    
    }


}

const addBanner = async (req, res) => {

}

const activateBanner = async (req, res) => {   

}

const getUser = async (req, res) => {
   try{
    if(req.body.user_id){
    const user = await prisma.Login.findMany({
        where:{
            id: req.body.user_id
        }
    });
    console.log(user)
    return res.status(200).json([user]);
}else{
    console.log("no user")
    res.status(400).end()
}
   }catch(errr){
    return res.status(500).json({ error: 'Internal Server  ' });
   }
}

module.exports = {
    getbanner,
    addBanner,
    getUser,
    activateBanner
}