const express = require('express')
const app = express();
const db = require('./db/db')
const cors = require('cors')
const Form = require('./models/form')
require('dotenv').config();
app.use(cors())
app.use(express.json())

db();

app.use('/save-form' , async(req , res) => {
    const {fields , formName} = req.body;
    const formData = new Form({
        formName,
        fields
    })
    const saved = await formData.save();
    console.log(saved)

    if(saved){
      return  res.status(200).send({message : "Saved"})
    }

   return res.status(500).send({message : "Failed"}) ;
})

app.use('/get-forms' , async(req , res) => {
   
    const saved = await Form.find({})

    if(saved){
      return  res.status(200).send({data : saved})
    }

   return res.status(500).send({message : "Failed"}) ;
})

app.use('/view-form/:formId' , async(req, res)=>{
    try {
        const {formId} = req.params;
        if(formId){
            const data = await Form.find({_id : formId})
            if(data){
                return  res.status(200).send({data : data})
            }
            return  res.status(500).send({data : "Nothing or Something Went Wrong!!"})
        }
    } catch (error) {
        return  res.status(500).send({data : "Server Error"})
    }
})

app.use('/edit-form/:formId' , async(req, res)=>{
    try {
        const {formId} = req.params;
        const {fields , formName } = req.body;
        if(formId){
            const data = await Form.findOneAndUpdate({_id : formId} , {fields : fields ,formName : formName})
            if(data){
                return  res.status(200).send({data : data})
            }
            return  res.status(500).send({data : "Nothing or Something Went Wrong!!"})
        }
    } catch (error) {
        return  res.status(500).send({data : "Server Error"})
    }
})

app.use('/delete-form/:formId' , async(req, res)=>{
    try {
        const {formId} = req.params;
        if(formId){
            const data = await Form.deleteOne({_id : formId})
            if(data){
                return  res.status(200).send({data : data})
            }
            return  res.status(500).send({data : "Nothing or Something Went Wrong!!"})
        }
    } catch (error) {
        return  res.status(500).send({data : "Server Error"})
    }
})


app.use('/' , (req, res)=>{
    res.status(200).send("Server is Alive")
})

app.listen(3000, ()=>{
    console.log("app is running on 3000")
})