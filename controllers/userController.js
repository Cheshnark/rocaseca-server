const User = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "rocaseca.app@gmail.com",
        pass: `${process.env.GMAIL_PASSWORD}`
    },
    tls: {
        rejectUnauthorized: false
    }
});


// Token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn:'3d'})
};

// Get all users
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1});

    res.status(200).json(users);
}

// Get a single user
const getUser = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User does not exist'})
    };

    const user = await User.findById(id);

    if(!user) {
        return res.status(404).json({error:'User does not exist'})
    };

    res.status(200).json(user);
}

// Create new user
const createUser = async (req, res) => {
    const {username, email, password} = req.body;
    
    // Add doc to DB
    try {
        const user = await User.signup(username, email, password);

        // Create a token
        const token = createToken(user._id);

        res.status(200).json({username, token});
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

// Login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);

        // Create a token
        const token = createToken(user._id);

        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

// Delete user
const deleteUser = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User does not exist'})
    };

    const user = await User.findOneAndDelete({_id: id});
    
    if(!user) {
        return res.status(404).json({error:'User does not exist'})
    };

    res.status(200).json(user);
}

// Update user
const updateUser = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User does not exist'})
    };

    const user = await User.findOneAndUpdate(
        {_id: id}, 
        {...req.body},
        )

    if(!user) {
        return res.status(404).json({error:'User does not exist'})
    };

    res.status(200).json(user);
}

//POST forgot password
const postPassword = async (req, res) => {
    const { email } = await req.body;
    const user = await User.findOne({email:email});
    

    if(!user) {
        return res.status(404).json({error:'Email does not exist'})
    };

    const payload = {
        email: user.email,
        id: user._id
    }
    const token = jwt.sign(payload, process.env.SECRET, {expiresIn:'15m'});
    const link = `http://localhost:8000/user/forgot-password/${user._id}/${token}`;
    
    let mailOptions = {
        from: "rocaseca.app@gmail.com",
        to: `${email}`,
        subject: "Recupera tu contraseña",
        text: `¡Hola ser de la roca! \n\n¿Has olvidado tu contraseña? No pasa nada, tan solo tienes que pulsar en el siguiente enlace para recuperarla, pero recuerda que solo estará activo durante 15 minutos: \n\n ${link}`
    };
    
    transporter.sendMail(mailOptions, (err, success) => {
        if(err){
            console.log(err);
        }else {
            console.log('Email send successfully');
        }
    })

    res.json({Message:'Se ha enviado un email a tu correo con los pasos para resetear la contraseña.'})

}

//GET forgot password
const getPassword = async (req, res) => {
    const { id, token } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User does not exist'})
    };

    try {
        const payload = jwt.verify(token, process.env.SECRET)
        const user = await User.findById(id);

        if(payload.id === id){
            res.render("index", {user: user})
        }

    } catch (error) {
        console.log(error);
        res.status(404).json(error.message);
    }

}

//POST reset password
const postResetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    
    const oldUser = await User.findById(id);
    if(!oldUser) {
        return res.json({status:"El usuario no existe"})
    }

    try {
        
        const payload = jwt.verify(token, process.env.SECRET)
        
        const user = await User.reset(payload.email, password);

        res.render("success", { email: payload.email, status: "verified", user:user });

    } catch (error) {
        console.log(error);
        res.status(404).json(error.message);
    }

}

module.exports = {
    getUsers,
    getUser,
    createUser,
    loginUser,
    deleteUser,
    updateUser,
    postPassword,
    getPassword,
    postResetPassword
}