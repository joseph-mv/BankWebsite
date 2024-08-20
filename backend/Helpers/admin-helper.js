const collection = require("../config/collection");
const db = require("../config/connection");

const promise = require("promise");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const { response } = require("express");

module.exports = {
  adminLogin: ({ adminId, password }) => {
    return new promise(async (resolve, reject) => {
      admin = await db
        .get()
        .collection(collection.Admin_Collection)
        .findOne({ adminId: adminId });

      if (admin) {
        bcrypt.compare(password, admin.password).then((checked) => {
          resolve({ checked, id: admin._id });
        });
      } else {
        resolve({ error: "no admin" });
      }
    });
  },
  adminStats: () => {
    return new promise(async (resolve, reject) => {
      try {
        // Total number of users
        const User = db.get().collection(collection.User_Collection);
        const totalUsers = await User.countDocuments();

        const totalBalance = await User.aggregate([
          {
            $group: {
              _id: null,
              totalBalance: {
                $sum: "$balance",
              },
            },
          },
        ]).toArray();
        console.log(totalBalance[0]);

        // New users this month
        const startOfMonth = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        );
        const newUsersThisMonth = await User.countDocuments({
          createdAt: { $gte: startOfMonth },
        });
        // console.log(newUsersThisMonth)
        totalTransactions = await db
          .get()
          .collection(collection.Transaction_Collection)
          .countDocuments();

        const transactionsPerDay = await db
          .get()
          .collection(collection.Transaction_Collection)
          .aggregate([
            {
              $group: {
                _id: "$transactionDetails.date",
                totalTransactions: {
                  $sum: 1,
                },
                totalAmount: {
                  $sum: {
                    $abs: "$transactionDetails.amount",
                  },
                },
              },
            },
          ])
          .toArray();
        // console.log((transactionsPerDay))
        transactionsPerDay.sort((a, b) => new Date(a._id) - new Date(b._id));
        // console.log(transactionsPerDay)
        const newUsersPerDay = await User.aggregate([
          {
            $group: {
              _id: {
                year: {
                  $year: "$createdAt",
                },
                month: {
                  $month: "$createdAt",
                },
                day: {
                  $dayOfMonth: "$createdAt",
                },
              },
              count: {
                $sum: 1,
              },
            },
          },
        ]).toArray();
        newUsersPerDay.sort((a, b) => {
          // First compare by year
          if (a._id.year !== b._id.year) {
            return a._id.year - b._id.year;
          }
          // If years are the same, compare by month
          if (a._id.month !== b._id.month) {
            return a._id.month - b._id.month;
          }
          // If both year and month are the same, compare by day
          return a._id.day - b._id.day;
        });
        console.log(newUsersPerDay);
        resolve({
          users: totalUsers,
          totalAmount: totalBalance[0].totalBalance,
          transactions: totalTransactions,
          loansIssued: 0,
          activeLoans: 0,
          interestEarned: 0,
          newAccounts: newUsersThisMonth,
          totalDeposits: 0,
          transactionsPerDay: transactionsPerDay,
          newUsersPerDay: newUsersPerDay,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        reject({ error: "Failed to fetch stats" });
      }
    });
  },
  getUsers: () => {
    return new promise(async (resolve, reject) => {
      db.get()
        .collection(collection.User_Collection)
        .find({})
        .toArray()
        .then((response) => {
          // console.log(response)
          resolve(response);
        });
    });
  },
  editUser:(user)=>{
    // console.log((user))
    return new promise(async(resolve,reject)=>{
      db.get().collection(collection.User_Collection).updateOne({_id:new ObjectId(user._id)},{$set:{name:user.name,email:user.email,address:user.address,mobileNumber:user.mobileNumber,status:user.status}})
       .then((data)=>{
        // console.log(data)
          resolve({status:true})
        })
       .catch((error)=>{
          console.error(error)
          reject({status:false,error:"Failed to update user"})
        })
    })
  }

};
