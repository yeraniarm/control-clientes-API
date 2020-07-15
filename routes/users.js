const express = require('express');

const { 
    register,
    login, 
    getUsers, 
    updateUser, 
    deleteUser
} = require('../controllers/users');

const User = require('../models/User');

const router = express.Router({ mergeParams: true });
 
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.route('/users').get(advancedResults(User),protect,getUsers);
router.route('/users/:id').put(protect,updateUser).delete(protect,deleteUser);
router.route('/login').post(login);
router.route('/register').post(register);

module.exports = router;