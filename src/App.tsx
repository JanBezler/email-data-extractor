import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomeView from "./views/HomeView";
import HistoryView from "./views/HistoryView";
import InfoView from "./views/InfoView";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/history" className="nav-link">
          History
        </Link>
        <Link to="/info" className="nav-link">
          General Info
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/history" element={<HistoryView />} />
        <Route path="/info" element={<InfoView />} />
      </Routes>
    </Router>
  );
};

export default App;