import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import QRScanner from "./components/QRScanner";
import Header from "./components/Header";
import BatchInput from "./components/BatchInput";
import MedicineCard from "./components/MedicineCard";
import StatusBanner from "./components/StatusBanner";
import "./App.css";

function App() {
  const [batchId, setBatchId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const verifyMedicine = async () => {
    if (!batchId.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await axios.get(`http://localhost:5000/verify/${batchId}`);
      setResult(res.data);
    } catch (err) {
      setError("Unable to fetch medicine data. Please check the Batch ID.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <BatchInput
          batchId={batchId}
          setBatchId={setBatchId}
          onVerify={verifyMedicine}
          loading={loading}
        />

        <div className="scanner-section">
          <div className="section-label">
            <span className="section-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/>
                <rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/>
                <path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/>
                <path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/>
                <path d="M12 21v-1"/>
              </svg>
            </span>
            Scan QR Code
          </div>
          <QRScanner setBatchId={setBatchId} />
        </div>

        {error && (
          <div className="error-banner">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/>
              <line x1="12" x2="12.01" y1="16" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        {loading && (
          <div className="loading-state">
            <div className="spinner" />
            <span>Verifying batch...</span>
          </div>
        )}

        {result && (
          <div className="result-section">
            <StatusBanner status={result.status} />
            {result.medicine ? (
              <MedicineCard medicine={result.medicine} />
            ) : (
              <div className="not-found">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                  <line x1="2" x2="22" y1="2" y2="22"/>
                </svg>
                <p>No medicine record found for this Batch ID.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);