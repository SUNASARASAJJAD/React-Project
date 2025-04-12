const express = require("express")
const router = express.Router()
const shippingAddressRoute = require('../../controllers/customer/ShippingAddress');

router.route("/add-shipping-address").post(shippingAddressRoute.addShippingAddress);

module.exports = router;