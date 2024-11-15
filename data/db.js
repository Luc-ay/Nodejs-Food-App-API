const mongoose = require('mongoose')

// MONGOOSE DATA BASE CONNECTION
const connectDb = async (req,res) =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to Database ${mongoose.connection.host}`);
        
    } catch (error) {
        console.log('DB error', error);
        
    }
}

module.exports = connectDb