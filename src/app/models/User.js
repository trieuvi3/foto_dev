const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { 
        type: String, 
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: { 
        type: String, 
        required: [true, 'Please enter an password'], 
        minLength: [6, 'Minimum password length is 6 characters']
    }
  });

  // fire a function after doc saved to db
  UserSchema.post('save', function (doc, next) {
    console.log('new user was create and save', doc);
    next();
  });

  // fire a function before doc saved to db
  UserSchema.pre('save', async function (next) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
      next();
  });

  // static method to login User
  UserSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
  }

  module.exports = mongoose.model('User', UserSchema);
