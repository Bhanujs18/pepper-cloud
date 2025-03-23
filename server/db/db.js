const mongoose = require('mongoose')


const db = async() => {
    try {
       await mongoose.connect(process.env.DB_URI)
       .then(()=>console.log("db connected")) 
       .err((err)=>console.log(err))
    } catch (error) {
        
    }
}

module.exports = db;