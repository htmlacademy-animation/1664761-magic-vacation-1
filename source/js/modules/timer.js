export default () => {
  let start = Date.now(),
    end = start + 300000,
    minuteDOM = document.querySelector('.game__counter span:first-child'),
    secondeDOM = document.querySelector('.game__counter span:last-child'),
    fpsInterval = 1000 / 12,
    remainingTime,
    remainingMin,
    remainingSec,
    elapsed,
    now;

  function fpsCounter() {
    now = Date.now();
    elapsed = now - start;

    requestAnimationFrame(fpsCounter);
    if (elapsed > fpsInterval) {
      start = now - (elapsed % fpsInterval);
      countTime();
    }
  }

  fpsCounter();

  function countTime() {
    remainingTime = end - Date.now();

    remainingSec = ('0' + Math.floor((remainingTime / 1000) % 60)).slice(-2);
    remainingMin = ('0' + Math.floor((remainingTime / (60 * 1000)) % 60)).slice(-2);

    if (remainingTime > 0) {
      minuteDOM.textContent = remainingMin;
      secondeDOM.textContent = remainingSec;
    } else {
      minuteDOM.textContent = '00';
      secondeDOM.textContent = '00';
    }
  }

};
