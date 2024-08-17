var express = require('express');
var router = express.Router();
var userHelper = require('../Helpers/user-helpers');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { resolve } = require('promise');


// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '18000s' });
}

function verifyToken(req, res, next) {
  
  
  const token = req.headers['authorization']
  
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    
   const decoded = jwt.verify(token,process.env.TOKEN_SECRET );
  //  req.userId = decoded.userId;
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
    
      res.status(201).json({status:true,token,userId:response.userId,userName:response.userName});
  
    }
    
  }).catch((error)=>{
    // console.log(error)
    res.status(201).json({status:false,loggedError:'Invalid Email or Password'});
  
  })
});

router.get("/account" ,verifyToken,(req,res)=>{
 
  const userId=req.headers['user']
  
  userHelper.userDetails(userId).then((userDetails)=>{
    // console.log((userDetails))
    userHelper.getUserTransaction({userId,acNo:userDetails.AcNO}).then((transactionsDetails)=>{
      transactionsDetails.map((transaction)=>{
        if(transaction.userId!==userId){
          transaction.transactionDetails.amount=transaction.transactionDetails.amount*-1
          transaction.transactionDetails.type="Deposit"
          transaction.transactionDetails.description=`Recieved from ${transaction.transactionDetails.remitter}`
        }
        return transaction
      })
        
        res.json({userDetails,transactionsDetails})
    //  console.log(transactionsDetails)
      
     
     
  
    })
    
  })
})

router.post("/deposit",verifyToken,(req,res)=>{
  // console.log(req.body)
  const now = new Date();
  const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();
  transactionDetails={
    date:now.toDateString(),
    time:`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
    amount:req.body.amount,
    type:req.body.description,
    description:'Deposit'
  }
 
userHelper.transaction(req.body).then(()=>{
  
   userHelper.transactionHistory(transactionDetails,req.body.userId)
})
})

router.post("/withdraw",verifyToken,(req,res)=>{
  const now = new Date();
  const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();
  transactionDetails={
    date:now.toDateString(),
    time:`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
    amount:-(req.body.amount),
    type:"Debit",
    description:'Withdraw'

  }
//  console.log(transactionDetails)
userHelper.transaction({userId:req.body.userId,amount:transactionDetails.amount}).then(()=>{
  userHelper.transactionHistory(transactionDetails,req.body.userId)
})
})

router.post("/sendMoney", verifyToken, (req, res) => {
  // console.log(req.body)
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const transactionDetails = {
    date: now.toDateString(),
    time: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
    amount: -(req.body.amount),
    type: "Debit",
    description: "Send Money to " + req.body.account,
    remitter: req.body.remitter
  };

  userHelper.transaction({userId:req.body.userId,amount:transactionDetails.amount}).then(() => {
    // console.log(req.body)
    userHelper.sendMoney(req.body).then(()=>{
      userHelper.transactionHistory(transactionDetails,req.body.userId,req.body.account).then(()=>{
        console.log('Money sent to ' )
         res.send("Money sent successfully")
 
       })
    }
      
    
).catch(err=>{
      
      userHelper.transaction({userId:req.body.userId,amount:req.body.amount}).then(()=>{
        console.log(err)
        res.send(err)
      })


    })
    // userHelper.transactionHistory(transactionDetails, req.body.userId)
    //   .then(() => res.status(200).send("Money sent successfully"))
    //   .catch(err => res.status(500).send("Transaction history update failed"));
  }).catch(err =>{
    // console.log((err))
    res.status(500).send("Money transfer failed")});
});

router.post("/payBill", verifyToken, (req, res) => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const transactionDetails = {
    date: now.toDateString(),
    time: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
    amount: -req.body.amount,
    type: "Debit",
    description: "Pay Bill to " + req.body.payee,
  };

  userHelper.transaction({userId:req.body.userId,amount:transactionDetails.amount}).then(() => {
    userHelper.transactionHistory(transactionDetails, req.body.userId)
      .then(() => res.status(200).send("Bill paid successfully"))
      .catch(err => res.status(500).send("Transaction history update failed"));
  }).catch(err => res.status(500).send("Bill payment failed"));
});

router.post("/recharge", verifyToken, (req, res) => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const transactionDetails = {
    date: now.toDateString(),
    time: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
    amount: -req.body.amount,
    type: "Debit",
    description: "Recharge for " + req.body.mobile,
  };

  userHelper.transaction({userId:req.body.userId,amount:transactionDetails.amount}).then(() => {
    userHelper.transactionHistory(transactionDetails, req.body.userId)
      .then(() => res.status(200).send("Recharge successful"))
      .catch(err => res.status(500).send("Transaction history update failed"));
  }).catch(err => res.status(500).send("Recharge failed"));
});

router.post("/invest", verifyToken, (req, res) => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const transactionDetails = {
    date: now.toDateString(),
    time: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
    amount: -req.body.amount,
    type: "Debit",
    description: "Investment in " + req.body.plan,
  };

  userHelper.transaction({userId:req.body.userId,amount:transactionDetails.amount}).then(() => {
    userHelper.transactionHistory(transactionDetails, req.body.userId)
      .then(() => res.status(200).send("Investment successful"))
      .catch(err => res.status(500).send("Transaction history update failed"));
  }).catch(err => res.status(500).send("Investment failed"));
});





module.exports = router;
