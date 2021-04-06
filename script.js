let secondsEl = document.querySelector('.input-seconds');
let minutesEl = document.querySelector('.input-minutes');
let hoursEl   = document.querySelector('.input-hours');
let startEl   = document.querySelector('.timer-start');

let displayedSecondsEl = document.querySelector('.seconds');
let displayedMinutesEl = document.querySelector('.minutes');
let displayedHoursEl   = document.querySelector('.hours');

let secValue, minValue, hrsValue;

startEl.addEventListener('click', () => {
  secValue = secondsEl.value;
  minValue = minutesEl.value;
  hrsValue = hoursEl.value;

  updateTime();
  if (window.timeInterval) {
    clearInterval(timeInterval);
  }
  window.timeInterval = setInterval(updateTime, 1000);
});

function updateTime() {
  if (secValue > 0) {
    secValue--;
  } else if (minValue > 0) {
    minValue--;
    secValue = 59;
  } else if (hrsValue > 0) {
    hrsValue--;
    minValue = 59;
    secValue = 59;
  }

  if (secValue < 10) {
    displayedSecondsEl.innerHTML = "0" + secValue;
  } else {
    displayedSecondsEl.innerHTML = secValue;
  }

  if (minValue < 10) {
    displayedMinutesEl.innerHTML = "0" + minValue;
  } else {
    displayedMinutesEl.innerHTML = minValue;
  }

  if (hrsValue < 10) {
    displayedHoursEl.innerHTML = "0" + hrsValue;
  } else {
    displayedHoursEl.innerHTML = hrsValue;
  }
}
