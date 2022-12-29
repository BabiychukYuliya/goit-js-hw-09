import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('[data-start]');
const counterDays = document.querySelector('[data-days]');
const counterHours = document.querySelector('[data-hours]');
const counterMinutes = document.querySelector('[data-minutes]');
const counterSeconds = document.querySelector('[data-seconds]');
let timerId = null;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();

    if (selectedDates[0] - currentDate > 0) {
      btnStart.disabled = false;
    } else {
      btnStart.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

const fp = flatpickr('#datetime-picker', options);
// console.log(counterDays);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

btnStart.addEventListener('click', onClickStart);

function onClickStart() {
  const selectedDate = fp.selectedDates[0];
 

  timerId = setInterval(() => {

    const dataStart = new Date();
    console.log('dataStart', dataStart);
    const counter = selectedDate - dataStart;
console.log('counter', counter);
    updateTimer(convertMs(counter));
    // console.log('counter', counter);
    btnStart.disabled = true;

    if (counter < 0) {
      clearInterval(timerId);
      return;
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  counterDays.textContent = addLeadingZero(days);
  counterHours.textContent = addLeadingZero(hours);
  counterMinutes.textContent = addLeadingZero(minutes);
  counterSeconds.textContent = addLeadingZero(seconds);
}
