import axios from "axios";

export async function askAI(question, medicineData){

const res = await axios.post("http://localhost:5000/askAI",{
 question:question,
 medicine:medicineData
});

return res.data.answer;

}