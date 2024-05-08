db = require('../config/connection')
const promise = require('promise')
const bcrypt = require('bcrypt');
const collection = require("../config/collection");
const { response } = require('express');
const { ObjectId } = require('mongodb');
const { resolve } = require('path');

module.exports={
    register: (user) => {
        console.log("#####")
        console.log(user)
        return new promise(async (resolve, reject) => {
            oldUser = await db.get().collection(collection.User_Collection).findOne({ email: user.email })
            if (oldUser) {
                console.log('already user')
                resolve({ status: false })
            }
            else {
                const saltRounds = 10;
                user.password = await bcrypt.hash(user.password, saltRounds)
                
                db.get().collection(collection.User_Collection).insertOne(user).then((data) => {
                    console.log(data)
                    resolve({ data, status: true })
                })
            }
        })
    },

    login: (user) => {

        return new promise(async (resolve, reject) => {
            existingUser = await db.get().collection(collection.User_Collection).findOne({ email: user.email })
            if (existingUser) {
                if (await bcrypt.compare(user.password, existingUser.password)) {
                    console.log('user logedin')
                    // console.log(existingUser)
                    resolve({ status: true, userName: existingUser.name, userId: existingUser._id })
                }
                else {
                    resolve({ status: false })
                }
            }
            else {
                resolve({ status: false })
            }
        })

    },
}