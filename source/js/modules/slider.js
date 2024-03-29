import Swiper from "swiper";
import {
  introAndStory
} from "../script.js";

export default () => {
  let storySlider;
  let bodyDOM = document.querySelector('body');

  const setSlider = function () {
    if (((window.innerWidth / window.innerHeight) < 1) || window.innerWidth < 769) {
      storySlider = new Swiper(`.js-slider`, {
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0 || storySlider.activeIndex === 1) {
              introAndStory.setStory(0);
            } else if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
              introAndStory.setStory(1);
            } else if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
              introAndStory.setStory(2);
              bodyDOM.classList.add('story-slide-3');
            } else if (storySlider.activeIndex === 6 || storySlider.activeIndex === 7) {
              introAndStory.setStory(3);
              bodyDOM.classList.add('story-slide-4');
            }
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    } else {
      storySlider = new Swiper(`.js-slider`, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        allowTouchMove: false,
        pagination: {
          el: `.swiper-pagination`,
          type: `fraction`
        },
        navigation: {
          nextEl: `.js-control-next`,
          prevEl: `.js-control-prev`,
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            for (var i = 1; i <= 4; i++) {
              if (storySlider.activeIndex === 0) {
                introAndStory.setStory(0);
                bodyDOM.classList.remove(`story-slide-${i}`);
                bodyDOM.classList.add('story-slide-1');
              } else if (storySlider.activeIndex === 2) {
                introAndStory.setStory(1);
                bodyDOM.classList.remove(`story-slide-${i}`);
                bodyDOM.classList.add('story-slide-2');
              } else if (storySlider.activeIndex === 4) {
                introAndStory.setStory(2);
                bodyDOM.classList.remove(`story-slide-${i}`);
                bodyDOM.classList.add('story-slide-3');
              } else if (storySlider.activeIndex === 6) {
                introAndStory.setStory(3);
                bodyDOM.classList.remove(`story-slide-${i}`);
                bodyDOM.classList.add('story-slide-4');
              }
            }
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    }
  };

  window.addEventListener(`resize`, function () {
    if (storySlider) {
      storySlider.destroy();
    }
    setSlider();
  });

  setSlider();

  document.body.addEventListener(`screenChanged`, (e) => {
    if (e.detail.screenName === `story`) {
      if (storySlider.activeIndex === 0 || storySlider.activeIndex === 1) {
        introAndStory.setStory('fromIntro');
        introAndStory.suitcaseIsAnim = true;
      } else if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
        introAndStory.setStory(1);
      } else if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
        introAndStory.setStory(2);
      } else if (storySlider.activeIndex === 6 || storySlider.activeIndex === 7) {
        introAndStory.setStory(3);
      }
    } else {
      introAndStory.setStory('intro');
    }
  });
};
