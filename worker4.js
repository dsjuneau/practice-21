const numOfWorkers = 4;
const workerArray = [];

for (i = 0; i < numOfWorkers; i++) {
  workerArray[i] = {
    worker: new Worker("./worker4a.js"),
    done: 0,
    pmf: [],
  };
}

const combiner = () => {
  let total = 0;
  workerArray.forEach((item) => {
    total = total + item.done;
  });
  total = total / numOfWorkers;
  if (total === 100) {
    // combine array
    let fArray = [...workerArray[0].pmf];

    for (i = 1; i < numOfWorkers; i++) {
      fArray = [...fArray.map((e, j) => e + workerArray[i].pmf[j])];
    }

    // Send post message
    this.postMessage({ done: 100, pmfArray: fArray });
  } else {
    this.postMessage({ done: total });
  }
};

this.onmessage = (e) => {
  let { iterations, numOfFlips } = e.data;
  workerArray.forEach((item) => {
    item.worker.postMessage({
      iterations: iterations / numOfWorkers,
      numOfFlips,
    });
  });
  workerArray.forEach((item) => {
    item.worker.onmessage = (e) => {
      item.done = e.data.done;
      if (item.done === 100) {
        item.pmf = e.data.pmfArray;
      }
      combiner();
    };
  });
};
