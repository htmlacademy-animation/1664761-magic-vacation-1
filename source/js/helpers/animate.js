import easingFunc from './utilities.js';
import {
  activeScene
} from '../modules/story.js';

export class Animation {
  constructor(options) {
    this.options = options;

    if (!this.options.easing) {
      this.options.easing = easingFunc.easeLinear;
    }

    if (!this.options.duration) {
      this.options.duration = 1000;
    }

    if (!this.options.delay) {
      this.options.delay = 0;
    }

    if (!this.options.fps) {
      this.options.fps = 60;
    }

    this.timeoutId = null;
    this.requestId = null;
  }

  start(options) {
    this.stop();

    this.timeoutId = setTimeout(() => {
      this.startTime = performance.now();
      this.interval = 1000 / this.options.fps;
      this.lastFrameTime = this.startTime;
      this.isFinished = false;

      let animateFrame;

      if (this.options.duration === `infinite`) {
        animateFrame = (currentTime) => {
          this.requestId = requestAnimationFrame(animateFrame);

          const delta = currentTime - this.lastFrameTime;

          if (delta > this.interval) {
            this.options.func(1, {
              startTime: this.startTime,
              currentTime,
              isFinished: false,
              options
            });

            this.lastFrameTime = currentTime - delta % this.interval;
          }
        };
      } else {
        animateFrame = (currentTime) => {
          this.requestId = requestAnimationFrame(animateFrame);

          const delta = currentTime - this.lastFrameTime;

          if (delta > this.interval) {
            let timeFraction = (currentTime - this.startTime) / this.options.duration;

            if (timeFraction > 1) {
              timeFraction = 1;
              this.isFinished = true;
            }

            if (timeFraction <= 1) {
              const progress = this.options.easing(timeFraction);

              this.options.func(progress, {
                startTime: this.startTime,
                currentTime,
                isFinished: this.isFinished,
                options
              });

              this.lastFrameTime = currentTime - delta % this.interval;
            }

            if (this.isFinished) {
              this.stop();

              if (typeof this.options.callback === `function`) {
                this.options.callback();
              }
            }
          }
        };
      }

      this.requestId = requestAnimationFrame(animateFrame);
    }, this.options.delay);
  }

  restart() {
    this.start();
  }

  stop() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }
  }
}

export const animateFPS = (render, duration, fps, endCB = () => {}) => {
  let start = null;
  let lastFrameUpdateTime = null;
  let timeSinceLastUpdate = null;

  function loop(currentTime) {
    if (!start) {
      start = currentTime;
    }

    if (!lastFrameUpdateTime) {
      lastFrameUpdateTime = currentTime;
    }

    let progress = (currentTime - start) / duration;
    if (progress > 1) {
      render(1);
      endCB();
      return;
    }

    timeSinceLastUpdate = currentTime - lastFrameUpdateTime;
    if (timeSinceLastUpdate > fps) {
      lastFrameUpdateTime = currentTime;
      render(progress);
    }
    if (activeScene == 1) {
      requestAnimationFrame(loop);
    }
  }

  loop();
};

export const tick = (from, to, progress) => from + progress * (to - from);

export const animareFluctuationIntroObj = (items) => {
  let progress = 0;
  let startTime = Date.now();

  function loop() {

    progress = (Date.now() - startTime) * 0.0001;

    items.forEach(item => {
      item.position.y = item.position.y + item.optAnim.amp * Math.sin((2 * Math.PI * progress) / item.optAnim.period);
    });

    requestAnimationFrame(loop);
  }

  loop();
};

export const animIntroObj = (items, duration, ease, endCB = () => {}) => {
  let progress = 0;
  let startTime = Date.now();

  function loop() {

    progress = (Date.now() - startTime) / duration;

    const easing = easingFunc[`${ease}`](progress);

    items.forEach(item => {
      const scaleX = tick(item.optAnim.startScale[0], item.optAnim.finishScale[0], easing);
      const scaleY = tick(item.optAnim.startScale[1], item.optAnim.finishScale[1], easing);
      const scaleZ = tick(item.optAnim.startScale[2], item.optAnim.finishScale[2], easing);

      const positionX = tick(item.optAnim.startPosition[0], item.optAnim.finishPosition[0], easing);
      const positionY = tick(item.optAnim.startPosition[1], item.optAnim.finishPosition[1], easing);
      const positionZ = tick(item.optAnim.startPosition[2], item.optAnim.finishPosition[2], easing);

      const scale = [scaleX, scaleY, scaleZ];
      const position = [positionX, positionY, positionZ];

      item.scale.set(...scale);
      item.position.set(...position);
    });

    if (progress > 1) {
      animareFluctuationIntroObj(items);
      endCB();
      return;
    }

    requestAnimationFrame(loop);
  }

  loop();
};

export const animateScale = (item, start, finish, duration, ease, endCB = () => {}) => {
  let progress = 0;
  let startTime = Date.now();

  function loop() {

    progress = (Date.now() - startTime) / duration;

    const easing = easingFunc[`${ease}`](progress);

    const scaleX = tick(start[0], finish[0], easing);
    const scaleY = tick(start[1], finish[1], easing);
    const scaleZ = tick(start[2], finish[2], easing);

    const scale = [scaleX, scaleY, scaleZ];

    if (progress > 1) {
      endCB();
      return;
    }

    item.scale.set(...scale);

    requestAnimationFrame(loop);
  }

  loop();
};

export const animateMove = (item, start, finish, duration, ease, endCB = () => {}) => {
  let progress = 0;
  let startTime = Date.now();

  function loop() {

    progress = (Date.now() - startTime) / duration;

    const easing = easingFunc[`${ease}`](progress);

    const positionX = tick(start[0], finish[0], easing);
    const positionY = tick(start[1], finish[1], easing);
    const positionZ = tick(start[2], finish[2], easing);

    const position = [positionX, positionY, positionZ];

    if (progress > 1) {
      endCB();
      return;
    }

    item.position.set(...position);

    requestAnimationFrame(loop);
  }

  loop();
};

export const animateMoveY = (item, start, finish, duration, ease, endCB = () => {}) => {
  let progress = 0;
  let startTime = Date.now();

  function loop() {

    progress = (Date.now() - startTime) / duration;

    const easing = easingFunc[`${ease}`](progress);

    const positionY = tick(start, finish, easing);

    if (progress > 1) {
      endCB();
      item.position.y = finish;
      return;
    }

    item.position.y = positionY;

    requestAnimationFrame(loop);
  }

  loop();
};

export const animDogTail = (t, item) => {

  const progress = Math.floor(t % 6);

  const amp = progress > 2 && progress < 6 ? 0.8 : 0.4;

  item.rotation.x = amp * Math.sin((6 * Math.PI * t));
};

export const animSaturn = (t, amp, item1, item2) => {

  const rotationX1 = amp * Math.sin((1 * Math.PI * t) / 2);
  const rotationX2 = -0.2 * Math.sin((0.9 * Math.PI * t) / 2);

  item1.rotation.x = rotationX1;
  item2.rotation.x = rotationX2;
};

export const animLeaf = (t, item, amp, speed) => {

  item.rotation.x = amp * Math.sin((Math.PI * easingFunc.easeOutElastic(t * speed)));
};

export const animConpass = (t, amp, item) => {
  const rotationZ = amp * Math.sin((1.5 * Math.PI * t) / 2);

  item.rotation.z = rotationZ;
};

export const animSonya = (t, item1, item2, item3) => {
  const positionY = 10 * Math.sin((2 * Math.PI * t) / 2);

  const rotationX1 = -0.05 * Math.sin((2 * Math.PI * t) / 2);

  item1.position.y = positionY;
  item2.rotation.y = -1.3 + rotationX1;
  item3.rotation.y = 1.3 - rotationX1;
};
