const gen = document.getElementById("btn-1");
const iter = document.getElementById("txt-1");
const flips = document.getElementById("txt-2");
const pro1 = document.getElementById("progress-1");
const timer = document.getElementById("timer");
const timer2 = document.getElementById("timer2");
const time = Date.now();

let iterations;
let numOfFlips;
let time1;
const pmfArry = [];

// Make this function recursive and reduce the iterations on each recursion
// Check for last recursion
// If last recursion, Then set timer2
const pmf = () => {
  for (let i = 0; i < its; i++) {
    let count = 0;
    for (let j = 0; j < nof; j++) {
      let a = Math.floor(2 * Math.random());
      count = count + a;
    }
    pmfArray[count] = pmfArray[count] + 1;
  }
  timer2.innerHTML = `Total Run Time: ${(Date.now() - time1) / 1000}`;
  console.log("running it");
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
  pmfArray.length = nof;
  pmfArray.fill(0);
  pmf();
};

// This adds a seconds
setInterval(() => {
  timer.innerHTML = `Seconds: ${(Date.now() - time) / 1000}`;
}, 40);

gen.addEventListener("click", flipper);
