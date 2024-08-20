var express = require('express');
var router = express.Router();
var adminHelper=require("../Helpers/admin-helper")
const userHelper=require('../Helpers/user-helpers')
var jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {
  
  
  const token = req.headers['authorization']
  // console.log(token)
  
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    
   const decoded = jwt.verify(token,process.env.TOKEN_SECRET );
   req.userId = decoded.userId;
   next();
   } catch (error) {
    // console.log(error)
   res.status(401).json({ error: 'Invalid token' });
   }
   };
/* GET home page. */
router.post('/', function(req, res, next) {
  
  adminHelper.adminLogin(req.body).then((response)=>{
 console.log(response)
 if(response.checked){
  token = jwt.sign(
    {
        adminId:req.body.adminId
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "10h" }
);
  res.json({
    adminLoggedIn:true,
    token,
    id:response.id
   })
 }else{
  
  res.json({
    adminLoggedIn:false
   })
 }
  })
  


});
router.get('/stats',verifyToken,function(req, res) {
  
  adminHelper.adminStats().then(data=>{
    // console.log(data)
    res.json(data)
  })
})

router.get("/users",verifyToken,function(req,res){
  
const admin=req.headers['id']
console.log(admin)
adminHelper.getUsers().then((response)=>{
  res.json(response)
})

})

router.post('/edit-user',verifyToken,function(req,res){
  // console.log(req.body)
  adminHelper.editUser(req.body).then((response)=>{
    res.json(response)
  })
})

router.get('/user-transactions',verifyToken,function(req,res){
  
  const userId=req.headers['user']
  const acNo=req.headers['account']
//  console.log(acNo)
  userHelper.getUserTransaction({userId,acNo}).then((transactionsDetails)=>{
    transactionsDetails.map((transaction)=>{
      if(transaction.userId!==userId){
        transaction.transactionDetails.amount=transaction.transactionDetails.amount*-1
        transaction.transactionDetails.type="Deposit"
        transaction.transactionDetails.description=`Recieved from ${transaction.transactionDetails.remitter}`
      }
      return transaction
    })
      
      res.json({transactionsDetails})
  //  console.log(transactionsDetails)
    
   
   

  })
})

module.exports = router;
