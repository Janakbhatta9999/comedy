const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const resetBtn = document.getElementById("resetBtn");

const toastArea = document.getElementById("toastArea");

const quizOverlay = document.getElementById("quizOverlay");
const quizQuestion = document.getElementById("quizQuestion");
const optionsDiv = document.getElementById("options");
const quizResult = document.getElementById("quizResult");

const newQBtn = document.getElementById("newQBtn");
const closeQuiz = document.getElementById("closeQuiz");

let noCount = 0;
let quizTriggered = false;

const quizAfter = 6;

const jokes = [
  "Why are you running? 😂",
  "No button said NOPE 😭",
  "Try harder 😈",
  "Mouse skills = 0 💀",
  "Click YES bro 🤡"
];

const yesJokes = [
  "I knew it 🤣",
  "Honesty level 100 😂",
  "Certified nonsense 💀",
  "Welcome to clown world 🤡"
];

const quiz = [
  { q:"∫ 2x dx = ?", o:["x² + C","2x + C","x³ + C","ln(x)"], a:0 },
  { q:"∫ cos(x) dx = ?", o:["sin(x) + C","cos(x)","-sin(x)","-cos(x)"], a:0 },
  { q:"12 × 8 = ?", o:["88","92","96","108"], a:2 },
  { q:"sin²θ + cos²θ = ?", o:["0","1","2","θ"], a:1 }
];

function rand(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

function toast(text){
  const t=document.createElement("div");
  t.className="toast";
  t.innerText=text;
  toastArea.appendChild(t);
  setTimeout(()=>t.remove(),1500);
}

function moveNo(){
  noBtn.style.position="fixed";
  noBtn.style.zIndex="999";

  const x=Math.random()*(window.innerWidth-noBtn.offsetWidth);
  const y=Math.random()*(window.innerHeight-noBtn.offsetHeight);

  noBtn.style.left=x+"px";
  noBtn.style.top=y+"px";

  toast(rand(jokes));
}

function showQuiz(){
  quizOverlay.classList.remove("hidden");
  quizResult.innerText="";
  newQuestion();
}

function newQuestion(){
  optionsDiv.innerHTML="";
  quizResult.innerText="";
  const q=rand(quiz);

  quizQuestion.innerText=q.q;

  q.o.forEach((opt,i)=>{
    const b=document.createElement("button");
    b.innerText=opt;
    b.onclick=()=>{
      if(i===q.a){
        quizResult.innerText="Congrats! You are NOT a noob 😎🔥";
        quizResult.className="result good";
        toast("Brain detected 🧠");
      }else{
        quizResult.innerText="Wrong! Still a noob 😭";
        quizResult.className="result bad";
        toast("Math says NO 💀");
      }
    };
    optionsDiv.appendChild(b);
  });
}

function resetAll(){
  noCount=0;
  quizTriggered=false;
  noBtn.style.position="relative";
  noBtn.style.left="auto";
  noBtn.style.top="auto";
  quizOverlay.classList.add("hidden");
  toast("Reset done 😈");
}

/* EVENTS */
yesBtn.onclick=()=>toast(rand(yesJokes));

noBtn.onmouseenter=()=>{
  noCount++;
  if(noCount>=quizAfter && !quizTriggered){
    quizTriggered=true;
    toast("QUIZ TIME 😈");
    showQuiz();
    return;
  }
  moveNo();
};

resetBtn.onclick=resetAll;
newQBtn.onclick=newQuestion;
closeQuiz.onclick=()=>quizOverlay.classList.add("hidden");
