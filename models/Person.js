/********************************************************************************** 
 * ITE5315 – Assignment 4* I declare that this assignment is my own work in accordance with Humber 
 * Academic Policy. *No part of this assignment has been copied manually or electronically from any 
 * other source *(including web sites) or distributed to other students.** 
 * Name: Kartik Nain, Hardeep Singh                 Student ID: N01516607, N01512362                    Date: 10 April 2023
 * **********************************************************************************/
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PersonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        default: '123456'
    },
})

module.exports = Person = mongoose.model('users', PersonSchema)