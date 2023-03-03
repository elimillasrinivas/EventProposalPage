const Proposal = require("../models/Proposal");

const createProposal = async (req, res) => {
        const proposal = new Proposal({ ...req.body });
        proposal.vendorName = req.result.data.vendorName;
        proposal.vendorId = req.result.data._id;
        proposal.vendorEmail = req.result.data.email;
        await proposal.save().then(data => {
            res.status(201).json({
                msg: "Success",
                result: data
            })
        }).catch(err => {
            res.status(400).json({
                msg: "Failure",
                result: err
            })
        })
}

const getProposal = async (req, res) => {
        await Proposal.find({ vendorId: req.result.data._id }).then(data => {
            res.status(200).json({
                msg: "Success",
                result: data,
                vendor:req.result
            }).catch(err=>{
                res.status(200).json({
                    msg:"VendorId not valid",
                    vendor:req.result,
                    result:err
                })
            })
        })
}

const updateProposal = async (req, res) => {
    
        await Proposal.findByIdAndUpdate(req.params.proposalId, req.body).then(data => {
            res.status(200).json({
                msg: "Success",
                result: data
            })
        }).catch(err => {
            res.status(400).json({
                msg: "Failure",
                result: err
            })
        })
  
    }

const deleteProposal = async (req, res) => {
    
        await Proposal.findByIdAndDelete(req.params.proposalId).then(data => {
            res.status(200).json({
                msg: "Success",
                result: data
            })
        }).catch(err => {
            res.status(400).json({
                msg: "Failure",
                result: err
            })
        })
}

const getAllProposal = async (req, res) => {         //only user can access this because he don't have vendorName key in his json objet response from backend
    if (req.result.data.vendorName === undefined) {
        await Proposal.find().then(data => {
            res.status(200).json({
                msg: "Success",
                result: data
            })
        }).catch(err => {
            res.status(400).json({
                msg: "Failure",
                result: err
            })
        })
    } else {
        res.status(400).json({
            msg: "Failure"
        })
    }
}

const getAProposal = (req, res) => {                 //we will use this to get the data of proposal the user selected
    
        Proposal.findById(req.params.proposalId).then(data => {
            res.status(200).json({
                msg: "Success",
                result: data
            })
        }).catch(err => {
            res.status(400).json({
                msg: "Failure",
                result: err
            })
        })
}


module.exports = { createProposal, getProposal, updateProposal, deleteProposal, getAllProposal, getAProposal };