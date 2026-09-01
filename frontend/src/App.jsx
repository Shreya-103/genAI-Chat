// import { useState } from "react";
// import ReactMarkdown from "react-markdown";

// const App = ()=>{
// const [prompt, setPrompt] = useState("");
// const [answer, setAnswer] = useState("");
// const [loading, setLoading] = useState(false);

// const askAI = async ()=>{
//   try{
//     setLoading(true);
//     setAnswer("");
//     const response = await fetch("https://genai-chat-e5c2.onrender.com/api/ai", {
//       method: "POST",
//       headers:{
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         prompt: prompt,
//       }),
//     });
//     const data = await response.json();
//     setAnswer(data.answer);
//   } catch(err){
//     console.error(err);
//   } finally{
//     setLoading(false);
//   }
// }

//   return(
//     <div className="container">
//       <h1>GenAI Chat</h1>
//       <input type="text" value={prompt} onChange={(e)=>
//         setPrompt(e.target.value)}
//        placeholder= "Ask something...." />
//        <button onClick={askAI}>Ask AI</button>
//        {loading && <p>Ai is thinking....</p>}
//        {!loading && answer && (
//                  <ReactMarkdown>{answer}</ReactMarkdown>
//        )}
//            </div>
//   )
// }

// export default App;
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    try {
      setLoading(true);
      setAnswer("");

      const response = await fetch(
        "https://genai-chat-e5c2.onrender.com/api/ai",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: prompt,
          }),
        }
      );

      const data = await response.json();
      setAnswer(data.answer);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo"> <span>✦</span> GenAI</div>
        <p>KNOWLEDGE DECK</p>
      </header>

      <main className="main">
        <section className="intro">
          <p className="eyebrow">YOUR AI DECK</p>
          <h1>Ask. <br /><em>Discover.</em></h1>
          <p className="intro-text">Turn your questions into cards of knowledge.</p>
        </section>

        <section className="deck-area">
          <div className="card-stack">
            <div className="card back-card back-card-one"></div>
            <div className="card back-card back-card-two"></div>
            <div className="card main-card">
              <div className="card-header">
                <span>GENAI</span>
                <span>001</span>
              </div>

              <div className="card-content">
                {!answer && !loading && (
                  <>
                    <span className="card-symbol"> ✦</span>
                    <h2>What would <br />you like to know? </h2>
                    <p>Ask anything and create your first knowledge car </p>
                  </>
                )}

                {loading && (
                  <>
                    <span className="card-symbol loading-symbol"> ✦ </span>
                    <h2>Thinking... </h2>
                    <p> Your answer is being prepared.</p>
                  </>
                )}

                {!loading && answer && (
                  <>
                    <span className="question-label">
                      YOUR QUESTION
                    </span>

                    <h2 className="question"> {prompt} </h2>
                    <div className="answer">
                      <ReactMarkdown>{answer}</ReactMarkdown>
                    </div>
                  </>
                )}
              </div>

              <div className="card-footer">
                <span>KNOWLEDGE DECK</span>
                <span>01</span>
              </div>
            </div>
          </div>
        </section>

        <section className="input-area">
          <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask something..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                askAI();
              }
            }} />
          <button onClick={askAI}><span>ASK</span><span>→</span></button>
        </section>

        <div className="navigation">
          <button> ← </button>
          <span> 01 / 01 </span>
          <button>→</button>
        </div>
      </main>

      <footer>
        <span>Used GEMINI api for the project</span>
        {/* <span> AI · KNOWLEDGE · CURIOSITY </span> */}
      </footer>

    </div>
  );
};

export default App;