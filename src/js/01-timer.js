import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let countdownInterval; // timer
let userSelectedDate; // chosendate from user

const startButton = document.querySelector('[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');
const timerDisplay = document.querySelector('.timer');

startButton.disabled = true; // disable button default

// flatpickr
flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const currentDate = new Date();

    // disable button if chosen time is past
    if (userSelectedDate <= currentDate) {
      startButton.disabled = true;
      iziToast.error({
        message: 'Please choose a date in the future.',
        position: 'topRight',
        timeout: 5000,
      });
    } else {
      startButton.disabled = false; // active button if chosen time is future
    }
  },
});

// start countdown with click event
startButton.addEventListener('click', startCountdown);

function startCountdown() {
  const targetDate = userSelectedDate;
  const currentDate = new Date();

  if (targetDate <= currentDate) return;

  startButton.disabled = true; // disable start button

  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const remainingTime = targetDate - currentTime;

    if (remainingTime <= 0) {
      clearInterval(countdownInterval); // stop timer
      updateTimerDisplay(0); // clear timer
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);
}

// update the timer
function updateTimerDisplay(days, hours, minutes, seconds) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}

// format to 2 digit
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// function calculator of timer difference
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
