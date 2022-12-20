const express = require('express');
const {
    getUserInfo,
    getFavCragsList,
    getFavCrags,
    postFavCrag,
    deleteFavCrag
} = require('../controllers/loggedController');

const router = express.Router();

const requireAuth = require('../middleware/requireAuth');

// Require auth for all routes
router.use(requireAuth); 

//GET user info
router.get('/user-info', getUserInfo);

//GET favorite crags
router.get('/favorite-crags-list', getFavCragsList);

//GET favorite crags
router.get('/favorite-crags', getFavCrags);

//POST favorite crag
router.post('/favorite-crags/:id', postFavCrag);

//DELETE crag
router.delete('/favorite-crags/:id', deleteFavCrag);


module.exports = router;