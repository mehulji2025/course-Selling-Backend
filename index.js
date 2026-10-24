const express = require('express');
const app = express();

app.post('/user/signup', (req, res) => {
    // Handle user signup logic here
    res.send('User signed up successfully!');
});
app.post('/user/login', (req, res) => {

});

app.post('/course/purchase', (req, res) => {

})

app.get('/user/purchases', (req, res) => {

})
app.get('/courses', (req, res) => {

})