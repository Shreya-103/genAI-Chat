const express = require("express");
require('dotenv').config();
const {GoogleGenAI} = require("@google/genai");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const ai = new GoogleGenAI({
    apiKey : process.env.GEMINI_API_KEY
});

app.post("/api/ai", async (req, res)=>{
    try{
        const {prompt} = req.body;
        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt
        });
        res.setHeader("Content-Type", "text/plain");
         for await (const chunk of response) {
             res.write(chunk.text); 
         }   res.end();
    } catch(error){
        console.error(error);
        res.status(500).json({
            message: "Something went wrong"
        });

    }
});

module.exports = app;