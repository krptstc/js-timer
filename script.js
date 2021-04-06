let mainSectionEl      = document.querySelector('.main-section');

let secondsEl          = document.querySelector('.input-seconds');
let minutesEl          = document.querySelector('.input-minutes');
let hoursEl            = document.querySelector('.input-hours');
let startEl            = document.querySelector('.timer-start');

let displayedSecondsEl = document.querySelector('.seconds');
let displayedMinutesEl = document.querySelector('.minutes');
let displayedHoursEl   = document.querySelector('.hours');

let secValue, minValue, hrsValue;

let settingsEl         = document.querySelector('.settings-icon');
let saveSettingsEl     = document.querySelector('.save-settings')
let darkOverlayEl      = document.querySelector('.dark-overlay');

settingsEl.addEventListener('click', close_settings);
saveSettingsEl.addEventListener('click', update_settings);

function close_settings() {
  if (darkOverlayEl.classList.contains('active')) {
    setTimeout(() => {
      darkOverlayEl.style.width = "0";
      darkOverlayEl.style.height = "0";
    }, 200);
  } else {
    darkOverlayEl.style.width = "100%";
    darkOverlayEl.style.height = "100vh";
  }
  darkOverlayEl.classList.toggle('active');
}

function update_settings() {
  let imageURL = document.querySelector('.background-url').value;
  mainSectionEl.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)), url(${imageURL})`;
  mainSectionEl.style.backgroundSize = 'cover';
  mainSectionEl.style.backgroundPosition = 'center';
}

startEl.addEventListener('click', () => {
  secValue = parseInt(secondsEl.value);
  minValue = parseInt(minutesEl.value);
  hrsValue = parseInt(hoursEl.value);

  if (secondsEl.value.length == 0 || isNaN(secondsEl.value)) {
    secValue = 0;
  }
  if (minutesEl.value.length == 0 || isNaN(minutesEl.value)) {
    minValue = 0;
  }
  if (hoursEl.value.length == 0 || isNaN(hoursEl.value)) {
    hrsValue = 0;
  }

  if (
    secValue > -1 && secValue < 60 &&
    minValue > -1 && minValue < 60 &&
    hrsValue > -1
  ) {
    updateTime();
    if (window.timeInterval) {
      clearInterval(timeInterval);
    }
    window.timeInterval = setInterval(updateTime, 1000);
  }
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
