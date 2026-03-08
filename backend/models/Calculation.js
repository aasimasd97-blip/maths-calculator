const mongoose = require("mongoose");

const CalculationSchema = new mongoose.Schema({

username:{
type:String,
required:true
},

expression:{
type:String,
required:true
},

result:{
type:Number,
required:true
},

createdAt:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Calculation",CalculationSchema);