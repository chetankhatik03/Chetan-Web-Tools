const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");
const convertBtn = document.getElementById("convertBtn");
const resultText = document.getElementById("resultText");
const progress = document.getElementById("progress");

let images = [];

dropArea.addEventListener("click",()=>{
fileInput.click();
});

fileInput.addEventListener("change",(e)=>{
images = Array.from(e.target.files);
});

dropArea.addEventListener("dragover",(e)=>{
e.preventDefault();
});

dropArea.addEventListener("drop",(e)=>{
e.preventDefault();
images = Array.from(e.dataTransfer.files);
});

convertBtn.addEventListener("click", async ()=>{

resultText.value = "";

for(let i=0;i<images.length;i++){

progress.innerText = "Processing Image " + (i+1);

const { data:{ text } } = await Tesseract.recognize(
images[i],
"eng",
{
logger:m=>{
if(m.status==="recognizing text"){
progress.innerText =
"Progress: "+Math.round(m.progress*100)+"%";
}
}
});

resultText.value += text + "\n\n";

}

progress.innerText = "Completed";

});

document.getElementById("pdfBtn").addEventListener("click",()=>{

const { jsPDF } = window.jspdf;

let doc = new jsPDF();

let text = resultText.value;

let lines = doc.splitTextToSize(text,180);

doc.text(lines,10,10);

doc.save("converted-text.pdf");

});

document.getElementById("clearBtn").addEventListener("click",()=>{
resultText.value="";
progress.innerText="";
});

document.getElementById("darkMode").addEventListener("click",()=>{
document.body.classList.toggle("dark");
});