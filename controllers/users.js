const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const moment = require('moment-timezone');

//@desc   Register user
//@route  POST  /registrar
//@access Public
exports.register = asyncHandler(async (req,res,next) => {
    req.body.createdAt = moment().tz('America/Mexico_City').format('DD/MM/YYYY, hh:mm:ss a');
    const user = await User.create(req.body);
    sendTokenResponse(user, 201, res);

});

//@desc    Login user
//@route   POST /login
//@access  Public
exports.login = asyncHandler(async (req,res,next) => {
    const { user, pass } = req.body;

    //Validate user & password
    if(!pass || !user){
        return next(new ErrorResponse('Please provide an username and a password', 400));
    }

    //Check for user
    const userExist = await User.findOne({ user }).select('+pass');

    if(!userExist) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    //Check if password matches
    const isMatch = await userExist.matchPassword(pass);

    if(!isMatch){
        return next(new ErrorResponse('Invalid credentials', 401));
    }

   sendTokenResponse(userExist, 200, res);
});

//@desc   Get all users
//@route  GET  /users
//@access Private/Admin
exports.getUsers = asyncHandler(async (req,res,next) => {
    res.status(200).json(res.advancedResults);
});

//@desc   Update user
//@route  PUT  /users/:id
//@access Private/Admin
exports.updateUser = asyncHandler(async (req,res,next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true
    });

    res.status(200).json({
        success: true, 
        data: user
    });
});

//@desc   Delete user
//@route  DELETE  /users/:id
//@access Private/Admin
exports.deleteUser = asyncHandler(async (req,res,next) => {
    user = await User.findById(req.params.id);

    if (!user){
        return next(new ErrorResponse('User not found', 404));
    }

    await user.remove();

    res.status(204).json({
        success: true, 
        data: {}
    });
});

//Get token from model, create cookie and send response 
const sendTokenResponse = (user, statusCode, res) => {
    //Create token 
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV==='production') {
        options.secure = true
    }
    
    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({ success: true, data: user, token });
};