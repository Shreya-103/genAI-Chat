import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const askAI = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      setAnswer("");

      const question = prompt;

      const response = await fetch(
        "https://genai-chat-e5c2.onrender.com/api/ai",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: question,
          }),
        }
      );

      const data = await response.json();

      const newCard = {
        prompt: question,
        answer: data.answer,
        date: new Date().toLocaleDateString("en-GB"),
      };

      setCards((prevCards) => [...prevCards, newCard]);
      setCurrentCard(cards.length);
      setAnswer(data.answer);
      setPrompt("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const nextCard = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const previousCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const activeCard = cards[currentCard];

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>

      <header className="header">
        <div className="header-right">
          <div className="header-date">
            {new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>

          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
          >
            {darkMode ? "LIGHT" : "DARK"}
          </button>
        </div>
      </header>

      <main className="main">

        <div className="deck-heading">
          <div>
            <span className="section-label">
              QUESTION ARCHIVE
            </span>

            <p className="deck-count">
              {cards.length === 0
                ? "NO ENTRIES"
                : `${cards.length} ${
                    cards.length === 1 ? "ENTRY" : "ENTRIES"
                  }`}
            </p>
          </div>

          <span className="archive-mark">Q / A</span>
        </div>

        <section className="deck-area">

          <div className="card-stack">

            <div className="card back-card back-card-one"></div>
            <div className="card back-card back-card-two"></div>

            <div className="card main-card">

              <div className="card-header">
                <span>
                  {activeCard
                    ? `ENTRY ${String(currentCard + 1).padStart(3, "0")}`
                    : "NEW ENTRY"}
                </span>

                <span>
                  {activeCard ? activeCard.date : "—"}
                </span>
              </div>

              <div className="card-content">

                {!activeCard && !loading && (
                  <div className="empty-card">
                    <span className="empty-number">001</span>

                    <h2>
                      Start with
                      <br />
                      a question.
                    </h2>

                    <p>
                      Your answers will collect here,
                      one entry at a time.
                    </p>
                  </div>
                )}

                {loading && (
                  <div className="empty-card">
                    <span className="empty-number loading-symbol">
                      ...
                    </span>

                    <h2>Looking into it.</h2>

                    <p>
                      Your new entry is being prepared.
                    </p>
                  </div>
                )}

                {!loading && activeCard && (
                  <div className="entry">

                    <span className="entry-label">
                      QUESTION
                    </span>

                    <h2 className="question">
                      {activeCard.prompt}
                    </h2>

                    <div className="answer">
                      <ReactMarkdown>
                        {activeCard.answer}
                      </ReactMarkdown>
                    </div>

                  </div>
                )}

              </div>

              <div className="card-footer">
                <span>
                  {activeCard
                    ? "INDEX / Q&A"
                    : "INDEX / EMPTY"}
                </span>

                <span>
                  {activeCard
                    ? String(currentCard + 1).padStart(3, "0")
                    : "001"}
                </span>
              </div>

            </div>
          </div>

        </section>

        <div className="navigation">

          <button
            onClick={previousCard}
            disabled={currentCard === 0 || cards.length === 0}
          >
            ←
          </button>

          <div className="card-indicator">
            <span className="current-number">
              {cards.length === 0
                ? "00"
                : String(currentCard + 1).padStart(2, "0")}
            </span>

            <span className="indicator-line"></span>

            <span>
              {String(cards.length).padStart(2, "0")}
            </span>
          </div>

          <button
            onClick={nextCard}
            disabled={
              cards.length === 0 ||
              currentCard === cards.length - 1
            }
          >
            →
          </button>

        </div>

        <section className="input-area">

          <span className="input-number">+</span>

          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Write a question..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                askAI();
              }
            }}
          />

          <button
            onClick={askAI}
            disabled={loading || !prompt.trim()}
          >
            {loading ? "..." : "ADD"}
          </button>

        </section>

      </main>

      <footer>
        <span>INDEX</span>
        <span>QUESTIONS / ANSWERS</span>
        <span>{cards.length} ENTRIES</span>
      </footer>

    </div>
  );
};

export default App;