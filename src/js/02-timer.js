import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  valueDays: document.querySelector('.value[data-days]'),
  valueHours: document.querySelector('.value[data-hours]'),
  valueMinutes: document.querySelector('.value[data-minutes]'),
  valueSeconds: document.querySelector('.value[data-seconds]'),
};

let differenceTime;
let countdownInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      alert('Please choose a date in the future');
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
      differenceTime = selectedDate.getTime() - new Date().getTime();
    }
  },
};

flatpickr(refs.dateInput, options);

refs.startBtn.addEventListener('click', () => {
  if (differenceTime) {
    startTimer();
    refs.startBtn.disabled = true;
  }
});

function startTimer() {
  clearInterval(countdownInterval);
  countdownInterval = setInterval(updateTimer, 1000);
  updateTimer();
}

function updateTimer() {
  if (differenceTime <= 0) {
    clearInterval(countdownInterval);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(differenceTime);

  refs.valueDays.textContent = days;
  refs.valueHours.textContent = hours;
  refs.valueMinutes.textContent = minutes;
  refs.valueSeconds.textContent = seconds;

  differenceTime -= 1000;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}