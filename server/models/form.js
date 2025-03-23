const mongoose  = require("mongoose");

const formSchema = new mongoose.Schema({
    formName : {
        type : String,
        require :true
    },
    fields : {
        type : Object,
        require : false
    }
    
})

module.exports = mongoose.model("Form" , formSchema);