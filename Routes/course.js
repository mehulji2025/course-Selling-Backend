// const express= require("express")
// const Router=express.Router; below line is same as these two lines
const {Router}=require("express");

const courseRouter= Router();


app.post('/course/purchase', (req, res) => {

})


app.get('/course/preview', (req, res) => {

})

module.exports={
    courseRouter:courseRouter
}
