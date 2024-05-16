const express = require("express");
const app = express();
const mainRouter = require('./routes/index');
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json()); // -> For All to understand JSON passed by middleware
//Send all requests of /api/vi to router of routes/index.js
app.use('/api/v1', mainRouter);

//api/v1/signup , api/v1/changePassword ....
//api/v1/account/balance , api/v1/account/transfer .... 

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});


