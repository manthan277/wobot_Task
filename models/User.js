const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName : {
        type : String
    },
    lastname : {
        type : String
    },
    username : {
        type : String
    },
    password : {
        type : String
    }
})

module.exports = User = mongoose.model('users', userSchema);