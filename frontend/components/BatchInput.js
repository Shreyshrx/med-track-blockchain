import React from "react";

export default function BatchInput({ batchId, setBatchId, onVerify, loading }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onVerify();
  };

  return (
    <div className="batch-input-card">
      <div className="section-label">
        <span className="section-icon">
          {/* Search icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
        </span>
        Verify by Batch ID
      </div>

      <div className="input-row">
        <input
          className="batch-input-field"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. BATCH-20240315-XY9"
        />
        <button
          className="verify-btn"
          onClick={onVerify}
          disabled={loading || !batchId.trim()}
        >
          {loading ? (
            <>
              <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
              Checking...
            </>
          ) : (
            <>
              {/* Shield check icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
              Verify
            </>
          )}
        </button>
      </div>
    </div>
  );
}
