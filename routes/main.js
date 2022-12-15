const express = require('express');
const {
    getCrags,
    getCrag,
    createCrag,
    deleteCrag,
    updateCrag,
    getCurrentWeather,
    getFiveDays,
    getTwelveHours,
    getVerticalInfo
} = require('../controllers/cragController');

const router = express.Router();

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

//GET info from enlavertical and take it to the server
router.get('/crags/crag-info/:id', getVerticalInfo);




module.exports = router;