const express = require('express');
const router = express.Router();
const {authenticate} = require("../middleware/Authentication");
const {    getbanner,getUser,
    addBanner,
    activateBanner} = require("../Controllers/Utilities");

/**
 * @swagger
 * {id}:
 *   get:
 *     summary: Get a shop
 *     description: This fetches the shop of the user
 *     tags: [My Shops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: fetch a specific shop
 */
router.get('/banner', getbanner);

router.get('/user',authenticate, getUser);


module.exports = router;



// void _fetchCategoryProducts(Vendors seller)async {
//     print(seller.category);
//       setState(() {
//         isloading = true;
//       });
//       try{
//       SharedPreferences pref = await SharedPreferences.getInstance();
//       String? token = pref.getString('apikey') ?? "token";
//       final response = await http.get(Uri.parse("${AppUrls.production}/category/${seller!.id}"),headers: {'Authorization': 'Bearer $token'});
  
//       switch (response.statusCode) {
//         case 200:
//           products = (json.decode(response.body) as List)
//               .map((data) => Product.fromJson(data))
//               .toList();
//           setState(() {
//             products=products;
//           });
//           break;
//         default:
//       }

//     }catch(e){
//       print(e);
//     }
//       setState(() {
//         isloading = false;
//       });

//   }