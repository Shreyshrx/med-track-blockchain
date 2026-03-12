
import React, {useState} from "react";
import axios from "axios";

function App(){

const [batch,setBatch] = useState("");
const [result,setResult] = useState(null);

const verify = async () => {
 const res = await axios.get(`http://localhost:5000/verify/${batch}`);
 setResult(res.data);
}

return (
<div style={{padding:40}}>
<h1>Medicine Verification</h1>

<input
placeholder="Enter Batch ID"
value={batch}
onChange={(e)=>setBatch(e.target.value)}
/>

<button onClick={verify}>Verify</button>

{result && (
<pre>{JSON.stringify(result,null,2)}</pre>
)}

</div>
)
}

export default App;
