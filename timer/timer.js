// timer.js
let currentInterval = null; // Add this at the top to track the active timer

function startTimer(duration) {
    // Clear any existing timer before starting a new one
    if (currentInterval) {
        clearInterval(currentInterval);
    }

    var timer = duration, minutes, seconds;
    var minutesDisplay = document.getElementById('minutes');
    var secondsDisplay = document.getElementById('seconds');
    
    // Update display immediately before interval starts
    updateDisplay();
    
    currentInterval = setInterval(function () {
        if (--timer < 0) {
            clearInterval(currentInterval);
            currentInterval = null;
            alert("Time's up!");
            return;
        }
        updateDisplay();
    }, 1000);

    function updateDisplay() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutesDisplay.textContent = minutes < 10 ? "0" + minutes : minutes;
        secondsDisplay.textContent = seconds < 10 ? "0" + seconds : seconds;
    }
}

function resetTimer() {
    if (currentInterval) {
        clearInterval(currentInterval);
        currentInterval = null;
    }
    document.getElementById('minutes').textContent = "00";
    document.getElementById('seconds').textContent = "00";
    document.getElementById('minutesInput').value = "0";
    document.getElementById('secondsInput').value = "0";
}

// Event Listeners
document.getElementById('startButton').addEventListener('click', function () {
    var minutesInput = parseInt(document.getElementById('minutesInput').value, 10);
    var secondsInput = parseInt(document.getElementById('secondsInput').value, 10);
    var duration = (minutesInput * 60) + secondsInput;
    startTimer(duration);
});

document.getElementById('resetButton').addEventListener('click', resetTimer);
