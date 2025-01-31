import React, { useState, useEffect } from "react";
import OpenAI from "openai";
import "./App.css";

const App: React.FC = () => {
  const [emailText, setEmailText] = useState<string>("");
  const [extractedInfo, setExtractedInfo] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: '', // Replace with your actual API key
    dangerouslyAllowBrowser: true, // Allow usage in the browser
  });

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("emailHistory");
    console.log("Loaded history from localStorage:", savedHistory); // Debugging
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setHistory(parsedHistory);
      } catch (error) {
        console.error("Failed to parse history from localStorage:", error);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes (but not on initial load)
  useEffect(() => {
    if (history.length > 0) { // Only save if history is not empty
      console.log("Saving history to localStorage:", history); // Debugging
      localStorage.setItem("emailHistory", JSON.stringify(history));
    }
  }, [history]);

  // Function to call DeepSeek API for extraction
  const extractEmailInfo = async (text: string): Promise<any | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: 'You are a seller in the packaging industry. Extract information from the email and respond with a JSON object. The JSON object must have the following structure: {"dimensions": "array of numbers (internal dimensions of the box in mm)","fefco_type": "string (FEFCO type of the box)","quantity": "integer (quantity of boxes needed)","destination": "array of strings (destination of the shipment: country, city)","purpose": "string (purpose of the packaging)","weight": "enum (light (<3kg), medium (<=10kg), heavy(>10kg))","color_count": "integer (number of colors required for printing)","colors": "array of strings (list of required colors)","pallet_type": "string (type of pallet required)","printing_technique": "array of strings (list of required printing techniques)"} Rules: 1. If any information is missing, leave the field empty or set it to null. 2. Follow the exact structure and data types specified above. 3. You can not add additional fields. 4. You can not modify the existing fields. 5. If exact information is not present in the email, you can make an educated guess from context. 6. Translate to English if the information is in a different language.' },
          { role: "user", content: text },
        ],
        model: "deepseek-chat",
        temperature: 0.9,
        response_format: { type: "json_object" },
      });

      const content = completion.choices[0].message.content;
      if (!content) {
        throw new Error("No content returned from the API.");
      }

      return JSON.parse(content); // Parse the JSON string into an object
    } catch (error) {
      console.error("Failed to extract email info:", error);
      setError("Failed to extract email info. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const info = await extractEmailInfo(emailText);
    if (info) {
      setExtractedInfo(info);
      setHistory((prevHistory) => [info, ...prevHistory]);
    }
  };

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

      <h2>History</h2>
      {history.length > 0 ? (
        <ul className="history-list">
          {history.map((item, index) => (
            <li key={index} className="history-item">
              <pre className="info-display">
                {JSON.stringify(item, null, 2)}
              </pre>
            </li>
          ))}
        </ul>
      ) : (
        <p>No history yet.</p>
      )}
    </div>
  );
};

export default App;