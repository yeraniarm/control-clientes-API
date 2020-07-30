const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");

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
        minlength: [10, 'Please add a valid number'], 
        required: [true, 'Please add a number']
    }, 
    ciudad: String, 
    domicilio: String,
    colonia: String,
    codigoPostal: String, 
    correo: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email'
        ] 
    }
});

//Initialize auto-increment
const connection = mongoose.createConnection(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});
autoIncrement.initialize(connection);
  
//_id auto-incremental
ClientSchema.plugin(autoIncrement.plugin, {
    model: "Client",
    field: "_id",
    startAt: 1
});

module.exports = mongoose.model('Client', ClientSchema);