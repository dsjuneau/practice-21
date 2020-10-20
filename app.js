const gen = document.getElementById("btn-1");
const iter = document.getElementById("txt-1");
const flips = document.getElementById("txt-2");
const pro1 = document.getElementById("progress-1");

const flipper = (e) => {
  // Looks like disabling a button has the same effect and removing the event listener
  // The advantage is that the callback function need not be named to make this approach work
  gen.disabled = true;
  pro1.style = "display: visible";
  pro1.value = 0;
  //   gen.removeEventListener("click", flipper);
  const iterations = Number(iter.value);
  const numOfFlips = Number(flips.value);

  console.log(iterations);
  console.log(numOfFlips);
};

gen.addEventListener("click", flipper);
