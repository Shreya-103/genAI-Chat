const ErrorCard = ({ type, onRetry, canRetry }) => {
  const errorMessages = {
    busy: {
      symbol: "!",
      title: "AI is busy.",
      message: "The AI is experiencing high demand right now. Please try again in a moment.",
      button: "TRY AGAIN",
    },
    server: {
      symbol: "×",
      title: "Server unavailable.",
      message: "Our server is temporarily unavailable. Please try again shortly.",
      button: "RETRY",
    },
    request: {
      symbol: "?",
      title: "Invalid request.",
      message: "We couldn't process your question. Please check it and try again.",
      button: "TRY AGAIN",
    },
    network: {
      symbol: "↯",
      title: "Connection problem.",
      message: "We couldn't connect to the server. Please check your internet connection and try again.",
      button: "RECONNECT",
    },
    unknown: {
      symbol: "!",
      title: "Something went wrong.",
      message: "We couldn't prepare your answer right now. Please try again.",
      button: "TRY AGAIN",
    },
  };

  const currentError = errorMessages[type] || errorMessages.unknown;

  return (
    <div className="error-card">
      <span className="error-number"> {currentError.symbol}</span>
      <h2> {currentError.title}</h2>
      <p> {currentError.message} </p>
      <button className="retry-button" onClick={onRetry} disabled={!canRetry}>
        {currentError.button}
      </button>
    </div>
  );
};

export default ErrorCard;
