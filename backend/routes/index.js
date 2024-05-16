const express = require("express");
const app = express();
const userRouter = require("./user");
const accountRouter = require("./account")

const router = express.Router();

router.use('/user', userRouter);
router.use('/account', accountRouter);

module.exports = router;  //api/v1/User , /api/v1/payment ....

app.get("/api/v1", (req,res) => {
    res.send("Hello");
});