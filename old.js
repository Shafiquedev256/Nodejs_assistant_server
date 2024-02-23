const {OpenAI} = require("openai");
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
require("dotenv").config();
const app = express();
const OPENAI_API_KEY3 = process.env.OPENAI_API_KEY3 ;  

const threadId = "thread_bryKaLUVMmRkQ4YUfvKvnI8h"

const openai = new OpenAI({
  organization: "org-w3vilLDFwUJekDRCM1WSWDrp",
  apiKey:OPENAI_API_KEY3
})


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const Doctor = async ()=>{

//const myThread = await openai.beta.threads.create() 
try{
const message =  await openai.beta.threads.messages.create(
  "thread_bryKaLUVMmRkQ4YUfvKvnI8h",
  {
    role:"user",
    content: "what is malaria?"
  }
  );
  
 /* const run = await openai.beta.threads.runs.create(
    "thread_bryKaLUVMmRkQ4YUfvKvnI8h",
    {
assistant_id:"asst_QZyRkgDbvS61VYG0EnYNOCu9",
instructions: "You only answer healthy questions"
    }); 
console.log("messages-------",run.id)*/
    const retrieve = await openai.beta.threads.runs.retrieve("thread_bryKaLUVMmRkQ4YUfvKvnI8h","run_N1TzFgeOTljPnArUU3huFSpa"); 
 console.log(retrieve.status)
    const messages = await openai.beta.threads.messages.list("thread_bryKaLUVMmRkQ4YUfvKvnI8h"); 
console.log(messages)
   const allMesaages = await messages.body.data.map(msg=>{
 return  {role:msg.role,message:msg.content[0].text.value}
   }) 
   
   return allMesaages
}catch(err){console.log(err.message)}
} 

app.post('/api/chatbot', async (req, res) => {
 
 const response = await Doctor()
res.json(response)
});




app.use(cors())
app.use(express.json())
app.listen(2567,()=>{
  console.log("connected")
})