const Client = require('../models/Client');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const moment = require('moment-timezone');

//@desc    Get clients
//@route   GET /clientes
//@access  Private
exports.getClients = asyncHandler(async(req,res,next) => {
    res.status(200).json(res.advancedResults);
});

//@desc    Add client
//@route   POST /clientes/crear
//@access  Private
exports.addClient = asyncHandler(async(req,res,next) => {
    req.body.createdAt = moment().tz('America/Mexico_City').format('DD/MM/YYYY, hh:mm:ss a');
    let client = await Client.create(req.body);
    res.status(201).json({ success: true, data: client });
});

//@desc    Update client
//@route   PUT /clientes/modificar/:id
//@access  Private
exports.updateClient = asyncHandler(async(req,res,next) => {
    let client = await Client.findById(req.params.id);

    if (!client) {
        return next (new ErrorResponse(`Client not found with id of ${req.params.id}`, 404));
    }

    client = await Client.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true
    });

    res.status(200).json({ success: true, data: client });
});

//@desc    Delete client
//@route   DELETE /clientes/eliminar/:id
//@access  Private
exports.deleteClient = asyncHandler(async(req,res,next) => {
    let client = await Client.findById(req.params.id);

    if (!client) {
        return next (new ErrorResponse(`Client not found with id of ${req.params.id}`, 404));
    }

    await client.remove();

    res.status(204).json({ success: true, data: {} });
});