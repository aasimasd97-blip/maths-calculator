let display;

function saveName(){

const name = document.getElementById("username").value;

localStorage.setItem("username",name);

window.location.href="welcome.html";

}

function startCalculator(){

window.location.href="calculator.html";

}

window.onload = function(){

const name = localStorage.getItem("username");

if(document.getElementById("welcomeMessage")){

document.getElementById("welcomeMessage").innerText =
"Welcome " + name + " 👋";

}

if(document.getElementById("userDisplay")){

document.getElementById("userDisplay").innerText =
"User: " + name;

display = document.getElementById("display");

loadHistory();

}

}

function press(value){

display.value += value;

}

function clearDisplay(){

display.value="";

}

async function calculate(){

const expression = display.value;

const result = eval(expression);

display.value=result;

const username = localStorage.getItem("username");

await fetch("http://localhost:5000/calculate",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

username:username,
expression:expression,
result:result

})

});

loadHistory();

}

async function loadHistory(){

const res = await fetch("http://localhost:5000/history");

const data = await res.json();

const list = document.getElementById("history");

list.innerHTML="";

data.forEach(item=>{

const li = document.createElement("li");

li.innerText =
item.username+" : "+item.expression+" = "+item.result;

list.appendChild(li);

});

}