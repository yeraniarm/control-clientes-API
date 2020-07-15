const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    user: {
        type: String, 
        unique: true,
        required: [true, 'Please add a username'], 
    }, 
    pass: {
        type: String, 
        required: [true, 'Please add a password'], 
        minlength: 6, 
        select: false
    },
    createdAt: String
});

//Encrypt password using bcrypt
UserSchema.pre('save', async function(next){
    if(!this.isModified('pass')){
        next();
    }

    const salt = await bcrypt.genSalt(10); 
    this.pass = await bcrypt.hash(this.pass, salt);
});

//Sign JWT and return
UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

//Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.pass);
};

module.exports = mongoose.model('User', UserSchema);
