const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authenticate = require('../middleware/authenticate');

const Brand = require('../models/brand');



router.get('/', (req, res, next) => {

    Brand.find({})
    .select('_id name price productPic slug')
    .exec()
    .then(brands => {
        res.status(200).json({
            message: brands
        });
    })
    .catch(er => {
        res.status(500).json({
            error: er
        });
    })

});

router.post('/create', authenticate, (req, res, next) => {

    const brand = new Brand({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        slug: req.body.slug,
        createdAt: new Date(),
        createdBy: req.body.createdBy
    });

    brand.save()
    .then(brand => {
        res.status(201).json({
            message: brand
        });
    })
    .catch(er => {
        res.status(500).json({
            error: er
        })
    });

});

module.exports = router;