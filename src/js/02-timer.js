import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { convertMs } from './convertMs.js';


const inputEl = document.querySelector('#datetime-picker');
const buttonEl = document.querySelector('[data-start]');
const spanElDay = document.querySelector('[data-days]');
const spanElHours = document.querySelector('[data-hours]');
const spanElMinutes = document.querySelector('[data-minutes]');
const spanElSeconds = document.querySelector('[data-seconds]');
;
const date = new Date();
let selectedInputDates;
flatpickr(inputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < date) {
      alert('Please choose a date in the future');
      buttonEl.setAttribute('disabled', true);
    } else {
      buttonEl.removeAttribute('disabled');
    }
    selectedInputDates = selectedDates[0];
    
  },
});


function disabledButton() {
  buttonEl.setAttribute('disabled', true);
  if (inputEl.value > new Date()) {
    buttonEl.removeAttribute('disabled');
  }
}
disabledButton();

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

let timerId = null;
buttonEl.addEventListener('click', () => {
  clearInterval(timerId);
  timerId = setInterval(() => {
    
    const diff = selectedInputDates - new Date();
    const { days, hours, minutes, seconds } = convertMs(diff);
    spanElDay.textContent = addLeadingZero(days);
    spanElHours.textContent = addLeadingZero(hours);
    spanElMinutes.textContent = addLeadingZero(minutes);
    spanElSeconds.textContent = addLeadingZero(seconds);
   if(days === 0 && hours === 0 && minutes === 0 && seconds === 0 ){
    clearInterval(timerId);
   }
  }, 1000);
 
});

    
  
   