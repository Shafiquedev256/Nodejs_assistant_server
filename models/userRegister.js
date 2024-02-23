const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const registetSchema = new Schema({
  name:{type:String, required: true},
  email:{type:String, required: true,unique: true},
 thread:{type:String, required: true,unique: true},
},{timestamps: true}) 

const User = mongoose.model("Chatbot_user",registetSchema) 

module.exports = User