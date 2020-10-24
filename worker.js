this.onmessage = (e) => {
  let { iterations, numOfFlips } = e.data;
  const pmfArray = [];
  pmfArray.length = numOfFlips;
  pmfArray.fill(0);
  const onePercent = iterations / 100;
  let donePercent = 0;
  for (let x = 0; x < 100; x++) {
    for (let i = 0; i < onePercent; i++) {
      let count = 0;
      for (let j = 0; j < numOfFlips; j++) {
        let a = Math.floor(2 * Math.random());
        count = count + a;
      }
      pmfArray[count] = pmfArray[count] + 1;
    }
    donePercent++;
    if (donePercent === 100) {
      this.postMessage({ done: 100, pmfArray });
    } else {
      this.postMessage({ done: donePercent });
    }
  }
};
