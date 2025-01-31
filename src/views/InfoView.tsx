import React from "react";

const InfoView: React.FC = () => {
  return (
    <div className="app">
      <h1 className="app-title">General Info</h1>
      <p>This app helps you extract information from emails.</p>
      <p>Features:</p>
      <ul>
        <li>Extract email info using DeepSeek API.</li>
        <li>View extraction history.</li>
      </ul>
    </div>
  );
};

export default InfoView;