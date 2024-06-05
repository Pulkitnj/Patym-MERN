const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User, Account } = require("../db");
const bodyParser = require("body-parser");
const authMiddleware = require("../middleware");
const bcrypt = require("bcrypt");

/*Basic Flow Of all Routes -
Get all data from body ex - const {email,password} = req.body
Check validation that all data isvalid
check if user already exist
For Signup - Encrypt the password and Perform operation on user
For Signin - Decrypt the password and Use cookies to store token
Generate token for user and store it. - ALWAYS USE STATUS CODES, Don't send password
*/

const signupSchema = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

//Use Post for Form or private data
router.post("/signup", async (req, res) => {
  const body = req.body;
  console.log(body);
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: body.username,
  });

  if (user) {
    return res.json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const ecrypass = await bcrypt.hash(body.password, 10);

  const dbUser = await User.create({
    username: body.username,
    firstName: body.firstName,
    lastName: body.lastName,
    password: ecrypass,
  });

  const amount = await Account.create({
    dbUser,
    username: body.username,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SECRET
  );
  dbUser.password = undefined; //I am not sending password
  res.status(201).json({
    message: "User created successfully",
    token: token,
    dbUser,
  });
});

//For Signin

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    res.json({
      message: "Not Valid Input",
    });
  }
  const existUser = await User.find({
    username: body.username,
  });

  if (
    existUser &&
    (await bcrypt.compare(body.password, existUser[0].password))
  ) {
    const token = req.user;
    return res.json({
      message: "User Found",
      token: token,
    });
  } else {
    return res.json({
      message: "User not found! Please Signup first.",
    });
  }
});

//Update User

const updateUser = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = updateUser.safeParse(req.body);
  if (!success) {
    res.json({
      message: "Not Valid Input",
    });
  }
  console.log(req.body);

  try {
    const user = await User.updateOne(
      {
        _id: req.userId,
      },
      body
    );
    if (!user) {
      return res.json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      message: "User updated successfully",
    });
  } catch (e) {
    console.log("Error in updating user", e);
  }
});

router.get("/bulk", authMiddleware, async (req, res) => {
  console.log(req.query);
  const quert = req.query;
  console.log(quert);
  if (!quert) {
    try {
        const allUsers = User.findAll();
        console.log(allUsers);
        return res.status(200).send({"message":"All User got sucessfully"})
    } catch (error) {
        console.error(error);
        return res.status(500).send({
          message: "Internal Server Error",
        });
    }
  } else {
    try {
      console.log(quert);
      const user = await User.find({
        $or: [
          {
            firstName: {
              $regex: quert,
            },
          },
          {
            lastName: {
              $regex: quert,
            },
          },
        ],
      });

      if (!user || user.length === 0) {
        return res.status(404).send({
          message: "User not found",
        });
      }

      return res.status(200).send({
        user,
        message: "User retrieved successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: "Internal Server Error",
      });
    }
  }
});

module.exports = router;
