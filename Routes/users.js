const { Router } = require("express");
const userRouter = Router();
const { z } = require("zod");
const bcrypt = require("bcryptjs");
const { userModel } = require("../db");
const jwt= require("jsonwebtoken");
const {jwt_user_password}=require("../config");


userRouter.post('/signup', async (req, res) => {
  // Handle user signup logic here

  // const email=req.body.email;
  // const password=req.body.password;
  // const firstName=req.body.firstName;
  // const lastName=req.body.lastName;
  const UserRegisterSchema = z.object({
    email: z
      .string()
      .min(1, { error: "Email is required" })
      .email({ error: "Invalid email address format" }),
     

    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters long" })
      .max(100, { error: "Password is too long" }),

    firstName: z
      .string()
      .min(1, { error: "First name is required" })
      .max(50, { error: "First name cannot exceed 50 characters" })
      .trim(), // Automatically removes accidental leading/trailing spaces

    lastName: z
      .string()
      .min(1, { error: "Last name is required" })
      .max(50, { error: "Last name cannot exceed 50 characters" })
      .trim(),




  });
  const result = UserRegisterSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: z.flattenError(result.error).fieldErrors,
    });
  }

  const { email, password, firstName, lastName } = result.data;
  const hashpassword = await bcrypt.hash(password, 5);
  await userModel.create({
    email: email,
    password: hashpassword,
    firstname: firstName,
    lastname: lastName,
  })


  res.json('User signed up successfully!');
});



userRouter.post('/user/signin', async (req, res) => {
    const {email, password}= req.body;
    const user= await userModel.findOne({
      email:email,
      password: password

    })
    if (user){
      const token= jwt.sign({
        id: user._id,

      },jwt_user_password);
      res.json({
        token:token
      })
    }
    else{
      res.status(403).json({
        message:"Invelid Credential"
      })
    }
});
userRouter.get('/user/purchases', (req, res) => {

})


module.exports = {
  userRouter: userRouter
}