const gen = document.getElementById("btn-1");
const iter = document.getElementById("txt-1");
const flips = document.getElementById("txt-2");
const pro1 = document.getElementById("progress-1");
const timer = document.getElementById("timer");
const timer2 = document.getElementById("timer2");
const time = Date.now();
const pro2 = document.getElementById("myBar");

let iterations;
let delta;
let numOfFlips;
let time1;
const pmfArray = [];

// Make this function recursive and reduce the iterations on each recursion
// Check for last recursion
// If last recursion, Then set timer2
const pmf = () => {
  for (let i = 0; i < delta; i++) {
    let count = 0;
    for (let j = 0; j < numOfFlips; j++) {
      let a = Math.floor(2 * Math.random());
      count = count + a;
    }
    pmfArray[count] = pmfArray[count] + 1;
  }
  iterations = iterations - delta;
  console.log(iterations);
  if (iterations <= 0) {
    pro1.value = 100;
    pro2.style.width = "100%";
    pro2.innerHTML = "100%";
    timer2.innerHTML = `Total Run Time: ${(Date.now() - time1) / 1000}`;
    console.log(pmfArray);
    return;
  } else {
    pro1.value = pro1.value + 1;
    pro2.style.width = pro1.value + "%";
    pro2.innerHTML = pro1.value + "%";
    setTimeout(pmf, 0);
  }
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
  delta = iterations / 100;
  pmfArray.length = numOfFlips;
  pmfArray.fill(0);
  pmf();
};

// This adds seconds
setInterval(() => {
  timer.innerHTML = `Seconds: ${(Date.now() - time) / 1000}`;
}, 40);

gen.addEventListener("click", flipper);
