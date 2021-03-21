export default (i) => {

  let start = Date.now(),
    duration = 1000,
    prizeDOM = document.querySelectorAll('.prizes__desc b'),
    amount,
    fpsInterval = 1000 / 12,
    elapsed,
    now,
    prizesItem = document.querySelectorAll('.prizes__item'),
    prizesData = {
      0: {
        src: `img/primary-award.svg`,
        startValue: 1,
        endValue: 3
      },
      1: {
        src: `img/secondary-award.svg`,
        startValue: 1,
        endValue: 7
      },
      2: {
        src: `img/additional-award.svg`,
        startValue: 11,
        endValue: 900
      }
    },
    step = prizesData[i].startValue;

  prizesItem[i].querySelector('.prizes__icon object').data = prizesData[i].src;
  prizesItem[i].classList.add('active');

  setTimeout(() => {
    function fpsCounter() {
      now = Date.now();
      elapsed = now - start;

      requestAnimationFrame(fpsCounter);

      if (elapsed > fpsInterval) {
        start = now - (elapsed % fpsInterval);
        numAnim(i);
      }
    }

    fpsCounter();

    function numAnim(i) {
      if (step <= prizesData[i].endValue) {
        prizeDOM[i].textContent = step;
        step += Math.ceil(prizesData[i].endValue / (duration / fpsInterval));
      } else {
        prizeDOM[i].textContent = prizesData[i].endValue;
      }
    }
  }, 1500);
};
