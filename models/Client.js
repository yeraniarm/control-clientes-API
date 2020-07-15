const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    nombre: {
        type: String,
        trim: true, 
        required: [true, 'Please add a name']
    }, 
    rfc: {
        type: String, 
        trim: true, 
        required: [true, 'Please add a rfc'], 
        unique: true
    },
    createdAt: String, 
    telefono: {
        type: String, 
        minlength: [10, 'Please add a valid number']
    }, 
    ciudad: String, 
    domicilio: String,
    colonia: String,
    codigoPostal: String, 
    correo: {
        type: String,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email'
        ]    
    }
});

module.exports = mongoose.model('Client', ClientSchema);