const { Router } = require("express");
const userRouter = Router();

app.post('/user/signup', (req, res) => {
  // Handle user signup logic here
  res.send('User signed up successfully!');
});
app.get('/user/purchases', (req, res) => {

})
app.post('/user/login', (req, res) => {

});

module.exports = {
  userRouter: userRouter
}