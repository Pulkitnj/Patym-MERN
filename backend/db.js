const express = require("express");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config()

app.use(express.json());

mongoose.connect(process.env.A);

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password : {
        type: String,
        required: true,
        minLength: 6
    },
    firstName : {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName : String
})

const accountSchema = new mongoose.Schema({
    dbUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true

    },
    balance: Number
})

const User = mongoose.model('Users', UserSchema);

const Account = mongoose.model('Account', accountSchema);

/*const user = new User({ 
    username: "Pulkit2809",
    firstName: "Pulkit",
    lastName: "Jain",
    password: "Comeonbaby@69"
}); */

//User.save();

module.exports = {
    User,
    Account
};