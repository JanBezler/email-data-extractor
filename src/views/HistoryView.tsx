import React from "react";
import useEmailExtractor from "../hooks/useEmailExtractor";

const HistoryView: React.FC = () => {
  const { history, clearHistory } = useEmailExtractor();

  return (
    <div className="app">
      <h1 className="app-title">History</h1>
      {history.length > 0 ? (
        <>
          <button onClick={clearHistory} className="clear-history-button">
            Clear History
          </button>
          <ul className="history-list">
            {history.map((item, index) => (
              <li key={index} className="history-item">
                <p className="history-date">
                  <strong>Created At:</strong> {item.createdAt}
                </p>
                <pre className="info-display">
                  {JSON.stringify(item, null, 2)}
                </pre>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No history yet.</p>
      )}
    </div>
  );
};

export default HistoryView;