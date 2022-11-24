//const { name } = require('ejs');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')

const User = require('../models/User')

//Login page
router.get('/login', (req, res) => {
    res.render('login')
})

//Register page
router.get('/register', (req, res) => {
    res.render('register')
})

//Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' })
    }

    if (password.length <= 6 || password2.length <= 6 ) {
        errors.push({ msg: 'Passwords should be atleast 6 characters' })
    }

    //Check passwords match
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' })
    }

   

    if (errors.length > 0) {
        console.log(errors);
        res.render("partials/messages",{
            errors: errors
        });
    }
    else {
        //Validation passed
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    //User exists
                    errors.push({ msg: 'email is already registered' })
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                }
                else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    console.log(newUser);
                    res.send("hello")
                }

            });
    }
});



module.exports = router;