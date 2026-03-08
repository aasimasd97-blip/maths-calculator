const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Calculation = require("./models/Calculation");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.get("/",(req,res)=>{
res.send("Calculator API Running");
});

app.post("/calculate",async(req,res)=>{

try{

const {username,expression,result} = req.body;

const calc = new Calculation({
username,
expression,
result
});

await calc.save();

res.json({message:"Saved successfully"});

}catch(error){

res.status(500).json(error);

}

});

app.get("/history",async(req,res)=>{

const history = await Calculation
.find()
.sort({createdAt:-1})
.limit(10);

res.json(history);

});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
console.log("Server running on port "+PORT);
});