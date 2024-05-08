var express = require('express');
var router = express.Router();
var userHelper = require('../Helpers/user-helpers');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

function verifyToken(req, res, next) {
  
  const token = req.headers['authorization']

  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    console.log(token);
   const decoded = jwt.verify(token,process.env.TOKEN_SECRET );
   req.userId = decoded.userId;
   next();
   } catch (error) {
   res.status(401).json({ error: 'Invalid token' });
   }
   };





router.post('/register', async (req, res) => {

  
  try {
  userHelper.register(req.body).then((user) => {
    console.log(user)
    if (user.status) {
      res.status(201).json({status:true}); 
     }
     else {
      res.status(201).json({status:false}); 
      }
  })
 
  
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' }); // Handle errors appropriately
  }
});

router.post('/login',(req, res) => {
  // console.log(req.body)
  userHelper.login(req.body).then((response) => {
  // console.log(response)
    if(response.status){
      
    
      const token = generateAccessToken({ username: req.body.email });
      
      
      res.status(201).json({status:true,token});
      console.log(token)
  
     

    }
    else{
      
      // console.log(req.session)
      res.status(201).json({status:false,loggedError:'Invalid Email or Password'});
      
     
    }
  })
});

router.get("/account" ,verifyToken,(req,res)=>{
  console.log("hii")
})

module.exports = router;
