const express = require('express');
const app = express();
const { userRouter} = require("./Routes/users");
const { courseRouter } = require("./Routes/course");

app.use("/user",userRouter);
app.use("/course",courseRouter);




