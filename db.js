// const { Schema, default: mongoose, model } = require("mongoose");
const mongoose= require("mongoose")
// mongoose.connect("mongodb+srv://mehul7818974007_db_user:bagywi6vw3PNqLSW@cluster0.ucewqlo.mongodb.net/coursera-app");//  for mongoo url 
const Schema= mongoose.Schema;
const ObjectId= mongoose.Types.ObjectId;


const userSchema = Schema({
    email: { type: String, unique: true },
    password: String,
    firstname: String,
    lastname: String,
})
const courseSchema = new Schema({
    title: String,
    description: String,
    imageURL: String,
    price: Number,
    creatorId: String,

})
const adminSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstname: String,
    lastname: String,

})
const purchaseSchema = new Schema({
    userId: String,
    CourseId:String,

})

const userModel = mongoose.model("user", userSchema);
const courseModel = mongoose.model("course", courseSchema);
const adminModel = mongoose.model("admin", adminSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports={
    userModel,
    courseModel,
    adminModel,
    purchaseModel
}