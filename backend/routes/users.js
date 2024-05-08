var express = require('express');
var router = express.Router();
var userHelper = require('../Helpers/user-helpers');

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, 'your_secret_key', (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }



router.post('/register', async (req, res) => {

  const { name, address, mobileNumber, email, password } = req.body;
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
  console.log(req.body)
  userHelper.login(req.body).then((response) => {
  console.log(response)
    if(response.status){
      req.session.userName=response.userName
      req.session.userLoggedIn=true
      req.session.userId=response.userId
   
      res.status(201).json({status:true});


    }
    else{
      req.session.loggedError='Invalid Email or Password'
      // console.log(req.session)
      res.status(201).json({status:false,loggedError:req.session.loggedError});
      
     
    }
  })
})

module.exports = router;
