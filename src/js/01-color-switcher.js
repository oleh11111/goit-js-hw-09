

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const btnStartBgC = document.querySelector('[data-start]');
const btnStopBgC = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let timerId = null;

btnStartBgC.addEventListener('click', () => {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStartBgC.setAttribute('disabled', true);
});

const hendelClickbtnStop = () => {
  clearInterval(timerId);
  btnStartBgC.removeAttribute('disabled');
};
btnStopBgC.addEventListener('click', hendelClickbtnStop);
