const { OpenAI } = require("openai")
const User = require("../models/userRegister"); 
require("dotenv").config();


const OPENAI_API_KEY3 = process.env.OPENAI_API_KEY3 ;  
const ORGANIZATION = process.env.ORGANIZATION;
const ASSISTANT_ID = process.env.ASSISTANT_ID;
const INSTRUCTIONS = "You only answer health questions.";


const openai = new OpenAI({
  organization: ORGANIZATION,
  apiKey:OPENAI_API_KEY3
})

const registerUser = async (req,res)=>{ 
  const {name,email} = req.body
  try{
    console.log(name,email)
    const thread = await openai.beta.threads.create()
    const user = new User({name,email,thread:thread.id}) 
    const save = await user.save()
    
    res.json(save)
  }catch(err){
    res.status(500).json({error: err.message})
  };
};  


const getUser = async (req,res)=>{
  const name = req.params.name 
  try{
  const user = await User.findOne({name}) 
 
  res.status(200).json(user)
  }catch(err){
    res.status(500).json({error: "server failed while trying to fetch user details"}) 
    console.log("getuser___ ",err.message)
  }
}; 


const askQiestions = async (req,res)=>{
  const {name,email,thread,messageEl} = req.body 
  
  try{
    
    const messages = await openai.beta.threads.messages.create(
      thread,
      {
        role:"user",
        content: messageEl,
      }
      ); 
      
      const run = await openai.beta.threads.runs.create(
        thread,
        {
          assistant_id:ASSISTANT_ID,
          instructions:INSTRUCTIONS
        }
        ); 
        
        while(run.status!=="completed"){
        const retrieve = await openai.beta.threads.runs.retrieve(thread,run.id); 
        if(retrieve.status==="completed"){
          break;
        }
        }
        console.log(run.status)
       
          
          const chatMessages = await openai.beta.threads.messages.list(thread);
          const allMessages = chatMessages.body.data.map(msg=>{
            return   {role:msg.role,message:msg.content[0].text.value}
          });
          res.status(200).json(allMessages)

    
  }catch(err){
    res.status(500).json({error:"failed while sending message"}) 
    
    console.log(err.message)
  }
}

module.exports = {registerUser,getUser,askQiestions}