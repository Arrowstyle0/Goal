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
} // sum of two integer
// let a = 12;
// console.log(a);
// let a = 12;
// let b = "yuio"
// let c = a+b
// console.log(c,typeof(c));
//if any number is getting added to a string is called concatination
// let the_firstno = 23;
// let the_secondno = 45;
// console.log(`sum of 23 and 45 : ${the_firstno + the_secondno}`)
// let age = Number(prompt("The age"));
// console.log(  age);
// console.log(typeof age);
// when we change any datatype to another is known as " type casting" 
// let a = 30;
// let b = 45;
// let c;
// swapping
// c = a;
// a = b;
// b = c;
// console.log(a , b);
//  let a = 30;
//  let b = 45;
// swapping meth 2
//  [a,b] = [b,a]
//  console.log(a,b);
// let the_firstno = prompt('TYPE THE NO')
// let the_secondno = prompt('TYPE THE NO')
// if  ( the_firstno === Number ) 
// {
//      console.log(the_secondno);
// }
// else  
// {
//       console.log('The input should be in the Number');
// let i = 34
// i = i++ + ++i
// console.log(i);
// let b = true
//     b++              urinary operator (can't be applied in the constants )
// console.log(b);
// console.log(Math.round(19.5));
// console.log(Math.ceil(19.5));
// console.log(Math.floor(19.5));
// console.log(Math.trunc(19.5));
// console.log(Math.pow(19,4));
// console.log(Math.sqrt(19.5));
// console.log(Math.abs(-453));
// console.log(Math.max(45,6,7));
// console.log(Math.min(45,6,7));
// console.log(Math.trunc(Math.random()*6000));
// function rectangle(length , breadth) {
//     console.log(`The parameter of rectangle : ${2*(length+breadth)}`);
//     console.log(`The area of rectangle :${(length*breadth)}`);
// };
// rectangle(34,56)
// let amount = Number(prompt("What is the  final amount? "))
// if (amount > 0 && amount>= 5000 ) {
//     console.log(amount);
// }  else if (amount > 5000 && amount<=7000) {
//     console.log(amount - Math.floor((5*amount)/100));
// }
// else if (amount > 7000 && amount <= 9000) {
//     console.log(amount-Math.floor((10*amount)/100));
// }else if (amount > 9000) {
// }
// // console.log(amount - Math.floor((dis*amount)));
// let unit = prompt("Input the unit") /// 700
// let amount
// if (unit > 400) {
//     amount = (unit - 400) * 13
//     unit = 400   
// }
// if ( unit > 200 && unit <= 400) {
//     amount += (unit-200) *8
//     unit = 200
//  }
// if ( unit > 100 && unit <= 200) {
//     amount += (unit -100) * 6
//     unit = 100
//  }
//  amount += unit*4
//  console.log(amount);
// ruppee counter ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
// let amount = 5555
// if ( amount > 500) {
//     console.log(`Notes of 500 ${Math.floor(amount/500)}`);
//     amount  = amount % 500
// }
// if (amount >=200 ) {
//     console.log(`Notes of 200 ${Math.floor(amount/200)}`);
//     amount = amount % 200
// }
// if (amount >=100 ) {
//     console.log(`Notes of 100 ${Math.floor(amount/100)}`);
//     amount = amount % 100
// }
// if (amount >=50 ) {
//     console.log(`Notes of 50 ${Math.floor(amount/50)}`);
//     amount = amount % 50
// }
// if (amount >=20 ) {
//     console.log(`Notes of 20 ${Math.floor(amount/20)}`);
//     amount = amount % 20
// }
// if (amount >= 10 ) {
//     console.log(`Notes of 10 ${Math.floor(amount/ 10 )}`);
//     amount = amount % 10
// }
// ``````````````````````````````````````````````````````````````````````````````````````
// terninary operator ?
// 4 > 34 ? console.log('yes') : console.log("nope");
// console.log(4 > 34 ? console.log('yes'): console.log('nope'))
// let day  = Number((0.1 + 0.2).toPrecision(1));
// console.log(day);
// switch(day) 
// {
//     case 0.3 :console.log('correct');
//     break  
//     case 0.5 :console.log('false');
//     break
//     default:console.log('dangg');
// }
//            ???????????????????FOR LOOP//////////////
// fo r (let index = 0; index < 6; index++) {
//     const element = console.log("hello ");
// }
// number = Number(prompt("Enter the number ") ) ;
// var sum = 0
// for  (let i = 1 ; i <=number; i++ ) {
//     sum = sum + i 
//     console.log(sum);
// }
// let num = prompt("enter the number");
//     let isPrime = true ;
// start
// while(end){ exit control
//     change
// }
// num = Number(prompt("Enter the number"))
// if ( num = 0 ) {
// } 
// else  {
//     for ( let  i = 0 ; i <= 5; i++) {
//     console.log('hello');
// }
// }


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