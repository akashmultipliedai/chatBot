import "dotenv/config"
import express from "express"
import cors from "cors"
import { handleuserMessage } from "./functions/handleuserMesage.js";


const app=express();
app.use(cors());
app.use(express.json());


app.post("/chat",async (req,res)=>{
    try{
    const { message, userId } = req.body;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control","no-cache");
    res.setHeader("Connection","Keep-alive");
    res.flushHeaders;

    await handleuserMessage(userId,message,res);


    res.write("data:[Done]\n\n");
    res.end();
     
    }catch(error){
        console.log(error);
    }
    
})


app.listen(3000,()=>{
    console.log("server is running on post 3000")
})


//  hello my name is akash Kumar dalag and age 25 and i am from the organizaton Intracom and my email id is akash@gmail.com