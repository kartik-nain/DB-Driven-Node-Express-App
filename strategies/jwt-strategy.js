const JwtStrategy = require('passport-jwt').Strategy    // used to check things inside JWT
const ExtractJwt = require('passport-jwt').ExtractJwt   // used to extract things out of token
const mongoose = require('mongoose')
const Person = mongoose.model('users')

// getting key
require('dotenv').config()
const key = process.env.key

// opts is an object literal containing options to control how the token is extracted from the request or verified.
var opts = {}
// JWT can be sent in many forms, other method to extract it fromHeader(), fromBodyField(), fromUrlQueryParameter()
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
//When you receive a JWT from the client, you can verify that JWT with this that secret key stored on the server.
opts.secretOrKey = key

module.exports = (passport) => {
    // format of following callbacks
    // new JwtStrategy(options, verify).
        // options is an object literal containing options to control how the token is extracted from the request or verified.
        // verify is a function with the parameters verify(jwt_payload, done)
            // jwt_payload is an object literal containing the decoded JWT payload.
            // done is a passport error first callback accepting arguments done(error, user, info)
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        Person.findById(jwt_payload.id)
            .then(
                (person) => {
                    if (person) {
                        return done(null, person)
                    }
                    else {
                        return done(null, false)
                    }
                }
            )
            .catch(err => console.log(err))
    }))
}