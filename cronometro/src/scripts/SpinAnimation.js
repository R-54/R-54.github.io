"use strict";

// Object that represents a spin animation from a circle shape image.
class SpinAnimation
{
    constructor(circle)
    {
        this.currentDegree = 0;
        this.speed = 0.5;
        this.quickSpinCount = 0;
        this.circleElement = circle;
    }
    
    // Makes the circle shape image spin faster. (40 times faster).
    quickSpin()
    {
        this.quickSpinCount = 0;
        this.speed = 20;
    }
    
    // Makes the circle shape image spin faster and in reverse mode (40 times faster).
    reverseSpin()
    {
        this.quickSpinCount = 0;
        this.speed = -20;
    }
    
    // Makes the circle shape image spin.
    spin()
    {
        if(this.currentDegree >= -180 && this.currentDegree < 180)
        {
            this.currentDegree += this.speed;
        }
        else
        {   
            this.currentDegree = 0;
            this.speed = 0.5;
        }
        
        this.circleElement.style.transform = "rotate(" + this.currentDegree + "deg)";
    }
}