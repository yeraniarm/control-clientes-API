const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cors = require('cors');

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

//Enable CORS
app.use(cors());

//Mount routers
app.use('/clientes', clients);
app.use('/', users);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //Close server and exit process
    server.close(() => process.exit(1));
});