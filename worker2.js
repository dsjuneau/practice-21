const webWorkera = new Worker("./worker2a.js");
const webWorkerb = new Worker("./worker2a.js");
let aDone = 0;
let bDone = 0;
let firstPmf = [];
let secondPmf = [];
let finalPmf = [];

const combiner = () => {
  if (aDone === 100 && bDone === 100) {
    // combine array
    finalPmf = firstPmf.map((e, i) => e + secondPmf[i]);
    // Send post message
    this.postMessage({ done: 100, pmfArray: finalPmf });
  } else {
    this.postMessage({ done: (aDone + bDone) / 2 });
  }
};

this.onmessage = (e) => {
  let { iterations, numOfFlips } = e.data;
  webWorkera.postMessage({ iterations: iterations / 2, numOfFlips });
  webWorkerb.postMessage({ iterations: iterations / 2, numOfFlips });
  webWorkera.onmessage = (e) => {
    aDone = e.data.done;
    if (aDone === 100) {
      firstPmf = e.data.pmfArray;
    }
    combiner();
  };
  webWorkerb.onmessage = (e) => {
    bDone = e.data.done;
    if (bDone === 100) {
      secondPmf = e.data.pmfArray;
    }
    combiner();
  };
};
