"use strict";

// Object that represents a chronometer.
class Chronometer 
{
	constructor(numbers)
	{
		this.minutes = 0;
		this.seconds = 0;
		this.milis = 0;
		this.numbers = numbers
	}
	
	// Restart this chronometer.
	restart()
	{
		this.minutes = 0;
		this.seconds = 0;
		this.milis = 0;
        this.numbers.innerHTML = "00:00:00";
	}

	// Add zeros to "number" variable, if "number" looks like this: 0, format return this: 00.
	format(number)
	{
		var str = number.toString();
		if(str.length > 1)
		{
			return str;
		}
		else
		{
			return "0" + str;
		}
	}
	
	// Adds 1 to seconds, minutes and hours to represent a chronometer.	
	start()
	{
		if(this.milis > 59)
		{
			this.milis = 0;
			if(this.seconds > 59)
			{
				this.seconds = 0;
				this.minutes += 1;
			}
			else
			{
				this.seconds += 1;
			}
		}
		else
		{
			this.milis += 3;
		}
			
		this.numbers.innerHTML = this.format(this.minutes) + ":" + this.format(this.seconds) + ":" + this.format(this.milis);
	}
}
