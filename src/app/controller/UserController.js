const User = require("../models/User");
const jwt = require('jsonwebtoken');
const { encrypt, decrypt } = require('../../ulti/crpyto');

// handle errors
const handleErrors = (err) => {
    let errors = { firstname: '', lastname: '', email: '', password: '' };

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'that email is not registered';
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'that password is not registered';
    }

    if (err.code === 11000) {
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
        const { email, password } = req.body;
        try {
            const user = await User.login(email, password);
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).json({ user: user._id });
        }
        catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    };

    signup(req, res, next) {
        res.render('signup');
    };

    async signup_post(req, res, next) {
        const { firstname, lastname, email, password, role } = req.body;
        try {
            const user = await User.create({ firstname, lastname, email, password, role })
            // const token = createToken(user._id);
            // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
            res.status(201).json({ user: user._id });
        }
        catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    };

    // logout
    logout(req, res, next) {
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/');
    };

    edit_user(req, res, next) {
        User.findById(req.params.id)
            .then(user => {
                user.password = decrypt(JSON.parse(user.password));
                res.render('users/edit', { user });
            })
            .catch(next);
    };

    async update_user(req, res, next) {
        req.body.password = JSON.stringify(encrypt(req.body.password));

        const { firstname, lastname, email, password, role, flagActived } = req.body;

        await User.updateOne({ _id: req.params.id }, { firstname, lastname, email, password, role, flagActived })
            .then(user => {
                res.status(201).json({ user: user });
            })
            .catch(err => {
                const errors = handleErrors(err);
                res.status(400).json({ errors });
            })
    };

    details(req, res, next) {
        User.find({})
            .then(users => {
                res.render("manages/users/details",
                    { users });
            })
            .catch(err => {
                console.log(err);
            })
    }

    async delete_user(req, res, next) {
     
        const flagDeleted = 0;
        await User.updateOne({ _id: req.params.id }, { flagDeleted })
            .then((user) => {
                res.status(201).json({ user: user });
            })
            .catch(err => {
                const errors = handleErrors(err);
                res.status(400).json({ errors });
            })
    }

}

module.exports = new UserController;