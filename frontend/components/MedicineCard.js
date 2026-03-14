import React from "react";

function TimelineStep({ step, index }) {
  return (
    <div className="timeline-step">
      <div className="timeline-dot">
        {/* Package icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
          <path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>
        </svg>
      </div>
      <div className="timeline-content">
        <div className="timeline-stage">{step.stage}</div>
        <div className="timeline-meta">
          <span className="timeline-meta-item">
            {/* MapPin icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            {step.location}
          </span>
          <span className="timeline-meta-item">
            {/* Clock icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {step.time}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function MedicineCard({ medicine }) {
  return (
    <div className="medicine-card">
      <div className="medicine-card-header">
        <div className="medicine-card-icon">
          {/* Pill icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
            <path d="m8.5 8.5 7 7"/>
          </svg>
        </div>
        <div className="medicine-card-title">
          <h2>{medicine.name}</h2>
          <p>Batch #{medicine.batchId}</p>
        </div>
      </div>

      <div className="medicine-card-body">
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Manufacturer</span>
            <span className="info-value">{medicine.manufacturer}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Batch ID</span>
            <span className="info-value" style={{ fontFamily: "'DM Mono', monospace", fontSize: 13 }}>
              {medicine.batchId}
            </span>
          </div>
          {medicine.expiry && (
            <div className="info-item">
              <span className="info-label">Expiry Date</span>
              <span className="info-value">{medicine.expiry}</span>
            </div>
          )}
          {medicine.dosage && (
            <div className="info-item">
              <span className="info-label">Dosage</span>
              <span className="info-value">{medicine.dosage}</span>
            </div>
          )}
        </div>

        {medicine.history && medicine.history.length > 0 && (
          <>
            <div className="timeline-title">
              {/* Truck icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
                <path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
                <circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>
              </svg>
              Supply Chain Timeline
            </div>
            <div className="timeline">
              {medicine.history.map((step, index) => (
                <TimelineStep key={index} step={step} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
