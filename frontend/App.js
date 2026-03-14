import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import QRScanner from "./components/QRScanner";

function App(){

const [batchId,setBatchId] = useState("");
const [result,setResult] = useState(null);

const verifyMedicine = async () => {

 if(!batchId) return;

 try{
   const res = await axios.get(`http://localhost:5000/verify/${batchId}`);
   setResult(res.data);
 }catch(err){
   console.error(err);
 }

};

return(

<div style={{padding:40,fontFamily:"Arial"}}>

<h1>💊 MED-TRACK Medicine Verification</h1>

<h3>Enter Batch ID</h3>

<input
value={batchId}
onChange={(e)=>setBatchId(e.target.value)}
placeholder="Batch ID"
style={{padding:"8px"}}
/>

<button onClick={verifyMedicine} style={{marginLeft:"10px"}}>
Verify
</button>

<h3 style={{marginTop:"30px"}}>Scan QR Code</h3>

<QRScanner setBatchId={setBatchId}/>

{/* Verification Result */}

{result && (

<div style={{marginTop:30}}>

<h2>Status: {result.status}</h2>

{result.medicine ? (

<div>

<p><b>Batch:</b> {result.medicine.batchId}</p>
<p><b>Name:</b> {result.medicine.name}</p>
<p><b>Manufacturer:</b> {result.medicine.manufacturer}</p>

{/* Supply Chain Timeline */}

<h3 style={{marginTop:"25px"}}>📦 Supply Chain Timeline</h3>

{result.medicine.history && result.medicine.history.map((step,index)=>(

<div
key={index}
style={{
border:"1px solid #ccc",
padding:"10px",
margin:"8px 0",
borderRadius:"6px",
background:"#f9f9f9"
}}
>

<p><b>Stage:</b> {step.stage}</p>
<p><b>Location:</b> {step.location}</p>
<p><b>Time:</b> {step.time}</p>

</div>

))}

</div>

) : (

<p>Medicine not found.</p>

)}

</div>

)}

</div>

);

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);