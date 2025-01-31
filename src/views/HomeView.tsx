import React from "react";
import useEmailExtractor from "../hooks/useEmailExtractor";

const HomeView: React.FC = () => {
  const {
    emailText,
    setEmailText,
    extractedInfo,
    isLoading,
    error,
    handleSubmit,
  } = useEmailExtractor();

  return (
    <div className="app">
      <h1 className="app-title">Email Info Extractor</h1>
      <form onSubmit={handleSubmit} className="email-form">
        <textarea
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
          placeholder="Paste your email text here..."
          className="email-input"
        />
        <br />
        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? "Extracting..." : "Extract Info"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {extractedInfo && (
        <div className="extracted-info">
          <h2>Extracted Info</h2>
          <pre className="info-display">
            {JSON.stringify(extractedInfo, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default HomeView;