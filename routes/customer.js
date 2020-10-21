const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer')
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name')
    res.send({ result: customers })
})

router.post('/', (req, res) => {
    const { error } = validate(req.body)
    if (error) { return res.status(400).send(error.details[0].message) }
    const newItem = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    });
    newItem.save().then((result) => res.status(201).json({ success: true, result: req.body }))
        .catch(err => res.status(404).json({ success: false }));

});

//edit
router.put('/:id', (req, res) => {
    Customer.find({ _id: req.params.id }).catch(err => res.status(404).json({ success: false, message: "Id not found" }))
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    Customer.updateOne({ _id: req.params.id }, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    }).then((result) => res.status(201).json({ success: true, result: req.body }))
        .catch(err => res.status(404).json({ success: false }));
});

//delete
router.delete('/:id', (req, res) => {
    Customer.findById(req.params.id).then(customer => customer.remove(customer).then(() => res.status(200).json({ success: true }))).catch(err => res.status(404).json({ success: false, message: "Id not found" }))
});



module.exports = router
