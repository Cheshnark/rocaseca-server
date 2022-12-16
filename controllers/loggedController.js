const Crag = require('../models/cragModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Get user favorite crags list
const getFavCragsList = async (req, res) => {
    const { authorization } = req.headers;

    const token = authorization.split(' ')[1];
    const {_id} = jwt.verify(token, process.env.SECRET);

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json({error: 'User does not exist'})
    };

    req.user = await User.findOne({_id});

    if(!req.user) {
        return res.status(404).json({error:'User does not exist'})
    };

    const favorites = req.user.favorites;

    res.status(200).json(favorites);
}

// Get all favorite crags
const getFavCrags = async (req, res) => {
    const { authorization } = req.headers;

    const token = authorization.split(' ')[1];
    const {_id} = jwt.verify(token, process.env.SECRET);

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json({error: 'User does not exist'})
    };

    req.user = await User.findOne({_id});
    const favorites = req.user.favorites;

    if(!req.user) {
        return res.status(404).json({error:'User does not exist'})
    };

    // const updatedFavorites = await User.findOneAndUpdate({_id}, {$set:{
    //     favorites:['6384aebb0aacd4c7823f1053', '6384aeef0aacd4c7823f1056']
    // }})

    const crags = [];

    for(let favorite of favorites) {
        const crag = await Crag.findById(favorite);
        crags.push(crag);
    }

    res.status(200).json(crags);
}

// Add new favorite crag
const postFavCrag = async (req, res) => {
    const {id} = req.params;
    const { authorization } = req.headers;

    const token = authorization.split(' ')[1];
    const {_id} = jwt.verify(token, process.env.SECRET);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Crag does not exist'})
    };
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json({error: 'User does not exist'})
    };

    req.user = await User.findOne({_id});
    const favorites = req.user.favorites;

    if(!favorites) {
        return res.status(404).json({error:'User does not exist'})
    };

    let newFavorites = [];

    if(favorites.includes(id)){
        newFavorites = favorites;
    }else{
        newFavorites = favorites;
        newFavorites.push(id);
    }
    
    const updateFavorites = await User.findOneAndUpdate({_id: _id}, {$set:{
        favorites: newFavorites
    }});

    res.status(200).json(updateFavorites);


}

// Delete favorite crag
const deleteFavCrag = async (req, res) => {
    const {id} = req.params;
    const { authorization } = req.headers;

    const token = authorization.split(' ')[1];
    const {_id} = jwt.verify(token, process.env.SECRET);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Crag does not exist'})
    };
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json({error: 'User does not exist'})
    };

    req.user = await User.findOne({_id});
    const favorites = req.user.favorites;

    if(!favorites) {
        return res.status(404).json({error:'User does not exist'})
    };

    const newFavorites = await favorites.filter((item) => {
        return item !== id;
    })

    const updateFavorites = await User.findOneAndUpdate({_id: _id}, {$set:{
        favorites: newFavorites
    }});

    res.status(200).json(updateFavorites);
}

module.exports = {
    getFavCragsList,
    getFavCrags,
    postFavCrag,
    deleteFavCrag
}