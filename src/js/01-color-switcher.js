const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};

refs.start.addEventListener('click', addRandomBodyColor);

function addRandomBodyColor() {
  const color = setInterval(getRandomHexColor(), 1000);

  console.log(color)
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
