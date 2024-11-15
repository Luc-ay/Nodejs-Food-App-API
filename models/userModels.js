const mongoose = require('mongoose')


// USER SCHEMA MODEL
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        requried: true,
    },
    email: {
        type: String,
        requried: true,
        unique: true,
    },
    password: {
        type: String,
        requried: true,
    },
    address: {
        type: Array,
        requried: true,
    },
    address: {
        type: Array,
        requried: true,
    },
    phone: {
        type: String,
        requried: true,
    },
    usertype:{
        type: String,
        default: 'Client',
        enum: ['Client', 'admin', 'vendor', 'driver' ]
    },
    profile:{
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/219/219986.png',
    },
}, {timestamps:true})

// EXPORT MODEL
module.exports = mongoose.model('user', userSchema)
