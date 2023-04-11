/********************************************************************************** 
 * ITE5315 – Assignment 4* I declare that this assignment is my own work in accordance with Humber 
 * Academic Policy. *No part of this assignment has been copied manually or electronically from any 
 * other source *(including web sites) or distributed to other students.** 
 * Name: Kartik Nain, Hardeep Singh                 Student ID: N01516607, N01512362                    Date: 10 April 2023
 * **********************************************************************************/
const express = require('express')
const bcrypt = require('bcryptjs')
var cookie = require('cookie-parser')
const jsonwt = require('jsonwebtoken')
const passport = require('passport')
require('dotenv').config()

const router = express.Router()

const Person = require('./../../models/Person')

router.use(cookie())

// Route to register a user. URL : /api/auth/register
router.post('/register', (req, res) => {
    // check if username is already in collection.
    Person
        .findOne({username: req.body.username})
        .then(person => {
            if (person) {
                res.status(400).send('Username already there.')
            } else {
                
                const person = Person({
                    name: req.body.name,
                    username: req.body.username,
                    password: req.body.password
                })

                // encrypting the password using bcryptjs
                bcrypt.genSalt(10, (err, salt) => {
                    // salt is provided in salt variable.
                    bcrypt.hash(person.password, salt, (err, hash) => {
                        if(err) {
                            return res.status(400).send('Not Registered, Contact Admin!')
                        }
                        else {
                            // hashed password
                            person.password = hash

                            // add new person with hashed password.
                            person
                                .save()
                                .then(person => res.send('add success'))
                                .catch(err => res.send(err.message))
                        }
                    })
                })
            }
        })
        .catch(err => res.send(err))
})

// Route to login a user. URL : /api/auth/login
router.post('/login', (req, res) => {
    username = req.body.username
    password = req.body.password // 123456

    // check if username is already in collection.
    Person
        .findOne({username: req.body.username})
        .then(person => {
            if (person) {
                // compare the password
                bcrypt
                    .compare(password, person.password)
                    .then(
                        (isCompared) => {
                            if(isCompared) {
                                // res.cookie('session_id', '123')
                                // res.send('Login Success')
                                
                                // generate JWT
                                const payload = {
                                    id: person.id, 
                                    name: person.name,
                                    username: person.username
                                }
                                
                                // jsonwebtoken method used to create token.
                                jsonwt.sign(
                                    payload,
                                    process.env.key,
                                    {expiresIn: 3600},
                                    (err, token) => {
                                        console.log(err)
                                        res.json({
                                            success: true,
                                            token: 'Bearer ' + token
                                        })
                                    }
                                )
                            }
                            else {
                                res.status(401).send('Password is not correct')
                            }
                        }
                    )
                    .catch()
            } else {
                res.status(400).send('Username is not there.')
            }
        })

})

// Private route to get all user details
router.get(
    '/get',
    passport.authenticate('jwt', { session: false }), 
    async(req, res) => {
    let people_un = []
    const cursor = await Person.find()
    cursor.forEach((person) => {
        people_un.push(person.username)
    })
    res.send(people_un)
})


module.exports = router