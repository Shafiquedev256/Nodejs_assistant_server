const {OpenAI} = require("openai");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes/route")
const bodyParser = require('body-parser');
require("dotenv").config();
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api",router);

app.use(cors())
app.use(express.json()) 
mongoose.connect(process.env.DATA_BASE).then(()=>{
  app.listen(2567,()=>{
  console.log("connected")
})
})
