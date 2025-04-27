// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // changed to BrowserRouter
import "./visual.css";
import App from "./App";
import VisualDashboard from "./components/VisualDashboard";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      {/* changed to BrowserRouter */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/visual" element={<VisualDashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
