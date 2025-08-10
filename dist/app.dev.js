"use strict";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js');
  });
} // Add mobile touch events


document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
var yDown = null;

function handleTouchStart(evt) {
  yDown = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
  if (!yDown) {
    return;
  }

  var yUp = evt.touches[0].clientY;
  var yDiff = yDown - yUp;

  if (yDiff > 0) {// Scrolling down
  } else {
    // Scrolling up - implement pull to refresh
    if (Math.abs(yDiff) > 100) {
      location.reload();
    }
  }

  yDown = null;
} 


var goal = {
  amount: 0,
  date: null
};

function setGoal() {
  var amount = document.getElementById('goalAmount').value;
  var date = document.getElementById('goalDate').value;

  if (!amount || !date) {
    alert('Please enter both amount and date');
    return;
  }

  goal.amount = parseFloat(amount) || 0;
  goal.date = new Date(date); // Add animation class

  var displayAmount = document.getElementById('displayAmount');
  displayAmount.style.animation = 'none';
  displayAmount.offsetHeight; // Trigger reflow

  displayAmount.style.animation = 'updateValue 0.5s ease-out';
  displayAmount.innerText = "$".concat(goal.amount.toLocaleString());
  updateTimeRemaining();
}

function updateTimeRemaining() {
  var timeLeft = timeRemaining(goal.date);
  document.getElementById('timeRemaining').innerText = timeLeft;
}

function timeRemaining(goalDate) {
  if (!goalDate) return "Please set a goal date";
  var now = new Date();
  var timeDiff = goalDate - now;

  if (timeDiff <= 0) {
    return "Goal date has passed!";
  }

  var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  var hours = Math.floor(timeDiff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
  var minutes = Math.floor(timeDiff % (1000 * 60 * 60) / (1000 * 60));
  var seconds = Math.floor(timeDiff % (1000 * 60) / 1000);
  return "".concat(days, "d ").concat(hours, "h ").concat(minutes, "m ").concat(seconds, "s");
} // Update the time remaining every second


setInterval(function () {
  updateTimeRemaining(); // Add subtle pulse animation to time display

  var timeDisplay = document.getElementById('timeRemaining');
  timeDisplay.style.animation = 'pulse 1s ease-out';
}, 1000);