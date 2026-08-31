import { useState } from "react";
import ReactMarkdown from "react-markdown";

const App = ()=>{
const [prompt, setPrompt] = useState("");
const [answer, setAnswer] = useState("");
const askAI = async ()=>{
  try{
    const response = await fetch("http://localhost:3000/api/ai", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    });
    const data = await response.json();
    setAnswer(data.answer);
  } catch(err){
    console.error(err);
  }
}

  return(
    <div className="container">
      <h1>GenAI Chat</h1>
      <input type="text" value={prompt} onChange={(e)=>
        setPrompt(e.target.value)}
       placeholder= "Ask something...." />
       <button onClick={askAI}>Ask AI</button>
       <ReactMarkdown>{answer}</ReactMarkdown>
    </div>
  )
}

export default App;