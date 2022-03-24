const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const {parse} = require('csv-parse');
const Product = require('../models/Product');

router.get('/', (req, res) =>{

    var parser = parse({columns: true}, function (err, records) {
        Product.insertMany(records).then((p) =>{
            if(p){
                return res.status(201).send('Documents inserted succesfully');
            }
                const errors = {};
                errors.document = 'Documents not inserted';
                return res.status(400).json({errors});
        })
    });
    
    fs.createReadStream(__dirname+'/wobot.csv').pipe(parser);


})

module.exports = router;