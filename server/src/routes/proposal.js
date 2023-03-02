const express = require("express");
const Proposal = require("../models/Proposal");
const router = express.Router();
const { getAuthenticate } = require("../authentication/authentication");
const { createProposal, getProposal, updateProposal, deleteProposal, getAllProposal, getAProposal } = require("../controllers/Proposal");

router.post("/add", getAuthenticate, createProposal);//post creation
router.get("/info", getAuthenticate, getProposal);//post info on vendor dashboard

router.get("/all", getAuthenticate, getAllProposal);  //to get all proposal datas from backend and displaying it in user mainpage
router.delete("/:proposalId", deleteProposal);//deleting vendor proposal
router.get("/:proposalId", getAuthenticate, getAProposal);//for vendor proposal update and user selection

router.put("/:proposalId", updateProposal);//for updating vendor proposal


module.exports = router;