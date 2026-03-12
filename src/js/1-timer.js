

const startBtn = document.querySelector('.js-start-btn');
const dateInput = document.querySelector('.js-input-date');

const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let intervalId = null;

startBtn.addEventListener('click', () => {
    // Очищаємо попередній таймер
    if (intervalId) {
        clearInterval(intervalId);
    }

    const initTime = new Date(dateInput.value).getTime();
    const nowValue = Date.now();

    if (isNaN(initTime)) {
        alert('Please choose a valid date!');
        return;
    }

    if (initTime <= nowValue) {
        alert('Please choose a date in the future!');
        return;
    }

    intervalId = setInterval(() => {
        const currentTime = Date.now();
        const diff = initTime - currentTime;

        if (diff <= 0) {
            clearInterval(intervalId);
            updateClockface(0,0,0,0);
            return;
        }

        const { days, hours, minutes, seconds } = convertMs(diff);
        updateClockface(days, hours, minutes, seconds);
    }, 1000);
});

// Функція для оновлення відображення
function updateClockface(days, hours, minutes, seconds) {
    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);
}

// Функція конвертації мілісекунд
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

// Додаємо провідний нуль
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}