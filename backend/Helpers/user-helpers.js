db = require("../config/connection");
const promise = require("promise");
const bcrypt = require("bcrypt");
const collection = require("../config/collection");
const { response } = require("express");
const { ObjectId, Transaction } = require("mongodb");
const { resolve } = require("path");

module.exports = {
  register: (user) => {
    return new promise(async (resolve, reject) => {
      oldUser = await db
        .get()
        .collection(collection.User_Collection)
        .findOne({ email: user.email });
      if (oldUser) {
        // console.log('already user')
        resolve({ status: false });
      } else {
        usersCheck = await db
          .get()
          .collection(collection.User_Collection)
          .findOne();

        // console.log(usersCheck)
        if (usersCheck === null) {
          Ac_No = 1234567890;
          db.get()
            .collection(collection.AccountNo_Collection)
            .insertOne({ Ac_No });
        } else {
          await db
            .get()
            .collection(collection.AccountNo_Collection)
            .updateOne({}, { $inc: { Ac_No: 1 } });
          data = await db
            .get()
            .collection(collection.AccountNo_Collection)
            .findOne();
          Ac_No = data.Ac_No;
        }
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
        user.AcNO = Ac_No;
        user.balance=0
        db.get()
          .collection(collection.User_Collection)
          .insertOne(user)
          .then((data) => {
            resolve({ data, status: true });
          });
      }
    });
  },

  login: (user) => {
    return new promise(async (resolve, reject) => {
      existingUser = await db
        .get()
        .collection(collection.User_Collection)
        .findOne({ email: user.email });
      if (existingUser) {
        if (await bcrypt.compare(user.password, existingUser.password)) {
          // console.log('user logedin')
          // console.log(existingUser)
          resolve({
            status: true,
            userName: existingUser.name,
            userId: existingUser._id,
          });
        } else {
          resolve({ status: false });
        }
      } else {
        resolve({ status: false });
      }
    });
  },
  userDetails: (userId) => {
    return new promise(async (resolve, reject) => {
      db.get()
        .collection(collection.User_Collection)
        .findOne({ _id: new ObjectId(userId) })
        .then((response) => {
          resolve(response);
        });
    });

  },
  deposit:({amount,userId})=>{
   return new promise((resolve,reject)=>{
    // console.log(amount)
    amount=parseFloat(amount)
    db.get().collection(collection.User_Collection).updateOne({_id: new ObjectId(userId)},{$inc:{balance:amount}}).then((response)=>{
        console.log(response)
        resolve()
    })
   })
  },
  withdraw:({amount,userId})=>{
   return new promise((resolve,reject)=>{
    // console.log(amount)
    amount=-(parseFloat(amount))
    db.get().collection(collection.User_Collection).updateOne({_id: new ObjectId(userId)},{$inc:{balance:amount}}).then((response)=>{
        // console.log(response)
        resolve()
    })
   })
  },
  transcationHistory:async(transcationDetails,userId)=>{

    oldTransactions=await db.get().collection(collection.Transaction_Collection).findOne({userId:userId})

    if(oldTransactions){
        db.get().collection(collection.Transaction_Collection).updateOne({userId:userId},{
            $push:{transcationHistory:transcationDetails}
        })
    }
    
    userTransactions={
        userId,
        transcationHistory:[transcationDetails]
    }
    db.get().collection(collection.Transaction_Collection).insertOne(userTransactions).then((res)=>{
        
    })

  },
  getUserTransaction:(userId)=>{
    return new promise((resolve,reject)=>{
        db.get().collection(collection.Transaction_Collection).findOne({userId:userId}).then((response)=>{
            
            resolve(response.transcationHistory)
        })
    })
  }

};
