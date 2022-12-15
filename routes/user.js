const express = require('express');
const {
    getUsers,
    getUser,
    createUser,
    loginUser,
    deleteUser,
    updateUser
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


module.exports = router;