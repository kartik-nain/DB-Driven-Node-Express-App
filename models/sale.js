/********************************************************************************** 
 * ITE5315 – Assignment 4* I declare that this assignment is my own work in accordance with Humber 
 * Academic Policy. *No part of this assignment has been copied manually or electronically from any 
 * other source *(including web sites) or distributed to other students.** 
 * Name: Kartik Nain, Hardeep Singh                 Student ID: N01516607, N01512362                    Date: 10 April 2023
 * **********************************************************************************/
const mongoose = require('mongoose')

const saleSchema = new mongoose.Schema({
    saleDate: {
        type: Date,
        required: true
    },
    items: [{
        name: {
            type: String,
            required: true
        },
        tags: [{
            type: String
        }],
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    storeLocation: {
        type: String,
        required: true
    },
    customer: {
        gender: {
            type: String
        },
        age: {
            type: Number
        },
        email: {
            type: String
        },
        satisfaction: {
            type: Number
        }
    },
    couponUsed: {
        type: Boolean,
        required: true
    },
    purchaseMethod: {
        type: String,
        required: true
    }
})

module.exports = Sale = mongoose.model('sales', saleSchema)