const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// create json web token
const maxAge = 3 * 24 * 60 * 60;

const createToken = (payload) => {
    return jwt.sign(payload , 'net ninja secret', {
      expiresIn: maxAge
    });
  };

const getToken = (token) => {
    return jwt.verify(token, 'net ninja secret');
}  

router.get('/', (req, res)=>{
    //const errors = {};

    const token = getToken(req.headers.jwt);

    //console.log(req.headers.jwt)

    //console.log(token);

    //res.send('uvuyvuy');

    User.findById(token.id).then((loggedUser) =>{

        
            console.log(loggedUser);

            const errors = {};

            //res.send('iwuergiu');

            if(!loggedUser){
                errors.login = 'User must be logged in'
                return res.status(400).json({errors});
            }

            User.find().then((users) =>{

                if(!users){
                    //errors. = 'No user found';
                    return res.status(201).json({message : 'No user found'});
                }
                    return res.status(201).json({users});
                        
            })

    })
})

router.get('/details', (req, res)=>{

    //const {username} = req.body;

    const token = req.headers.jwt;

    const loggedUser = getToken(token);

    const {username} = loggedUser;

    if(!loggedUser){
        errors.login = 'User must be logged in'
        return res.status(400).json({errors});
    }

    const errors = {};
    User.findOne({username}).then((user) =>{

        if(!user){
            errors.user = 'No user found';
            return res.status(400).json({errors});
        }
            return res.status(201).json({user});
                
    })
})

router.post('/signup', (req, res) =>{

    const {userName, lastName, username, password} = req.body;

    const user1 = new User({
        userName, 
        lastName,
        username,
        password
    })

    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password,salt, (err, hash)=>{
                if(err) throw err;
               user1.password = hash; 

            user1.save().then(user=>{
                if(user)
                        return res.json({message : 'User registered Succesfully'});
                else        
                        return res.status(201).json({message : 'Failed to register user!'});    
            })
            .catch(err=> console.log(err))                    
                })
        })

})

router.post('/login', (req, res)=>{

    const {username, password} = req.body;

    const errors = {};

    User.findOne({username}).then(user =>{
            //check for user
        if(!user){
            errors.username = 'Username not found'
            return res.status(400).json({errors})
        }
        
        bcrypt.compare(password, user.password)
            .then(isMatch =>{
                if(isMatch){
                    //User matched

                    const payload = {name : user.firstName, id : user._id, username : user.username }  //create JWT payload
    
                    //Sign Token
                    const token = createToken(payload);
                    res.cookie('jwt', token, {httpOnly : true, maxAge : maxAge*1000 });
                    res.status(201).send('Login Successful');
                }
                else {
                    errors.password = 'Password Incorrect'
                    return res.status(400).json({errors})
                }
            })
    })
    .catch(err => console.log(err))
})



module.exports = router;