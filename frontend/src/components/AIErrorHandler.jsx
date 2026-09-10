import ErrorCard from "./ErrorCard";

const AIErrorHandler = ({ error, onRetry, canRetry }) => {
  if (!error) {
    return null;
  }
  let errorType = "unknown";
  // network error
  if (!error.response) {
    errorType = "network";
  }
  // rate limit
  else if (error.response.status === 429) {
    errorType = "busy";
  }
  // service unavailable
  else if (error.response.status === 503) {
    errorType = "server";
  }
  // server error
  else if (error.response.status === 500) {
    errorType = "server";
  }
  // bad request
  else if (error.response.status === 400) {
    errorType = "request";
  }

  return (
    <ErrorCard type={errorType} onRetry={onRetry} canRetry={canRetry} />
  );
};

export default AIErrorHandler;
