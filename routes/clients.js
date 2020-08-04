const express = require('express');

const {
    getClients, 
    getClient,
    addClient, 
    updateClient, 
    deleteClient
} = require('../controllers/clients');

const Client = require('../models/Client');
const advancedResults = require ('../middleware/advancedResults');

const router = express.Router();
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/').get(advancedResults(Client), getClients);
router.route('/:id').get(getClient);
router.route('/crear').post(addClient);
router.route('/modificar/:id').put(updateClient);
router.route('/eliminar/:id').delete(deleteClient);

module.exports = router;