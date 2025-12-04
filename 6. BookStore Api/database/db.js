const mongoose = require('mongoose')

const connectToDB= async()=>{
    try {
        await mongoose.connect('mongodb+srv://<db-username>:<db-password>@cluster0.ofafujx.mongodb.net/')
        console.log("Mongodb is connected succesfully")
    } catch (error) {
        console.error('Mongodb connection failed',error)
        process.exit(1)
    }
}

module.exports = connectToDB