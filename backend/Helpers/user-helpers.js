db = require("../config/connection");
const promise = require("promise");
const bcrypt = require("bcrypt");
const collection = require("../config/collection");

const { ObjectId } = require("mongodb");

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
        user.balance = 0;
        user.status="Active"
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
          reject({ status: false });
        }
      } else {
        reject({ status: false });
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
  transaction: ({ amount, userId }) => {
    
    return new promise((resolve, reject) => {
      amount = parseFloat(amount);
      db.get()
        .collection(collection.User_Collection)
        .updateOne({ _id: new ObjectId(userId) }, { $inc: { balance: amount } })
        .then((response) => {
          // console.log(response);
          resolve();
        });
    });
  },
  withdraw: ({ amount, userId }) => {
    return new promise((resolve, reject) => {
      // console.log(amount)
      amount = -parseFloat(amount);
      db.get()
        .collection(collection.User_Collection)
        .updateOne({ _id: new ObjectId(userId) }, { $inc: { balance: amount } })
        .then((response) => {
          // console.log(response)
          resolve();
        });
    });
  },
  sendMoney: ({ amount, account }) => {
  //  console.log(account)
    return new promise(async(resolve, reject) => {
      const recipient= await db.get().collection(collection.User_Collection).findOne({AcNO:parseInt(account)})
      // console.log((recipient))
      if(!recipient){
        console.log('no recipient')
        reject("Invalid Account Number")
      }else{
        console.log('recipient')
        await db.get().collection(collection.User_Collection).updateOne(
          { AcNO: parseInt(account) },
          { $inc: { balance: parseFloat(amount) } }
        );
        resolve()
      }
    })
  },
  // transactionHistory: async (transactionDetails, userId) => {
  //   oldTransactions = await db
  //     .get()
  //     .collection(collection.Transaction_Collection)
  //     .findOne({ userId: userId });

  //   if (oldTransactions) {
  //     db.get()
  //       .collection(collection.Transaction_Collection)
  //       .updateOne(
  //         { userId: userId },
  //         {
  //           $push: { transactionHistory: transactionDetails },
  //         }
  //       );
  //   }

  //   userTransactions = {
  //     userId,
  //     transactionHistory: [transactionDetails],
  //   };
  //   db.get()
  //     .collection(collection.Transaction_Collection)
  //     .insertOne(userTransactions)
  //     .then((res) => { });
  // },
  transactionHistory: async (transactionDetails, userId,recipient=null) => {
 await db.get().collection(collection.Transaction_Collection).insertOne({userId:userId,transactionDetails: transactionDetails,recipient:recipient})
  },
  getUserTransaction: ({userId,acNo}) => {
    // console.log((acNo))
    return new promise((resolve, reject) => {
      db.get()
        .collection(collection.Transaction_Collection)
        .find({"$or": [{userId: userId}, {recipient: acNo.toString()}]}).toArray()
        .then((response) => {
          // console.log(response)
          if(response){
            resolve(response.reverse());
          }else{
            resolve([])
          }
          
        });
    });
  },
  getReceived:(acNo)=>{
    
    return new promise((resolve, reject) => {
      db.get()
       .collection(collection.Transaction_Collection)
       .find({ recipient: acNo.toString() }).toArray()
       .then((response) => {
         
          if(response){
            resolve(response.reverse());
          }else{
            resolve([])
          }
          
        });
    });
  }
};

