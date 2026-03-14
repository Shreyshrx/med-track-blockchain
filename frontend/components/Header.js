import React from "react";

export default function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-icon">
          {/* Pill icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
            <path d="m8.5 8.5 7 7"/>
          </svg>
        </div>
        <span className="header-title">
          MED<span>-</span>TRACK
        </span>
      </div>
      <div className="header-badge">Verification Portal</div>
    </header>
  );
}
