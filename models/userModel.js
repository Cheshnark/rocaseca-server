const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    favorites: [{
        type: String
    }]
}, {timestamps: true});

// Static signup method
userSchema.statics.signup = async function (username, email, password) {

    // Validation
    if(!username || !email || !password){
        throw Error('Han de rellenarse todos los campos')
    }
    if(!validator.isEmail(email)){
        throw Error('El email no es válido')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('La contraseña es demasiad débil')
    }

    const exists = await this.findOne({email});

    if(exists){
        throw Error('El email ya está en uso');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ username, email, password: hash})

    return user;
};

// Static login method
userSchema.statics.login = async function (email, password) {

    if(!email || !password) {
        throw Error('Han de rellenarse todos los campos');
    }

    const user = await this.findOne({email});

    if(!user){
        throw Error('Mail incorrecto');
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        throw Error('Contraseña incorrecta');
    }

    return user
}

module.exports = mongoose.model('User', userSchema);

