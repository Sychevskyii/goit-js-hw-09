const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

class ColorSwitcher {
  constructor() {
    this.intervalId = null;
    this.changeColor = this.changeColor.bind(this);
    this.stopColorChange = this.stopColorChange.bind(this);
  }

  changeColor() {
    const isButtonActive = refs.stop.hasAttribute('disabled');
    if (isButtonActive) {
      refs.stop.removeAttribute('disabled', 'false');
    }
    refs.start.setAttribute('disabled', 'true');
    this.intervalId = setInterval(() => {
      const randomColor = this.getRandomHexColor();
      refs.body.style.backgroundColor = randomColor;
    }, 1000);
  }

  stopColorChange() {
    const isButtonActive = refs.start.hasAttribute('disabled');
    if (isButtonActive) {
      refs.start.removeAttribute('disabled', 'false');
    }
    refs.stop.setAttribute('disabled', 'true');
    clearInterval(this.intervalId);
  }

  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`;
  }
}

const colorSwitcher = new ColorSwitcher();

refs.start.addEventListener('click', colorSwitcher.changeColor);
refs.stop.addEventListener('click', colorSwitcher.stopColorChange);
