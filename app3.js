const gen = document.getElementById("btn-1");
const iter = document.getElementById("txt-1");
const flips = document.getElementById("txt-2");
const pro1 = document.getElementById("progress-1");
const timer = document.getElementById("timer");
const timer2 = document.getElementById("timer2");
const time = Date.now();
const pro2 = document.getElementById("myBar");

// Initialize web worker
const webWorker = new Worker("./worker2.js");

let iterations;
let numOfFlips;
let time1;

// Passes messages between app and webWorker
// Also Updates the DOM
const pmf = () => {
  webWorker.postMessage({ iterations, numOfFlips });
  webWorker.onmessage = (e) => {
    pro1.value = e.data.done;
    pro2.style.width = e.data.done + "%";
    pro2.innerHTML = e.data.done + "%";
    if (e.data.done === 100) {
      timer2.innerHTML = `Total Run Time: ${(Date.now() - time1) / 1000}`;
      console.log(e.data.pmfArray);
      console.log(e.data.pmfArray.reduce((e, c) => e + c));
    }
  };
};

const flipper = (e) => {
  time1 = Date.now();
  // Looks like disabling a button has the same effect and removing the event listener
  // The advantage is that the callback function need not be named to make this approach work
  gen.disabled = true;
  pro1.style = "display: visible";
  pro1.value = 0;
  //  gen.removeEventListener("click", flipper);
  iterations = Number(iter.value);
  numOfFlips = Number(flips.value);
  pmf();
};

// This adds seconds
setInterval(() => {
  timer.innerHTML = `Seconds: ${(Date.now() - time) / 1000}`;
}, 40);

gen.addEventListener("click", flipper);
