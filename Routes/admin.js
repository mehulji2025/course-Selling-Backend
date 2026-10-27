const {Router}= require("express");
const adminRouter= Router();
const { adminModel, courseModel }=require("../db");
const bcrypt = require("bcryptjs");
const { z } = require("zod");
const jwt= require("jsonwebtoken");
const {jwt_admin_password}=require("../config");
const {adminMiddleware}= require("../middleware/admin");


adminRouter.post("/signup", async (req,res)=>{
    const AdminRegisterSchema = z.object({
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
  const result = AdminRegisterSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: z.flattenError(result.error).fieldErrors,
    });
  }

  const { email, password, firstName, lastName } = result.data;
  const hashpassword = await bcrypt.hash(password, 5);
  await adminModel.create({
    email: email,
    password: hashpassword,
    firstname: firstName,
    lastname: lastName,
  })


  res.json('User signed up successfully!');
});

    

adminRouter.post("/signin", async (req,res)=>{
      const {email, password}= req.body;
    const admin= await adminModel.findOne({
      email:email,
      password: password

    })
    if (user){
      const token= jwt.sign({
        id: user._id,

      },jwt_admin_password);
      res.json({
        token:token
      })
    }
    else{
      res.status(403).json({
        message:"Invelid Credential"
      })
    }

})
adminRouter.get("/course/bulk",(req,res)=>{

})
adminRouter.post("/course",adminMiddleware,async (req,res)=>{
    const adminId=req.userId;
    const{title,description, imageURL ,price}=req.body;

    const course=await courseModel.create({
        title,description,price,imageURL,creatorId:adminId
    })

    res.json({
        message:"course created",
        courseID:course._id
    })
})
adminRouter.put("/course",(req,res)=>{

})
module.exports={
    adminRouter:adminRouter
}