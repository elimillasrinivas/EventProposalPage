const express = require("express");
const router = express.Router();
const { registerVendor, loginVendor, logoutVendor, getVendorInfo } = require("../controllers/Vendor");

router.post("/register", registerVendor);//registration
router.post("/login", loginVendor);//login
router.get("/logout", logoutVendor);//logout
router.get("/info", getVendorInfo)//vendorInfo

module.exports = router;