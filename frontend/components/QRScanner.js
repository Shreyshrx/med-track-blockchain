import React, { useState, useEffect, useRef } from "react";

export default function QRScanner({ setBatchId }) {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [camError, setCamError] = useState(null);
  const scannerRef = useRef(null);
  const divId = "qr-reader-div";

  useEffect(() => {
    if (!scanning) return;

    let html5QrCode;

    const startScanner = async () => {
      try {
        const { Html5Qrcode } = await import("html5-qrcode");
        html5QrCode = new Html5Qrcode(divId);
        scannerRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 220, height: 220 } },
          (decodedText) => {
            setBatchId(decodedText);
            setScanned(true);
            setScanning(false);
          },
          () => {} // silence per-frame decode errors
        );
      } catch (err) {
        console.error(err);
        setCamError("Camera access denied or not available on this device.");
        setScanning(false);
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .then(() => scannerRef.current.clear())
          .catch(() => {});
        scannerRef.current = null;
      }
    };
  }, [scanning]);

  const handleStart = () => {
    setScanned(false);
    setCamError(null);
    setScanning(true);
  };

  const handleStop = () => {
    setScanning(false);
  };

  return (
    <div className="qr-scanner-wrapper">
      {!scanning && !scanned && (
        <button className="qr-start-btn" onClick={handleStart}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
            <circle cx="12" cy="13" r="3"/>
          </svg>
          Open Camera to Scan
        </button>
      )}

      {scanning && (
        <div className="qr-active">
          <div className="qr-viewport">
            <div id={divId} style={{ width: "100%" }} />
          </div>
          <p className="qr-hint">Point camera at the medicine QR code</p>
          <button className="qr-stop-btn" onClick={handleStop}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            Cancel Scan
          </button>
        </div>
      )}

      {scanned && (
        <div className="qr-success">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <path d="m9 11 3 3L22 4"/>
          </svg>
          QR Code scanned — Batch ID filled in above.
          <button className="qr-rescan-link" onClick={handleStart}>Scan again</button>
        </div>
      )}

      {camError && (
        <div className="qr-error">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/>
            <line x1="12" x2="12.01" y1="16" y2="16"/>
          </svg>
          {camError}
        </div>
      )}
    </div>
  );
}