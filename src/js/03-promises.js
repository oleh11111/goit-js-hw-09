import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const foormEl = document.querySelector('form');

const delayInputEl = document.querySelector(`[name="delay"]`);
const stepInputEl = document.querySelector(`[name="step"]`);
const amountInputEl = document.querySelector(`[name="amount"]`);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

foormEl.addEventListener('submit', event => {
  event.preventDefault();
  const amount = amountInputEl.value;
  const step = stepInputEl.value;
  const delay = delayInputEl.value;

  let p = Promise.resolve();
  for (let i = 1; i <= amount; i += 1) {
    if (i === 1) {
      p = p.then(() => createPromise(i, delay));
    } else {
      p = p.then(() => createPromise(i, step));
    }
    p = p
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {timeout: 6000});
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {timeout: 6000});
      });
  }
});
