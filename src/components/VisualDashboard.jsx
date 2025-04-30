// src/components/VisualDashboard.jsx

import React, { useEffect, useState } from "react";
import TestCard from "./TestCard.jsx";
import Modal from "./Modal.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import Header from "./Header.jsx";
import PieChart from "../charts/PieChart.jsx";
import SidebarMenu from "./SidebarMenu";
import "../visual.css";

const supabaseUrl =
  "https://ocpaxmghzmfbuhxzxzae.supabase.co/storage/v1/object/public/visual-dashboard-json/merged-results.json";

async function fetchData() {
  try {
    const response = await fetch(supabaseUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const jsonData = await response.json();
    console.log("Data loaded:", jsonData);
    return jsonData;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
}

// Usage
const testData = await fetchData(); // Store in constant
console.log(testData); // Your JSON data

const VisualDashboard = () => {
  const [modalImage, setModalImage] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [statusFilter, setStatusFilter] = useState(null);
  const [deviceFilter, setDeviceFilter] = useState(null);
  const [brandFilter, setBrandFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const passed = testData.filter((t) => t.status === "passed").length;
  const failed = testData.filter((t) => t.status === "failed").length;

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.body.className = theme === "light" ? "light-mode" : "dark-mode";
  }, [theme]);

  const handleViewImage = (url) => {
    setModalImage(url);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const clearFilters = () => {
    setStatusFilter(null);
    setDeviceFilter(null);
    setBrandFilter(null);
    setSearchTerm("");
  };

  const filteredData = testData.filter((t) => {
    // Search by test name
    if (
      searchTerm &&
      !t.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Filter by status
    if (statusFilter && t.status !== statusFilter.toLowerCase()) {
      return false;
    }

    // Filter by device
    if (deviceFilter && t.device !== deviceFilter) {
      return false;
    }

    // Filter by brand
    if (brandFilter && t.brand !== brandFilter) {
      return false;
    }

    return true;
  });

  return (
    <div>
      <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
      <SidebarMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <button
        className="hamburger-button"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open menu"
      >
        ☰
      </button>
      <Header title="Visual Test Dashboard" />

      <PieChart
        passed={passed}
        failed={failed}
        onSliceClick={(status) => setStatusFilter(status)}
      />

      <div
        className="filters-container"
        style={{
          margin: "1rem 0",
          textAlign: "center",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {/* Search by Test Name */}
        <div className="search-wrapper">
          <label htmlFor="test-search" style={{ marginRight: "10px" }}>
            Search Test Name:
          </label>
          <input
            type="text"
            id="test-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: "5px" }}
            placeholder="Search by test name"
          />
        </div>

        {/* Filter by Device */}
        <div className="device-select-wrapper">
          <label htmlFor="device-select" style={{ marginRight: "10px" }}>
            Filter by Device:
          </label>
          <select
            id="device-select"
            value={deviceFilter || ""}
            onChange={(e) => setDeviceFilter(e.target.value || null)}
            style={{ padding: "8px 12px", borderRadius: "5px" }}
          >
            <option value="">All Devices</option>
            {[...new Set(testData.map((t) => t.device))].map((device) => (
              <option key={device} value={device}>
                {device}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Brand */}
        {/* <div className="brand-select-wrapper">
          <label htmlFor="brand-select" style={{ marginRight: "10px" }}>
            Filter by Brand:
          </label>
          <select
            id="brand-select"
            value={brandFilter || ""}
            onChange={(e) => setBrandFilter(e.target.value || null)}
            style={{ padding: "8px 12px", borderRadius: "5px" }}
          >
            <option value="">All Brands</option>
            {[...new Set(testData.map((t) => t.brand))].map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div> */}

        {/* Filter by Test Status */}
        <div className="status-select-wrapper">
          <label htmlFor="status-select" style={{ marginRight: "10px" }}>
            Filter by Status:
          </label>
          <select
            id="status-select"
            value={statusFilter || ""}
            onChange={(e) => setStatusFilter(e.target.value || null)}
            style={{ padding: "8px 12px", borderRadius: "5px" }}
          >
            <option value="">All Statuses</option>
            <option value="passed">Passed</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        {(searchTerm || deviceFilter || brandFilter || statusFilter) && (
          <div style={{ width: "100%", textAlign: "center" }}>
            <button
              onClick={clearFilters}
              style={{
                padding: "0.5rem 1rem",
                marginTop: "0.5rem",
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      <div
        className="test-card column-labels"
        style={{ marginTop: "2rem", fontWeight: 600 }}
      >
        <span>Test Name</span>
        <span>Device</span>
        <span>Difference Image</span>
        <span>Test Status</span>
      </div>

      {filteredData.map((test, idx) => (
        <TestCard key={idx} test={test} onViewImage={handleViewImage} />
      ))}

      {modalImage && <Modal imageUrl={modalImage} onClose={closeModal} />}
    </div>
  );
};

export default VisualDashboard;