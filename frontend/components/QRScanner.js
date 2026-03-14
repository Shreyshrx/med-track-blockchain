import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function QRScanner({ setBatchId }) {

useEffect(() => {

const scanner = new Html5QrcodeScanner(
"reader",
{ fps: 10, qrbox: 250 }
);

scanner.render(
(result) => {
setBatchId(result);
scanner.clear();
},
(error) => {}
);

}, []);

return <div id="reader" style={{width:"300px"}}></div>;

}

export default QRScanner;