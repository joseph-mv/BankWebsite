var express = require('express');
var router = express.Router();
var userHelper = require('../Helpers/user-helpers');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { Transaction } = require('mongodb');

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
    // console.log(user)
    if (user.status) {
      res.status(201).json({status:true}); 
     }
     else {
      res.status(201).json({status:false}); 
      }
  })
 
  
  } catch (error) {
      // console.error(error);
      res.status(500).json({ message: 'Internal Server Error' }); // Handle errors appropriately
  }
});

router.post('/login',(req, res) => {
  // console.log(req.body)
  userHelper.login(req.body).then((response) => {
  // console.log(response)
    if(response.status){
      
    
      const token = generateAccessToken({ username: req.body.email });
      
     
      
      res.status(201).json({status:true,token,userId:response.userId});
      
  
     

    }
    else{
      
      // console.log(req.session)
      res.status(201).json({status:false,loggedError:'Invalid Email or Password'});
      
     
    }
  })
});

router.get("/account" ,verifyToken,(req,res)=>{
 
  const userId=req.headers['user']
  
  userHelper.userDetails(userId).then((userDetails)=>{
    
    userHelper.getUserTransaction(userId).then((transactionsDetails)=>{
      
        console.log(userDetails)
     console.log(transactionsDetails)
      res.json({userDetails,transactionsDetails})
     
     
  
    })
    
  })
})

router.post("/deposit",verifyToken,(req,res)=>{
  // console.log(req.body)
  const now = new Date();
  const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();
  transcationDetails={
    date:now.toDateString(),
    time:`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
    id:now,
    amount:req.body.amount,
    type:"Credit",

  }
 
userHelper.deposit(req.body).then(()=>{
  
   userHelper.transcationHistory(transcationDetails,req.body.userId)
})
})

router.post("/withdraw",verifyToken,(req,res)=>{
  const now = new Date();
  const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();
  transcationDetails={
    date:now.toDateString(),
    time:`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
    id:now,
    amount:-(req.body.amount),
    type:"Debit",

  }
 
userHelper.withdraw(req.body).then(()=>{
  userHelper.transcationHistory(transcationDetails,req.body.userId)
})
})

module.exports = router;
