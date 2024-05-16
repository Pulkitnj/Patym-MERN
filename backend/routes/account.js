const express = require("express");
const router = express.Router();
const { User,Account } = require("../db");
const authMiddleware = require("../middleware")

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
    const body = req.body;
    const {sucess} = transferSchema.safeParse(req.body);
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

    const updated = await Account.updateMany({
        
    })
    
})

module.exports = router;