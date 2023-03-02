const express = require("express");
const { getAuthenticate } = require("../authentication/authentication");

const router = express.Router();
const { registerUser, loginUser, logoutUser, getUserInfo, updateSelection} = require("../controllers/User");

router.post("/register", registerUser); //for registration
router.put("/:userId", updateSelection) //to add new eventproposal in selected container of user mainpage
router.get("/info", getAuthenticate, getUserInfo);   //to get user info to display it where ever required
router.post("/login", loginUser);   //to login a valid user and generate cookie containing jwt token
router.get("/logout", logoutUser);  //to logout a user by forcefully expiring cookie and removing the cookie

module.exports = router;
