import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const startBtn = document.querySelector('.js-start-btn');
const dateInput = document.querySelector('#datetime-picker');

const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let userSelectedDate;
let intervalId;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {

    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {

        iziToast.error({
    message: 'Please choose a date in the future'
});

        startBtn.disabled = true;
        
      userSelectedDate = null;

      return;
    }

    userSelectedDate = selectedDate;
    startBtn.disabled = false;
  }
};

flatpickr(dateInput, options);

startBtn.addEventListener("click", () => {

    startBtn.disabled = true;
    dateInput.disabled = true;

  intervalId = setInterval(() => {

    const now = Date.now();
    const diff = userSelectedDate - now;

    if (diff <= 0) {

      clearInterval(intervalId);

      updateClockface(0,0,0,0);

      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);

    updateClockface(days, hours, minutes, seconds);

  }, 1000);

});

function updateClockface(days, hours, minutes, seconds) {

  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);

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

function addLeadingZero(value) {

  return String(value).padStart(2, "0");

}