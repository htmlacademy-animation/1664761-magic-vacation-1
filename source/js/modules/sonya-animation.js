const animations = {
  appear: {
    keyframes: [{
        transform: `translate(20rem, 20rem)rotate(-30deg)`,
        offset: 0
      },
      {
        transform: `translate(0, -1.5rem)rotate(0deg)`,
        offset: 1
      },
    ],
    options: {
      duration: 700,
      easing: `ease-out`,
      fill: `forwards`,
    }
  },
  idle: {
    keyframes: [{
        transform: `translate(0, -1.5rem)rotate(0deg)`,
        offset: 0
      },
      {
        transform: `translate(0, 1.5rem)rotate(0deg)`,
        offset: 1
      },
    ],
    options: {
      duration: 1000,
      easing: `ease-in-out`,
      fill: `both`,
      iterations: Infinity,
      direction: `alternate`,
    }
  }
};

class SonyaAnimation {
  constructor() {
    this.sonya = document.querySelector(`#sonya`);
  }

  start() {
    if (!this.sonya) {
      return;
    }

    const {
      appear,
      idle
    } = animations;
    this.showAnim = this.sonya.animate(...Object.values(appear));

    this.showAnim.onfinish = () => {
      this.idle = this.sonya.animate(...Object.values(idle));
    };
  }

  end() {
    if (!this.sonya || !this.showAnim) {
      return;
    }

    this.showAnim.cancel();

    if (this.idle) {
      this.idle.cancel();
    }

    this.showAnim.reverse();
    this.showAnim.play();
  }
}

const sonyaAnimation = new SonyaAnimation();

export default sonyaAnimation;
