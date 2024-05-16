const express = require("express");
const router = express.Router();
const { User,Account } = require("../db");
const authMiddleware = require("../middleware")
const zod = require("zod");
const mongoose = require("mongoose");

router.get("/balance",authMiddleware, async (req,res) => {
    const userId = await Account.findOne({
        dbUser: req.userId
    })
    console.log(userId);
    if(userId){
        return res.status(200).json({
            userId,
            balance: userId.balance 
        })
    }
    return res.status(404).json({
        message: "User Not found"
    })
})


const transferSchema = zod.object({
    to: zod.string(),
    amount: zod.number()
})
router.post("/transfer",authMiddleware, async (req,res) => {
    const session = await mongoose.startSession(); //To start session
    session.startTransaction();
    const body = req.body;
    const {success} = transferSchema.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            message: "Invalid Schema"
        })
    }
    const account = await Account.findOne({
        dbUser : req.userId
    })
    if(account.balance < body.amount){
        return res.status(404).json({
            message: "Insufficient Balance"
        })
    }

    const transferAccount = await Account.findOne({
        dbUser : body.to
    })
    if(!transferAccount){
        res.status(400).json({
            msg: "Invalid Account"
        })
    }

    await Account.updateOne({
        dbUser : req.userId
    },{
        $inc: {
            balance: -body.amount
        }
    })
    await Account.updateOne({
        dbUser : body.to
    },  {
        $inc : {
            balance: body.amount
        }
    }) 

    // Commit the transaction
    await session.commitTransaction();

    return res.status(200).json({
        message: "Transfer successful"
    });
    
})

module.exports = router;