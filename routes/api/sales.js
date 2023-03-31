const express = require('express')
const router = express.Router()

const Sale = require('./../../models/sale')

// create a new document. URL : /api/sales/
router.post('/', (req, res) => {

    const saleData = req.body;
    const sale = new Sale(saleData);
    
    sale
        .save()
        .then(() => {res.status(201).send('Add Success')})
        .catch((err) => res.status(500).send(err.message))

})

// Get a document using _id URL : /api/sales/:_id
router.get('/:id', (req, res) => {

    Sale
        .findOne({_id: req.params.id})
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
router.put('/:id', (req, res) => {
    const updates = req.body;

    Sale
        .updateOne(
            {_id: req.params.id},
            {$set: updates})
        .exec()
        .then(() => {res.status(201).send('Sales Document Updated!')})
        .catch(err => res.status(500).send(err.message))

})

// Delete a document using _id URL : /api/sales/:_id
router.delete('/:id', (req, res) => {

    Sale
        .deleteOne({_id: req.params.id})
        .exec()
        .then(() => {res.status(201).send('Sale Document Deleted!')})
        .catch(err => res.status(500).send(err.message))

})

module.exports = router