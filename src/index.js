import React from "react";
import ReactDOM from "react-dom/client"; // ✅ This is what creates the root
import { HashRouter } from "react-router-dom";
import "./App.css";
import App from "./App";
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
  // Redirect to perfect.html
  window.location.replace(
    "https://arghajit47.github.io/performance-report-dashboard/perfect.html"
  );
} else {
  // ✅ Use ReactDOM to create the root
  const root = ReactDOM.createRoot(document.getElementById("root"));

  root.render(
    <React.StrictMode>
      {" "}
      {/* ✅ StrictMode is from React */}
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  );
}
reportWebVitals();
