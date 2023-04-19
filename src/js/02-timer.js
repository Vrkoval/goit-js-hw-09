import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
//=========================================================================================================================================
const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
refs.button.disabled = true;
refs.button.addEventListener('click', timerStart);
let targetTime = null;
//=========================================================================================================================================
let datePicker = '';
const fp = flatpickr('#datetime-picker', {
  enableTime: false,
  dateFormat: 'd.m.Y',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  enableTime: true,
  enableSeconds: true,
  onClose(selectedDates) {
    if (new Date() > fp.selectedDates[0]) {
        Notify.failure('Please choose a date in the future');
    } else if(new Date() < fp.selectedDates[0]){
        Notify.success('Congratulations, the countdown is on!');
        targetTime = fp.selectedDates[0];
        refs.button.disabled = false;
    } 
  },
});
//=========================================================================================================================================

function timerStart() {
    refs.button.disabled = true;
    refs.input.disabled = true;
  const timerId = setInterval(() => {
    const currentTime = Date.now();
    const timeDifference = convertMs(targetTime - currentTime);
    const { days, hours, minutes, seconds } = timeDifference;
    if (days === '00' && hours === '00' && minutes === '00' && seconds === '00'){
      clearInterval(timerId);
      refs.button.disabled = false;
      refs.input.disabled = false;
    }
    refs.days.textContent = `${days}`
    refs.hours.textContent = `${hours}`
    refs.minutes.textContent = `${minutes}`
    refs.seconds.textContent = `${seconds}`
  }, 1000);
}
//=========================================================================================================================================
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = ddLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = ddLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = ddLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = ddLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
//=========================================================================================================================================
function ddLeadingZero(value) {
  return String(value).padStart(2, '0');
}