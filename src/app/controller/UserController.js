const User = require("../models/User");
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);

    let errors = {email:'', password: ''};

    // incorrect email
    if(err.message === 'incorrect email') {
        errors.email = 'that email is not registered';
    }

    // incorrect password
    if(err.message === 'incorrect password') {
        errors.password = 'that password is not registered';
    }
    

    if(err.code === 11000) {
        errors.email = 'that email is already restered';
        return errors;
    }

    // validation errors
    if (err.message.includes('User validation failed')) {
       Object.values(err.errors).forEach(properties => {
        errors[properties.path] = properties.message;
       })
    }

    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'Foto book serect', {
        expiresIn: maxAge
    });
}

class UserController {

    login(req, res, next) {
        res.render('login');
    };

    async login_post(req, res, next) {
        const {email, password} = req.body;
        try {
            const user = await User.login(email, password);
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
            res.status(200).json({user: user._id});
        }
        catch(err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    };

    signup(req, res, next) {
        res.render('signup');
    };

    async signup_post(req, res, next) {
        const {email, password} = req.body;

        try {
            const user = await User.create({ email, password})
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
            res.status(201).json({user: user._id});
        }
        catch(err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    };

    // logout
    logout(req, res, next) {
        res.cookie('jwt', '', { maxAge: 1});
        res.redirect('/');
    };
}

module.exports = new UserController;