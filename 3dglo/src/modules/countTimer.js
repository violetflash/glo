import animate from "./animate";

function countTimer(deadline) {
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');
    let timerInterval;

    function getTimeRemaining() {
        const dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = timeRemaining > 0 ? Math.floor(timeRemaining % 60) : 0,
            minutes = timeRemaining > 0 ? Math.floor(timeRemaining / 60 % 60) : 0,
            hours = timeRemaining > 0 ? Math.floor(timeRemaining / 3600 % 24) : 0;
        return {timeRemaining, hours, minutes, seconds};
    }

    function checkZero(num) {
        return num < 10 ? '0' + num : num;
    }

    function updateClock() {
        const timer = getTimeRemaining();


        timerHours.textContent = checkZero(timer.hours);
        timerMinutes.textContent = checkZero(timer.minutes);
        timerSeconds.textContent = checkZero(timer.seconds);

        if (timer.timeRemaining < 0) {
            clearInterval(timerInterval);
        }
    }

    updateClock();
    timerInterval = setInterval(updateClock, 1000);
}

export default countTimer;