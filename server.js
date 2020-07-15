const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');

// Load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

//Route files
const clients = require('./routes/clients');
const users = require('./routes/users');

const app = express();

//Body parser
app.use(express.json());

//Sanitize data
app.use(mongoSanitize()); 

//Set security headers
app.use(helmet());

//Prevent XSS attacks
app.use(xss()); 

//Prevent http param polution
app.use(hpp());

//Enable CORS
app.use(cors());

//Mount routers
app.use('/api/clientes', clients);
app.use('/api', users);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //Close server and exit process
    server.close(() => process.exit(1));
});