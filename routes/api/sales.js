
const express = require('express')
const router = express.Router()
const { celebrate, Joi, errors, Segments } = require('celebrate');
const passport = require('passport')
const Sale = require('./../../models/sale')




router.post('/form', passport.authenticate('jwt', { session: false }),  //middleware from passport-jwt
    (req, res) => {
        res.render('form');
    })

router.post('/form/data', celebrate({
    [Segments.BODY]: {
        page: Joi.number().integer().required(),
        perPage: Joi.number().integer().required(),
        storeLocation: Joi.string().allow('')
    }
}), (req, res) => {
    const page = req.body.page;
    const perPage = req.body.perPage;
    const storeLocation = req.body.storeLocation ? { storeLocation: req.body.storeLocation } : {}
    // calculate the skip value for pagination
    const skip = (page - 1) * perPage

    Sale.find(storeLocation).skip(skip).limit(perPage)
        .then(sale => {
            if (sale) {
                res.status(200).send(sale)
            } else {
                res.status(404).send("Not Found.")
            }
        })
        .catch(err => res.send(err))
})

// create a new document. URL : /api/sales/
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const saleData = req.body;
    const sale = new Sale(saleData);

    sale
        .save()
        .then(() => { res.status(201).send('Add Success') })
        .catch((err) => res.status(500).send(err.message))

})

router.get('/', passport.authenticate('jwt', { session: false }), celebrate({
    [Segments.QUERY]: {
        page: Joi.number().integer().required(),
        perPage: Joi.number().integer().required(),
        storeLocation: Joi.string()
    }
}), (req, res) => {
    const page = req.query.page
    const perPage = req.query.perPage

    // calculate the skip value for pagination
    const skip = (page - 1) * perPage

    // build the query based on the storeLocation parameter, if provided
    const storeLocation = req.query.storeLocation ? { storeLocation: req.query.storeLocation } : {}

    Sale.find(storeLocation).skip(skip).limit(perPage).then(sale => {
        if (sale) {
            res.status(200).send(sale)
        } else {
            res.status(404).send("Not Found.")
        }
    })
        .catch(err => res.send(err))
})

router.use(errors());


// Get a document using _id URL : /api/sales/:_id
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Sale
        .findOne({ _id: req.params.id })
        .then(sale => {
            if (sale) {
                res.status(200).send(sale)
            } else {
                res.status(404).send("Not Found.")
            }
        })
        .catch(err => res.send(err))

})

// Update a document using _id URL : /api/sales/:_id
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const updates = req.body;

    Sale
        .updateOne(
            { _id: req.params.id },
            { $set: updates })
        .exec()
        .then(() => { res.status(201).send('Sales Document Updated!') })
        .catch(err => res.status(500).send(err.message))

})

// Delete a document using _id URL : /api/sales/:_id
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Sale
        .deleteOne({ _id: req.params.id })
        .exec()
        .then(() => { res.status(201).send('Sale Document Deleted!') })
        .catch(err => res.status(500).send(err.message))

})







module.exports = router