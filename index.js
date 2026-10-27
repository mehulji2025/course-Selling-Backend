const express = require("express");
const mongoose= require("mongoose");
const app = express();
const { userRouter} = require("./Routes/users");
const { courseRouter } = require("./Routes/course");
const { adminRouter } =  require("./Routes/admin");
app.use(express.json());


app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/admin",adminRouter);


async function main(){
await mongoose.connect("mongodb+srv://mehul7818974007_db_user:bagywi6vw3PNqLSW@cluster0.ucewqlo.mongodb.net/coursera-app");//  for mongoo url 
app.listen(3000);
console.log("start listing");
}
main();






