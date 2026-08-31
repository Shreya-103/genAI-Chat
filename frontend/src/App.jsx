import { useState } from "react";
import ReactMarkdown from "react-markdown";

const App = ()=>{
const [prompt, setPrompt] = useState("");
const [answer, setAnswer] = useState("");
const [loading, setLoading] = useState(false);

const askAI = async ()=>{
  try{
    setLoading(true);
    setAnswer("");
    const response = await fetch("https://genai-chat-e5c2.onrender.com/api/ai", {
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
  } finally{
    setLoading(false);
  }
}

  return(
    <div className="container">
      <h1>GenAI Chat</h1>
      <input type="text" value={prompt} onChange={(e)=>
        setPrompt(e.target.value)}
       placeholder= "Ask something...." />
       <button onClick={askAI}>Ask AI</button>
       {loading && <p>Ai is thinking....</p>}
       {!loading && answer && (
                 <ReactMarkdown>{answer}</ReactMarkdown>
       )}
           </div>
  )
}

export default App;