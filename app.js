const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const app = express()

app.use(express.json());
app.use(express.urlencoded());
app.use('/user', userRoutes);
app.use('/product', productRoutes);
mongoose.connect('mongodb+srv://user:user@cluster0.w70ol.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() =>{
        console.log('Connected to database');
    })
    .catch(() =>{
        console.log('Connection to database failed');
    })

app.listen(3000, ()=>{
    console.log('Listening to port 3000');
})