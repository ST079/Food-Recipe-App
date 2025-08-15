const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.DB).then(()=>{
        console.log("Database connection is successful.")
    })
}

module.exports = connectDB;