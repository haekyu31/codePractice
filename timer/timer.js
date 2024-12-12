// timer.js
function startTimer(duration) {
    var timer = duration, minutes, seconds;
    var minutesDisplay = document.getElementById('minutes');
    var secondsDisplay = document.getElementById('seconds');
    var interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutesDisplay.textContent = minutes < 10 ? "0" + minutes : minutes;
        secondsDisplay.textContent = seconds < 10 ? "0" + seconds : seconds;

        if (--timer < 0) {
            clearInterval(interval);
            alert("Time's up!");
        }
    }, 1000);
}

document.getElementById('startButton').addEventListener('click', function () {
    var minutesInput = parseInt(document.getElementById('minutesInput').value, 10);
    var secondsInput = parseInt(document.getElementById('secondsInput').value, 10);
    var duration = (minutesInput * 60) + secondsInput; // Total duration in seconds
    startTimer(duration);
});
