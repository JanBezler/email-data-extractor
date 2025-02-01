// src/hooks/useEmailExtractor.ts
import { useState, useEffect } from "react";
import OpenAI from "openai";

const useEmailExtractor = () => {
  const [emailText, setEmailText] = useState<string>("");
  const [extractedInfo, setExtractedInfo] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [openai, setOpenai] = useState<OpenAI | null>(null);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await fetch("/api.key");
        const apiKey = await response.text();
        const openaiInstance = new OpenAI({
          baseURL: 'https://api.deepseek.com',
          apiKey: apiKey.trim(),
          dangerouslyAllowBrowser: true,
        });
        setOpenai(openaiInstance);
      } catch (error) {
        console.error("Failed to load API key:", error);
      }
    };

    fetchApiKey();
  }, []);

  useEffect(() => {
    const savedHistory = localStorage.getItem("emailHistory");
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setHistory(parsedHistory);
      } catch (error) {
        console.error("Failed to parse history from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("emailHistory", JSON.stringify(history));
    } else {
      localStorage.removeItem("emailHistory");
    }
  }, [history]);

  const extractEmailInfo = async (text: string): Promise<any | null> => {
    if (!openai) {
      setError("API key not loaded. Please try again later.");
      return null;
    }

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

      const parsedContent = JSON.parse(content);
      const historyItem = { ...parsedContent, createdAt: new Date().toLocaleString() };
      return historyItem;
    } catch (error) {
      console.error("Failed to extract email info:", error);
      setError("Failed to extract email info. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const info = await extractEmailInfo(emailText);
    if (info) {
      setExtractedInfo(info);
      setHistory((prevHistory) => [info, ...prevHistory]);
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    emailText,
    setEmailText,
    extractedInfo,
    history,
    isLoading,
    error,
    handleSubmit,
    clearHistory,
  };
};

export default useEmailExtractor;