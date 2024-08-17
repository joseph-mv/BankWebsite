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
    getUsers:()=>{
        return new promise(async(resolve,reject)=>{
            db.get().collection(collection.User_Collection).find({}).toArray().then((response)=>{
                // console.log(response)
                resolve(response)
            })
        })
       
    }
}