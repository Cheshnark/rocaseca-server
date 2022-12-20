const express = require('express');
const {
    getUsers,
    getUser,
    createUser,
    loginUser,
    deleteUser,
    updateUser,
    postPassword,
    getPassword,
    postResetPassword
} = require('../controllers/userController');

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

// POST register info
router.post('/register', createUser);

// POST login info
router.post('/login', loginUser);

// DELETE user info
router.delete('/users/:id', deleteUser);

// UPDATE user info 
router.patch('/users/:id', updateUser);

//POST forgot password
router.post('/forgot-password', postPassword)

//GET forgot password
router.get('/forgot-password/:id/:token', getPassword)

//POST forgot password
router.post('/forgot-password/:id/:token', postResetPassword)


module.exports = router;