const User = require('../models/userModel');
const mongoose = require('mongoose');

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
        const user = await User.create({username, email, password});
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

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

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}