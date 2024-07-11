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