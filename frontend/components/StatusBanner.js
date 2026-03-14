import React from "react";

const statusConfig = {
  verified: {
    className: "verified",
    label: "Medicine Verified",
    description: "This batch is authentic and approved.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
  },
  unverified: {
    className: "unverified",
    label: "Verification Failed",
    description: "This batch could not be verified. Do not consume.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
        <line x1="9" x2="15" y1="9" y2="15"/><line x1="15" x2="9" y1="9" y2="15"/>
      </svg>
    ),
  },
  pending: {
    className: "pending",
    label: "Verification Pending",
    description: "This batch is currently under review.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
};

export default function StatusBanner({ status }) {
  const key = (status || "").toLowerCase();
  const config = statusConfig[key] || {
    className: "pending",
    label: status || "Unknown",
    description: "Status could not be determined.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
      </svg>
    ),
  };

  return (
    <div className={`status-banner ${config.className}`}>
      <div className="status-icon">{config.icon}</div>
      <div>
        <div style={{ fontWeight: 700 }}>{config.label}</div>
        <div style={{ fontSize: 13, fontWeight: 400, opacity: 0.8, marginTop: 2 }}>
          {config.description}
        </div>
      </div>
    </div>
  );
}
