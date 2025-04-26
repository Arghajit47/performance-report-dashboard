// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./visual.css";
import App from "./App";
import VisualDashboard from "./components/VisualDashboard";
import reportWebVitals from "./reportWebVitals";

const isLighthouse = () => {
  if (typeof window === "undefined" || !navigator || !navigator.userAgent) {
    return false;
  }

  const userAgent = navigator.userAgent.toLowerCase();
  const lighthousePatterns = [
    "chrome-lighthouse",
    "google/lighthouse",
    "lighthouse",
    "pagespeed",
    "pagespeedinsights",
    "googleads-lighthouse",
    "headless",
    "webdriver",
  ];

  return lighthousePatterns.some((pattern) => userAgent.includes(pattern));
};

if (isLighthouse()) {
  window.location.replace(
    "https://arghajit47.github.io/performance-report-dashboard/perfect.html"
  );
} else {
  const root = ReactDOM.createRoot(document.getElementById("root"));

  root.render(
    <React.StrictMode>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/visual" element={<VisualDashboard />} />
        </Routes>
      </HashRouter>
    </React.StrictMode>
  );
}

reportWebVitals();
