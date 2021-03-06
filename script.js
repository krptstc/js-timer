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

window.timeInterval = null;

function load_settings() {
  if (localStorage.hasOwnProperty('backgroundURL')) {
    if (localStorage.backgroundURL.length > 0) {
      mainSectionEl.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)), url(${localStorage.backgroundURL})`;
      mainSectionEl.style.backgroundSize = 'cover';
      mainSectionEl.style.backgroundPosition = 'center';
    } else {
      mainSectionEl.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)), url(./img/main-background.jpg)`;
      mainSectionEl.style.backgroundSize = 'cover';
      mainSectionEl.style.backgroundPosition = 'center';
    }
  }

  if (localStorage.hasOwnProperty('settingsPosition')) {
    if (localStorage.settingsPosition == "topleft") {
      settingsEl.style.top    = "2.4rem";
      settingsEl.style.left   = "2.4rem";
      settingsEl.style.bottom = "unset";
      settingsEl.style.right  = "unset";
    } else if (localStorage.settingsPosition == "topright") {
      settingsEl.style.top    = "2.4rem";
      settingsEl.style.right  = "2.4rem";
      settingsEl.style.bottom = "unset";
      settingsEl.style.left   = "unset";
    } else if (localStorage.settingsPosition == "bottomleft") {
      settingsEl.style.bottom = "2.4rem";
      settingsEl.style.left   = "2.4rem";
      settingsEl.style.top    = "unset";
      settingsEl.style.right  = "unset";
    } else {
      settingsEl.style.bottom = "2.4rem";
      settingsEl.style.right  = "2.4rem";
      settingsEl.style.top    = "unset";
      settingsEl.style.left   = "unset";
    }
  }
}

load_settings();

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
  let imageURLEl = document.querySelector('.background-url');

  let settingsPositionEl = document.querySelector('.settings-position');
  if (settingsPositionEl.value)

  localStorage.setItem("backgroundURL", imageURLEl.value);
  localStorage.setItem("settingsPosition", settingsPositionEl.value);
  load_settings();
}

startEl.addEventListener('click', start_timer);

function start_timer() {
  if (window.timeInterval != null) {
    stop_timer();
    return;
  }

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
    stop_timer();
    update_time();
    window.timeInterval = setInterval(update_time, 1000);
    startEl.innerHTML = "Stop";
  }
}

function update_time() {
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

  if (secValue == 0 && minValue == 0 && hrsValue == 0) {
    stop_timer();
  }
}

function stop_timer() {
  if (window.timeInterval) {
    clearInterval(window.timeInterval);
    window.timeInterval = undefined;

    secondsEl.value              = "";
    minutesEl.value              = "";
    hoursEl.value                = "";
    displayedSecondsEl.innerHTML = "00";
    displayedMinutesEl.innerHTML = "00";
    displayedHoursEl.innerHTML   = "00";

    startEl.innerHTML = "Start";
  }
}
