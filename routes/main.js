const express = require('express');
const {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
} = require('../controllers/userController');
const {
    getCrags,
    getCrag,
    createCrag,
    deleteCrag,
    updateCrag,
    getCurrentWeather,
    getFiveDays,
    getTwelveHours
} = require('../controllers/cragController');

const router = express.Router();

// GET register info
router.get('/register', (req, res) => {
    res.json({mssg: 'Registah'})
})

//Users

// GET users info
router.get('/users', getUsers);

// GET user info
router.get('/users/:id', getUser);

// GET login info
router.get('/login', (req, res) => {
    res.json({mssg: 'Login'})
})
// POST register info
router.post('/register', createUser);

// POST login info

// DELETE user info
router.delete('/users/:id', deleteUser);

// UPDATE user info 
router.patch('/users/:id', updateUser);

//Crags 

//GET crags info
router.get('/crags', getCrags);

//GET crag info
router.get('/crags/:id',getCrag);

//POST crag info
router.post('/crags', createCrag);

//DELETE crag
router.delete('/crags/:id', deleteCrag);

//UPDATE crag
router.patch('/crags/:id', updateCrag);

// Weather Accuweather API

//GET current weather info from API
router.get('/crags/current-weather/:id', getCurrentWeather);

//GET 5 days weather info from API
router.get('/crags/five-days/:id', getFiveDays);

//GET hourly weather info from API
router.get('/crags/hourly-weather/:id', getTwelveHours);




module.exports = router;