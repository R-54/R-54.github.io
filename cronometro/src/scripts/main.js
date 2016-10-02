"use strict";

// Variables
var circle = document.querySelector("#circle img");
var numbers = document.querySelector("#numbers p");

var spinTimeout;
var spinAnimation = new SpinAnimation(circle);

var timeout;
var isRunning = false;
var chronometer = new Chronometer(numbers);

// Helper functions
var run = function()
{
    chronometer.start();
    timeout = setTimeout("run()", 50);
};

// Hadlers

// Run the chronometer when the user click the circle or numbers in the page. 
var clickHandler = function()
{
    if(!isRunning)
    {
        isRunning = true;
        run();
    }
    else
    {
        clearTimeout(timeout);
        isRunning = false;
        chronometer.restart();
        clickHandler();
    }
    
    spinAnimation.quickSpin();
};

// Makes the chronometer stop or restart when the user press the spacebar.
var keydownHandler = function(e)
{
    if(isRunning && e.keyCode === 32)
    {
        clearTimeout(timeout);
        isRunning = false;
    }
    else
    {
        if(!isRunning && e.keyCode === 32)
        {
            spinAnimation.reverseSpin();
            chronometer.restart();
        }
    }
};

// Starts the animation of the circle when the page loads.
var loadHandler = function()
{
    spinAnimation.spin();
    spinTimeout = setTimeout("loadHandler()", 50);
};

// Listeners
window.onload = function(){loadHandler()};
window.addEventListener("keydown", function(e){keydownHandler(e)}, false);
circle.addEventListener("click", clickHandler, false);
numbers.addEventListener("click", clickHandler, false);
