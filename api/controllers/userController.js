const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const registerUser = asyncHandler(async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({
            message: "Please enter all fields"
        })
    }
    const existingUser = await User.findOne({
        email
    });

    if (existingUser) return res.status(400).json({
        message: "User already exists",
    })

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    if (user) {
        res.status(201).json({
            message: "user created successfully",
            user,
            URL: req.originalUrl,
            method: req.method,
        })
    } else {
        res.status(400).json({
            message: "User not created",
            URL: req.originalUrl,
            method: req.method,
        })
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!email || !password) {
        res.status(401).json({
            message: "Invalid credentials",
        });
    }

    const user = await User.findOne({ email: email });

    //compare password with hashedpassword
    if (!user) {
        res.status(401).json({
            message: "Invalid credentials",
        })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECERT, {
            expiresIn: "24h"
        });
        res.status(200).json({
            message: "User logged in successfully",
            token: accessToken,
            URL: req.originalUrl,
            method: req.method,
        })
    } else {
        res.status(401).json({
            message: "Invalid credentials",
        });
    }
});

const getCurrentUser = asyncHandler(async (req, res) => {
    
    const {
        username,
        email,
        password
    } = req.body;

    if (!username || !password) {
        res.status(400).json({
            message: "Please enter all fields"
        })
    }
    const user = await User.findOne({email: email});
    if(!user){
        res.status(401).json({
            message: "Invalid credentials",
        });
    }
    res.status(200).json({
        user,
        URL: req.originalUrl,
        method: req.method,
    })
})

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser
};