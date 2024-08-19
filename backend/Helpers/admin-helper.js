const collection = require("../config/collection")
const db=require("../config/connection")

const promise = require("promise");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const { response } = require("express");



module.exports={
    adminLogin:({adminId,password})=>{
        return new promise(async(resolve,reject)=>{
            admin=await db.get().collection(collection.Admin_Collection).findOne({adminId:adminId})
            
             if(admin){
                 bcrypt.compare(password, admin.password).then((checked)=>{
                     
                    resolve({checked,id:admin._id})
                 })
                 
             }else{
               
                resolve({error:"no admin"})
             }
        })
     
    },
    adminStats:()=>{
        return new promise(async(resolve,reject)=>{
            try {
                // Total number of users
                const User = db.get().collection(collection.User_Collection);
                const totalUsers = await User.countDocuments();
                
                const totalBalance = await User.aggregate([
                    {
                        $group:{
                            _id: null,
                            totalBalance: {
                              $sum: "$balance"
                            }
                          },
                    },
                ]).toArray();
                // console.log(totalBalance[0])
        
                // New users this month
                const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
                const newUsersThisMonth = await User.countDocuments({
                    createdAt: { $gte: startOfMonth },
                });
                // console.log(newUsersThisMonth)
                totalTransactions=await db.get().collection(collection.Transaction_Collection).countDocuments()
               resolve({
                users: totalUsers,
                totalAmount: totalBalance[0].totalBalance,
                transactions: totalTransactions,
                loansIssued: 0,
                activeLoans: 0,
                interestEarned: 0,
                newAccounts:newUsersThisMonth,
                totalDeposits: 0,
 
               })
            } catch (error) {
                console.error('Error fetching stats:', error);
               reject({ error: 'Failed to fetch stats' });
            }


        })
    },
    getUsers:()=>{
        return new promise(async(resolve,reject)=>{
            db.get().collection(collection.User_Collection).find({}).toArray().then((response)=>{
                // console.log(response)
                resolve(response)
            })
        })
       
    }
}