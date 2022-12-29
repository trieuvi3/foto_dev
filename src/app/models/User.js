const mongoose = require('mongoose');
const {isEmail} = require('validator');

const { encrypt, decrypt } = require('../../ulti/crpyto')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: { 
        type: String,
        required: [true, 'Please enter a firstname'],
        maxLength: [25, 'Maximum firstname length is 25 characters']
    },
    lastname: { 
        type: String,
        required: [true, 'Please enter a lastname'],
        maxLength: [25, 'Maximum lastname length is 25 characters']
    },
    email: { 
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'],
        maxLength: [255, 'Maximum email length is 255 characters']
    },
    password: { 
        type: String,
        required: [true, 'Please enter a password'], 
        minLength: [6, 'Minimum password length is 6 characters'],
        maxLength: [64, 'Maximum email length is 64 characters']
    },
    avatar: {
        type: String,
    },
    role: {
        type: Number,
        required: [true, 'Please enter a role']
    },
    flagActived: {
        type: Number,
        default: 1
    },
    flagDeleted: {
        type: Number,
        default: 1
    }
  });

    // fire a function after doc saved to db
    UserSchema.post('save', function (doc, next) {
    console.log('new user was create and save', doc);
    next();
    });

    // fire a function before doc saved to db
    UserSchema.pre('save', async function (next) {
        this.password = JSON.stringify(encrypt(this.password));
        next();
    });


  // static method to login User
  UserSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});
    if(user) {
        const auth = password === decrypt(JSON.parse(user.password));
        if(auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
  }

module.exports = mongoose.model('User', UserSchema);
