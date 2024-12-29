// timer.js
let currentInterval = null; // Add this at the top to track the active timer
let laps = [];
let isRunning = false;
let savedTime = 0; // Add this at the top to store the remaining time

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
    // 모든 상태 초기화
    savedTime = 0;
    isRunning = false;
    laps = [];  // lap 기록 초기화

    // 화면 표시 초기화
    document.getElementById('minutes').textContent = "00";
    document.getElementById('seconds').textContent = "00";
    document.getElementById('minutesInput').value = "0";
    document.getElementById('secondsInput').value = "0";
    
    // 버튼 상태 초기화
    const startButton = document.getElementById('startButton');
    startButton.textContent = 'Start';
    startButton.style.backgroundColor = '#007bff';

    // lap 리스트 초기화
    updateLapDisplay();
}

function recordLap() {
    if (!isRunning || !currentInterval) return; // 타이머가 동작 중일 때만 기록
    
    const currentMinutes = document.getElementById('minutes').textContent;
    const currentSeconds = document.getElementById('seconds').textContent;
    const lapTime = `${currentMinutes}:${currentSeconds}`;
    
    laps.push(lapTime);
    updateLapDisplay();
}

function updateLapDisplay() {
    const lapList = document.getElementById('lapList');
    lapList.innerHTML = '';
    
    // 최신 기록이 위에 오도록 역순으로 표시
    laps.slice().reverse().forEach((lap, index) => {
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        // 실제 순서는 역순이므로 전체 개수에서 빼서 계산
        const lapNumber = laps.length - index;
        lapItem.textContent = `Lap ${lapNumber}: ${lap}`;
        lapList.appendChild(lapItem);
    });
}

// Event Listeners
document.getElementById('startButton').addEventListener('click', toggleTimer);

document.getElementById('resetButton').addEventListener('click', resetTimer);

document.getElementById('lapButton').addEventListener('click', recordLap);

function toggleTimer() {
    const startButton = document.getElementById('startButton');
    
    if (!isRunning) {
        // 타이머 시작 또는 재개
        if (savedTime > 0) {
            // 저장된 시간부터 재개
            startTimer(savedTime);
        } else {
            // 새로운 타이머 시작
            var minutesInput = parseInt(document.getElementById('minutesInput').value, 10);
            var secondsInput = parseInt(document.getElementById('secondsInput').value, 10);
            var duration = (minutesInput * 60) + secondsInput;
            startTimer(duration);
        }
        startButton.textContent = 'Stop';
        startButton.style.backgroundColor = '#dc3545'; // 빨간색
        isRunning = true;
    } else {
        // 타이머 일시정지
        if (currentInterval) {
            clearInterval(currentInterval);
            currentInterval = null;
            // 현재 시간 저장
            const minutes = parseInt(document.getElementById('minutes').textContent);
            const seconds = parseInt(document.getElementById('seconds').textContent);
            savedTime = minutes * 60 + seconds;
        }
        startButton.textContent = 'Start';
        startButton.style.backgroundColor = '#007bff'; // 파란색
        isRunning = false;
    }
}
